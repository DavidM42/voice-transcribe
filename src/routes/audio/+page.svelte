<script lang="ts">
	import type { ActionData } from './$types'

	export let form: ActionData;
</script>

<div class="card p-4 max-w-sm">
	{#if form?.transcription}
	{form.transcription}
	{/if}
</div>
