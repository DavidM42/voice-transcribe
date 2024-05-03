import 'dotenv/config';

if (!process.env.WHISPER_ASR_BASE_URL) {
	throw new Error('Missing required env var WHISPER_ASR_BASE_URL');
}

/** @type {import('@hey-api/openapi-ts').UserConfig} */
export default {
	base: process.env.WHISPER_ASR_BASE_URL,
	client: 'fetch',
	input: 'src/external-services/whisper-api/manual/openapi.json',
	output: 'src/external-services/whisper-api/generated'
};
