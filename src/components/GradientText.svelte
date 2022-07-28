<script>
	export let color1 = '';
	export let color2 = '';
</script>

<span class="gradient" style="--color1: {color1}; --color2: {color2}"><slot /></span>

<style>
	span.gradient {
		background: linear-gradient(var(--color1), var(--color2));
		background-clip: text;
		color: transparent;
	}
</style>
