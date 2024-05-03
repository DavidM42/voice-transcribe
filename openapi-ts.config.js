/** @type {import('@hey-api/openapi-ts').UserConfig} */
export default {
	base: 'http://192.168.178.85:19900',
	client: 'fetch',
	input: 'src/external-services/whisper-api/manual/openapi.json',
	output: 'src/external-services/whisper-api/generated'
};
