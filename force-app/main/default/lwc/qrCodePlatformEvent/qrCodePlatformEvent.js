/* eslint-disable no-alert */
/* eslint-disable no-debugger */

import { LightningElement, api, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { subscribe, unsubscribe, onError } from "lightning/empApi";
import { getRecord } from "lightning/uiRecordApi";
import CONTACT_Name from "@salesforce/schema/Contact.Name";

export default class qrCodePlatformEvent extends LightningElement {
	_subscription = {};
	_scannedRecordId = null;
	_channelName = "/event/QRScan__e";

	@api recordId;

	@wire(getRecord, { recordId: "$_scannedRecordId", fields: [CONTACT_Name] })
	wired_GetCntact({ data, error }) {
		if (data) {
			if (this._scannedRecordId) {
				debugger;
				this.dispatchEvent(
					new ShowToastEvent({
						title: "QR Code Scanned",
						message: `Scanned: ${data.fields.Name.value}`,
						variant: "success"
					})
				);
				this._scannedRecordId = null;
			}
		} else if (error) {
			console.error(error);
		}
	}

	constructor() {
		super();
		this.peSubscribe();
	}

	peSubscribe() {
		const messageCallback = response => {
			const payload = response.data.payload;
			if (payload.RecordId__c === this.recordId) {
				this._scannedRecordId = payload.RecordId__c;
			}
		};

		subscribe(this._channelName, -1, messageCallback).then(response => {
			this._subscription = response;
		});

		onError(response => {
			alert(`Error PE: ${JSON.stringify(response)}`);
		});
	}

	peUnsubscribe() {
		unsubscribe(this._subscription, response => {
			alert(`unsubscribe() response: ${JSON.stringify(response)}`);
		});
	}
}
