import { Client, Message } from "whatsapp-web.js";
import { promises as fs } from 'fs';
import { randomUUID } from "crypto";

import { callWhisper } from "../src/logic/call-whisper.js";

export async function handle(message: Message) {
    if (message.hasMedia) {
        const media = await message.downloadMedia();
        // media.mimetype = 
        console.log(media.mimetype);
        if (media.mimetype === 'audio/ogg; codecs=opus') {
            try {
                const base64Data = media.data.replace(/^data:image\/png;base64,/, "");
                const fileName = `${randomUUID()}.ogg`;

                await fs.writeFile(`whisper/tmp/${fileName}`, base64Data, 'base64')
                const transcription = await callWhisper(fileName);
                await fs.unlink(`whisper/tmp/${fileName}`);

                console.log(transcription);
            } catch(error: unknown) {
                (await message.getChat()).sendMessage((error as Error).message);
            }
        }
    }
}