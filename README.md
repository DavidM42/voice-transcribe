# voice-transcribe

[SvelteKit](https://kit.svelte.dev/) app utilizing [whisper](https://github.com/openai/whisper) to transcribe WhatsApp voice messages.
Upload voice message files or install the PWA to your to directly share into the App (on Android phones and Windows PCs). Or even quicker set-up a WhatsApp Web session with the app and directly share voice messages from your phone to the app.

## Pre-requisites

You need

- Instance of [whisper-asr-webservice](https://github.com/ahmetoner/whisper-asr-webservice) running and accessible for this app
- For whatsapp functionality:
  - chromium installed for whatsapp to work
  - a seperate whatsapp account for the app to use (so your normal account never gets banned and the app can parse and reply to every message received)

## Building & running

To create a full version of the app:

```bash
npm install
cp .env.example .env
npm run build
```

You can then run the production build with `npm run hybrid-server`.

## Note on PWAs

[PWA](https://web.dev/progressive-web-apps/)s require a secure HTTPS connection to be installable. You can use [tunneling sofware](https://github.com/anderspitman/awesome-tunneling) (like ngrok), reverse proxying like [caddy](https://caddyserver.com/) or other tools to achieve this.

The usual solution of deploying this app to Vercel/a CDN or similiar will probably not work since you need a somehow capable machine to execute the whisper machine learning.
(If you find a cool cloud native way, feel free to create an issue explaining it)

## Docker

This app can be ran as docker container. For best use you need to mount the following directories to a persistent volume:

`/app/.wwebjs_auth` - whatsapp web authentication storage persistence \
`/app/.wwebjs_cache` - whatsapp web cache \

and you need to set the following required environment variable for docker:

`WHISPER_ASR_BASE_URL` to some value like `http://192.168.1.1:19900` or wherever you are running your instance of [whisper-asr-webservice](https://github.com/ahmetoner/whisper-asr-webservice) on.

Further optional environment variables for the image are:

`ADMIN_USER` - to a secure username used to register the whatsapp web session \
`ADMIN_PASSWORD` - to a secure password used to register the whatsapp web session \
`BODY_SIZE_LIMIT` - to change the max file size accepted by the app in bytes \
`PORT` - if you want to change the port the app is running on inside the container
