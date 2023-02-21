import type { Actions } from "@sveltejs/kit";
import crypto from "crypto";
import fs from 'fs';

import { callWhisper } from "../../logic/call-whisper";

/**
 * SvelteKit action to receive a file upload POST request and return context (transcription) for page
 */
export const actions: Actions = {
    default: async ({ request }) => {
        const id = crypto.randomBytes(16).toString("hex");

        // Grab the form data from the request
        const values = await request.formData();

        // Getting a file file:
        const file = values.get("audio") as File;

        console.log(file.name, file.size, file.type);

        const fileEnding = file.name.split('.').at(-1);
        const fileName = `${id}.${fileEnding}`;
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(`whisper/tmp/${fileName}`, fileBuffer, 'binary')

        const result = await callWhisper(fileName);

        fs.unlinkSync(`whisper/tmp/${fileName}`);
        return { transcription: result };
    }
};