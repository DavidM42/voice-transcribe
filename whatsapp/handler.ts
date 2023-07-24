import { Client, Message } from "whatsapp-web.js";
import { promises as fs } from 'fs';
import { randomUUID } from "crypto";

import { callWhisper } from "../src/logic/call-whisper.js";

export async function handle(message: Message) {
    if (message.hasMedia) {
        const media = await message.downloadMedia();
        if (media.mimetype === 'audio/ogg; codecs=opus') {
            const chat =  (await message.getChat());
            chat.sendMessage('Ich transkribiere aktuell...');
            try {
                const base64Data = media.data.replace(/^data:image\/png;base64,/, "");
                const fileName = `${randomUUID()}.ogg`;
                
                await fs.writeFile(`whisper/tmp/${fileName}`, base64Data, 'base64')
                const transcription = await callWhisper(fileName);
                await fs.unlink(`whisper/tmp/${fileName}`);
                
                // TODO delete this message after a day or something
                chat.sendMessage('Anbei das Transkript: \n' + transcription)
            } catch(error: unknown) {
                chat.sendMessage((error as Error).message);
            } finally {
                message.delete(true)
            }
        }
    }
}