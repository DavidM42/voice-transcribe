<script>
	import '@skeletonlabs/skeleton/styles/all.css';
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	import '../app.postcss';

	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<div class="light-switch">
	<LightSwitch class="test" />
</div>
<div class="container">
	<div class="content">
		<slot />
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
		margin-top: 5vh;
		margin-left: 20px;
		margin-right: 20px;
		max-width: 90vw;
	}

	.light-switch {
		position: absolute;
		right: 5px;
		top: 5px;
	}
</style>
