<script>
	import Footer from '$src/components/Footer.svelte';
</script>

<div class="flex  flex-col w-full h-full sm:flex-row">
	<div class="bg-slate-900 relative text-white h-max sm:h-screen px-8 py-6">
		<h1 class="text-2xl font-bold">semicolon</h1>

		<div class="bg-red-300 hover-obj right-2" />
		<div class="bg-yellow-300 hover-obj right-8" />
		<div class="bg-green-300 hover-obj right-14" />
	</div>
	<slot />
</div>

<style>
	.hover-obj {
		@apply absolute -top-7 w-4 rounded-lg h-10 hover:-top-4 hover:cursor-pointer transition-all ease-linear;
	}
</style>
