/* eslint-disable no-debugger */
import { LightningElement, api, track } from "lwc";

export default class qrCode extends LightningElement {
	@api recordId;
	@track sessionData;

	handleSession(event) {
		this.sessionData = event.detail;
		debugger;
	}
}
