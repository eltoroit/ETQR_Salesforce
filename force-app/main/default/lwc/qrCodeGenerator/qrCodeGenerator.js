import { LightningElement, api } from "lwc";
import QRCodeLib from "@salesforce/resourceUrl/QRCodeLib"; // https://github.com/soldair/node-qrcode
import { loadScript } from "lightning/platformResourceLoader";

export default class qrCodeGenerator extends LightningElement {
	_recordId;
	_ready = {};

	@api
	get recordId() {
		return this._recordId;
	}
	set recordId(value) {
		this._recordId = value;
		this._ready.recordId = true;
		this.generateQR();
	}

	constructor() {
		super();
		loadScript(this, QRCodeLib + "/qrcode.min.js").then(() => {
			this._ready.staticResource = true;
			this.generateQR();
		});
	}

	generateQR() {
		if (this._ready.staticResource && this._ready.recordId) {
			const card = this.template.querySelector('[data-id="card"]');
			const canvas = this.template.querySelector('[data-id="QRCode"]');
			const sData = JSON.stringify({
				copy1: this.recordId,
				copy2: this.recordId,
				dttm: new Date().toJSON()
			});

			// eslint-disable-next-line no-undef
			QRCode.toCanvas(canvas, sData, { margin: 0, width: card.width * 0.9 })
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
