import express from 'express';
import basicAuth from 'express-basic-auth';
import QRCode from 'qrcode';
import { PassThrough } from 'stream';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;

import { handler } from '../build/handler.js';

import { whatsappMessageHandler } from './external-services/whatsapp/message-handler.js';

// get admin creds from dotenv
const adminUsername = process.env.ADMIN_USER;
const adminPassword = process.env.ADMIN_PASSWORD;

// fail startup if missing so can not secure whatsapp setup
if (!adminUsername || !adminPassword) {
	throw new Error('Missing environment variables for admin user');
}
const users: { [username: string]: string } = {};
users[adminUsername] = adminPassword;
console.log('Admin users: ', users);

// some server sertup state variables
let authQr: string | undefined;
let whatsappReady = false;

// setup our whatsapp and server client
const whatsappClient = new Client({
	authStrategy: new LocalAuth(),
	// options from https://github.com/pedroslopez/whatsapp-web.js/issues/344#issuecomment-858653583
	puppeteer: {
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-accelerated-2d-canvas',
			'--no-first-run',
			'--no-zygote',
			'--disable-gpu'
		]
	}
});
const app = express();

// callbacks for whatsapp client
whatsappClient.on('qr', (qr) => {
	authQr = qr;
	console.log('Whatsapp Login Code is ready!');
	// console.log('Please log into your whatsapp account by scanning the following code:');
	// console.log(qr);
	// qrcode.generate(qr, { small: true });
});
whatsappClient.on('ready', () => {
	console.log('WhatsappBot is ready!');
	whatsappReady = true;
	authQr = undefined;
});
whatsappClient.on('message', (message) => whatsappMessageHandler(message));

/**
 * Route to check readiness of whatsapp bot
 */
app.get('/whatsapp/readiness', async function (req, res) {
	if (authQr) {
		res.status(503).send('Needs to authenticate');
		return;
	} else {
		if (whatsappReady) {
			// non 200 code to tell by status that is ready and don't know how to change status for qr code
			res.status(204).send('Logged in and whatsapp is ready');
			return;
		}
	}
	res.status(503).send('Whatsapp is not yet ready');
});

/**
 * HTTP Basic auth secure route to set up whatsapp bot and see status
 */
app.get(
	'/whatsapp/setup',
	basicAuth({
		users: users,
		challenge: true
	}),
	async function (req, res) {
		if (authQr) {
			// from https://stackoverflow.com/a/60102473
			try {
				const qrStream = new PassThrough();
				await QRCode.toFileStream(qrStream, authQr, {
					type: 'png',
					width: 400,
					errorCorrectionLevel: 'H'
				});
				qrStream.pipe(res);
			} catch (e) {
				console.error(e);
				res.status(500).send(e);
			}
			return;
		} else {
			if (whatsappReady) {
				// non 200 code to tell by status that is ready and don't know how to change status for qr code
				res.status(204).send('Logged in and whatsapp is ready');
				return;
			}
		}
		res.status(503).send('Whatsapp is not yet ready');
	}
);

// let SvelteKit handle everything else, including serving prerendered pages and static assets
// idea from https://kit.svelte.dev/docs/adapter-node#custom-server
app.use(handler);

const port = process.env?.PORT || 8080;
app.listen(port, () => {
	console.log('listening on port ', port);
	whatsappClient.initialize();
});
