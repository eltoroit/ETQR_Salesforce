/* eslint-disable no-alert */
import { LightningElement } from "lwc";
import { subscribe, unsubscribe, onError } from "lightning/empApi";

export default class qrCodePlatformEvent extends LightningElement {
	_subscription = {};
	_channelName = "/event/QRScan__e";

	constructor() {
		super();
		this.peSubscribe();
	}

	peSubscribe() {
		const messageCallback = response => {
			alert(`Scanned: ${JSON.stringify(response)}`);
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
