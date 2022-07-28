<script lang="ts">
	type ButtonColor = 'blue' | 'white' | 'black';
	export let btnColor: ButtonColor;
	export let expandOnHover = false;
</script>

<button
	class="px-16 my-8 py-2 w-fit font-medium rounded-lg text-center {btnColor} transition-all ease-linear"
	class:hover:scale-105={expandOnHover}><slot /></button
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
