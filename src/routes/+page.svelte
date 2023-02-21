<script lang="ts">
import {
    FileDropzone
} from '@skeletonlabs/skeleton';

let files: FileList;

let formElement: FormElement;

function onChangeHandler(e: Event): void {
	let file = (<HTMLInputElement>e.target).files[0];
    console.log('file data:',file)
	formElement.submit();
}
</script>

<h1>Voice message transcriber</h1>
<p class="mt-1">Upload voice message file here for a transcription</p>
<br/>
<p>
    Or even better <a href="https://support.google.com/chrome/answer/9658361" target="_blank">install the PWA</a> and share your voice messages straight into this app
</p>

<section class="card variant-glass p-4 space-y-4 mt-8">
	<form bind:this={formElement} action="/audio" method="POST" enctype='multipart/form-data'>

		<FileDropzone name="audio" accept="audio/*" multiple={false} bind:files on:change={onChangeHandler}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-file-arrow-up text-4xl" /></svelte:fragment>
			<svelte:fragment slot="meta">Audio files like .ogg or .opus allowed.</svelte:fragment>
		</FileDropzone>
	</form>
</section>

<style lang="scss">
form {
    display: flex;
    flex-direction: column;

    >.form-row {
        margin-bottom: 1rem;
    }
}
</style>
