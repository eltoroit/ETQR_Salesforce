import { LightningElement, api } from "lwc";
import QRCode from "@salesforce/resourceUrl/qrCode"; // https://github.com/soldair/node-qrcode
import { loadScript } from "lightning/platformResourceLoader";

export default class qrCodeGenerator extends LightningElement {
	_recordId;
	_initialized = false;

	@api
	get recordId() {
		return this._recordId;
	}
	set recordId(value) {
		this._recordId = value;
		this.generateQR();
	}

	renderedCallback() {
		if (!this._initialized) {
			this._initialized = true;
			loadScript(this, QRCode);
		}
	}

	generateQR() {
		const canvas = this.template.querySelector('[data-id="QRCode"]');
		const sData = JSON.stringify({
			copy1: this.recordId,
			copy2: this.recordId,
			dttm: new Date().toJSON()
		});

		QRCode.toCanvas(canvas, sData, { margin: 0, width: Math.min(window.innerWidth, window.innerHeight) * 0.9 })
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
