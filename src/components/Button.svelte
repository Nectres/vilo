<script lang="ts">
	type ButtonColor = 'blue' | 'white' | 'black';
	export let btnColor: ButtonColor;
	export let expandOnHover = false;
	export let rounded = true;
</script>

<button
	class="px-16 z-20 top-2 sticky py-2 w-fit font-medium text-center {btnColor} transition-all ease-linear"
	class:hover:scale-105={expandOnHover} class:rounded-lg={rounded}><slot /></button
>

<style>
	.blue {
		background-color: #2522bd;
		color: #fff;
	}

	.black {
		background-color: #000;
		color: #fff;
	}

	.white {
		background-color: #fff;
		color: #000;
	}
</style>
