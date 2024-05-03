<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

{#if form?.transcription}
	<div class="card p-4 max-w-sm">
		{form.transcription}
		<br />
		<a class="btn variant-filled mt-4" href="../">Another one</a>
	</div>
{/if}

{#if form?.wrongMedia}
	<aside class="alert variant-filled-error mt-8">
		<div><i class="fa-solid fa-triangle-exclamation text-4xl" /></div>
		<div class="alert-message">
			<h3 class="h3">That was probably not a voice memo!</h3>
			<p>
				You tried to upload a file that was not recognized as audio file. Try again with a different
				file
			</p>
		</div>
		<div class="alert-actions">
			<a class="btn variant-filled" href="../">Try again</a>
		</div>
	</aside>
{/if}
