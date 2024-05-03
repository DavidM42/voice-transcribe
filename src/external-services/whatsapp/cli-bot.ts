import qrcode from 'qrcode-terminal';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;

import { whatsappMessageHandler } from './message-handler';

const client = new Client({
	authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
	console.log('Please log into your whatsapp account by scanning the following code:');
	qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
	console.log('Client is ready!');
});

client.on('message', (message) => whatsappMessageHandler(message));

client.initialize();
