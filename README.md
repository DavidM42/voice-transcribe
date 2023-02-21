# voice-transcribe

[SvelteKit](https://kit.svelte.dev/) app utilizing [whisper](https://github.com/openai/whisper) to transcribe WhatsApp voice messages.
Upload voice message files or install the PWA to your to directly share into the App (on Android phones and Windows PCs).

## Setup

You need to

1. Install whisper in a virtual environment under `whisper/venv`
2. NPM install the packages for the app

You can also take the shortcut and execute `install.sh` (at least on unix).

Whisper should automatically download the small model file on the first request (**so it will take a lot longer on the first request**).

## Developing

Once you've created a project and followed the setup steps, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Note on PWAs

[PWA](https://web.dev/progressive-web-apps/)s require a secure HTTPS connection to be installable. You can use [tunneling sofware](https://github.com/anderspitman/awesome-tunneling) (like ngrok), reverse proxying like [caddy](https://caddyserver.com/) or other tools to achieve this.

The usual solution of deploying this app to Vercel/a CDN or similiar will probably not work since you need a somehow capable machine to execute the whisper machine learning.
(If you find a cool cloud native way, feel free to create an issue explaining it)
