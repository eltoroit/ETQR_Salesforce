public class SessionData {
	@AuraEnabled(Cacheable=true)
	public string getSessionData() {
		Map<String, String> mapSession = new Map<String, String>();
		mapSession.put('sessionId', UserInfo.getSessionId());
		mapSession.put('serverUrl', Url.getOrgDomainUrl().toExternalForm());
		return JSON.serialize(mapSession);
	}

	@AuraEnabled(Cacheble=true)
	public void testData() {
		Http h = new Http();
		HttpRequest req = new HttpRequest();
		req.setEndpoint(Url.getOrgDomainUrl().toExternalForm() + '/services/data/v47.0/limits');
		req.setMethod('GET');
		req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
		HttpResponse res = h.send(req);
	}
}
