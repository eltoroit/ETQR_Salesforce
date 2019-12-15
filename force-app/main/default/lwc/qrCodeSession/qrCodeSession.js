/* eslint-disable no-alert */

import { LightningElement, wire } from "lwc";
import getSessionData from "@salesforce/apex/SessionData.getSessionData";
// import testData from "@salesforce/apex/SessionData.testData";

export default class qrCodeSession extends LightningElement {
	_sessionData;

	@wire(getSessionData)
	wired_GetSessionData({ data, error }) {
		if (data) {
			this._sessionData = data;
			this.dispatchEvent(new CustomEvent("session", { detail: data }));
		} else if (error) {
			alert("error wire (1)");
		}
	}

	// @wire(testData, { mapSession: "$_sessionData" })
	// wired_testData({ data, error }) {
	// 	if (data) {
	// 		// debugger;
	// 	} else if (error) {
	// 		// debugger;
	// 	}
	// }
}
