public class SessionData {
	// https://eltoroit.herokuapp.com/Blog.app?page=ETLC_APIsFromApex
	// https://salesforce.stackexchange.com/questions/255991/unable-to-aquire-valid-session-id-using-an-apex-class

	@AuraEnabled(Cacheable=true)
	public static Map<String, String> getSessionData() {
		Map<String, String> mapSession = new Map<String, String>();
		mapSession.put('sessionId', getSessionId());
		mapSession.put('serverUrl', Url.getOrgDomainUrl().toExternalForm());
		return mapSession;
	}

	@AuraEnabled(Cacheable=true)
	public static String testData(Map<String, String> mapSession) {
		/*
		Http h = new Http();
		HttpRequest req = new HttpRequest();
		req.setEndpoint(Url.getOrgDomainUrl().toExternalForm() + '/services/data/v47.0/limits');
		req.setMethod('GET');
		req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
		HttpResponse res = h.send(req);
        */

		Http h = new Http();
		HttpRequest req = new HttpRequest();
		req.setEndpoint(mapSession.get('serverUrl') + '/services/data/v47.0/limits');
		req.setMethod('GET');
		req.setHeader('Authorization', 'Bearer ' + mapSession.get('sessionId'));
		HttpResponse res = h.send(req);
		return res.getBody();
	}

	private static String getSessionId() {
		String sessionId = '';
		String vfContent = Page.SessionData.getContent().toString();
		System.debug(vfContent);
		Integer startPos = vfContent.indexOf('[') + 1, endPos = vfContent.indexOf(']');
		sessionId = vfContent.substring(startPos, endPos);
		System.debug(sessionId);
		return sessionId;
	}
}
