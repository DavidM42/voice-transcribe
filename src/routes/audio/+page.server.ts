import { error, fail, type Actions } from '@sveltejs/kit';
import { callWhisper } from '../../external-services/whisper-api/manual/call-whisper';

/**
 * SvelteKit action to receive a file upload POST request and return context (transcription) for page
 */
export const actions: Actions = {
	default: async ({ request }) => {
		// Grab the form data from the request
		const values = await request.formData();

		// Getting a file file:
		const file = values.get('audio') as File;

		if (!file.type.startsWith('audio/')) {
			console.warn('Tried to convert non ogg file');
			return fail(400, { wrongMedia: true });
		}

		// console.log(file.name, file.size, file.type);
		try {
			const result = await callWhisper(file);
			return { transcription: result };
		} catch (e) {
			// TODO better error handling here
			// return fail(400, { email, incorrect: true });
			return error(400, e?.message || e);
		}
	}
};
