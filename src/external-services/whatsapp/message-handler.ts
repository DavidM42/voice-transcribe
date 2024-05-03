import type { Message } from 'whatsapp-web.js';

import { callWhisper } from '../whisper-api/manual/call-whisper';

export async function whatsappMessageHandler(message: Message) {
	if (message.hasMedia) {
		const media = await message.downloadMedia();
		const chat = await message.getChat();
		if (media.mimetype === 'audio/ogg; codecs=opus') {
			const progressMsg = await chat.sendMessage('Ich transkribiere aktuell...');
			try {
				// const base64Data = media.data.replace(/^data:image\/png;base64,/, "");
				// const fileName = `${randomUUID()}.ogg`;

				// await fs.writeFile(`whisper/tmp/${fileName}`, base64Data, 'base64')
				const base64Data = `data:${media.mimetype.split(';')[0]};base64,${media.data}`;
				const base64Response = await fetch(base64Data);
				const blobData = await base64Response.blob();
				const transcription = await callWhisper(blobData);
				// await fs.unlink(`whisper/tmp/${fileName}`);

				// TODO delete this message after a day or something
				await progressMsg.delete(true);
				const transcriptionMsg = await chat.sendMessage(transcription);

				// delete transcribed text for own account
				await transcriptionMsg.delete(false);
			} catch (error: unknown) {
				await chat.sendMessage((error as Error).message);
			} finally {
				await message.delete(false);
			}
		} else {
			await chat.sendMessage(
				'Received unsupported media file. Only supports forwared whatsapp voice memos'
			);
		}
	}
}
