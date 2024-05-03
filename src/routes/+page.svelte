<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let files: FileList;

	let formElement: HTMLFormElement;

	let loading = false;
	function onChangeHandler(e: Event): void {
		let file = (<HTMLInputElement>e.target).files?.[0];

		if (!file) {
			return;
		}

		// console.log('file data:', file);
		loading = true;
		formElement.submit();
	}

	let showWhatsappWarning = false;

	onMount(async () => {
		try {
			const res = await fetch(`/whatsapp/readiness`);
			// only status code that tells us everything is working
			if (res.status !== 204) {
				showWhatsappWarning = true;
			}
		} catch (e) {
			showWhatsappWarning = true;
		}
	});
</script>

<h1>Voice message transcriber</h1>
<p class="mt-1">Upload voice message file here for a transcription</p>
<br />
<p>
	Or even better <a
		href="https://support.google.com/chrome/answer/9658361"
		target="_blank"
		rel="noreferrer">install the PWA</a
	> and share your voice messages straight into this app
</p>

<section class="card variant-glass p-4 space-y-4 mt-8">
	<!-- TODO loading spinner here and disable while loading -->
	<form bind:this={formElement} action="/audio" method="POST" enctype="multipart/form-data">
		<FileDropzone
			name="audio"
			accept="audio/*"
			multiple={false}
			bind:files
			on:change={onChangeHandler}
		>
			<svelte:fragment slot="lead"><i class="fa-solid fa-file-arrow-up text-4xl" /></svelte:fragment
			>
			<svelte:fragment slot="meta">
				{#if loading}
					Loading...
				{:else}
					Audio files like .ogg or .opus allowed.
				{/if}
			</svelte:fragment>
		</FileDropzone>
	</form>
</section>

{#if showWhatsappWarning}
	<aside class="alert variant-filled-error mt-8">
		<!-- Icon -->
		<div><i class="fa-solid fa-triangle-exclamation text-4xl" /></div>
		<!-- Message -->
		<div class="alert-message">
			<h3 class="h3">Whatsapp not working!</h3>
			<p>Whatsapp Bot needs your attention!</p>
		</div>
		<!-- Actions -->
		<div class="alert-actions">
			<a class="btn variant-filled" href="/whatsapp/setup">Check/Configure</a>
		</div>
	</aside>
{/if}

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;

		> .form-row {
			margin-bottom: 1rem;
		}
	}
</style>
