/* eslint-disable no-alert */
/* eslint-disable no-debugger */

import { LightningElement, api } from "lwc";
import QRCodeLib from "@salesforce/resourceUrl/QRCodeLib"; // https://github.com/soldair/node-qrcode
import { loadScript } from "lightning/platformResourceLoader";

export default class qrCodeGenerator extends LightningElement {
	_recordId;
	_sessionData;
	_libLoaded = false;

	@api
	get recordId() {
		return this._recordId;
	}
	set recordId(value) {
		this._recordId = value;
		this.generateQR();
	}

	@api
	get sessionData() {
		return this._sessionData;
	}
	set sessionData(value) {
		this._sessionData = value;
		this.generateQR();
	}

	constructor() {
		super();
		loadScript(this, QRCodeLib + "/qrcode.min.js").then(() => {
			this._libLoaded = true;
			this.generateQR();
		});
	}

	generateQR() {
		if (this._libLoaded && this.recordId && this.sessionData) {
			const card = this.template.querySelector('[data-id="card"]');
			const canvas = this.template.querySelector('[data-id="QRCode"]');
			const sData = JSON.stringify({
				copy1: this.recordId,
				copy2: this.recordId,
				dttm: new Date().toJSON(),
				sessionId: this._sessionData.sessionId,
				serverUrl: this._sessionData.serverUrl
			});

			// eslint-disable-next-line no-undef
			QRCode.toCanvas(canvas, sData, { margin: 0, width: card.clientWidth * 0.9 })
				// QRCode.toCanvas(canvas, sData)
				.then(() => {
					// eslint-disable-next-line no-console
					console.log("Generated QR!");
				})
				.catch(err => {
					throw Error(err);
				});
		}
	}
}
