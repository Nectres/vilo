<script>
	import Button from '$src/components/Button.svelte';
	import GradientText from '$src/components/GradientText.svelte';
</script>

<main>
	<section class="relative flex justify-center items-center title-card text-white">
		<img class="absolute top-8 left-8" src="logo.png" alt="vilo" width="50px" />
		<div class="flex flex-col gap-6 items-center justify-center my-32 mb-24">
			<h1 class="text-4xl font-bold">Meaningful communities.</h1>
			<p>
				Find like-minded people to talk to and create meaningful networks of people around the world
			</p>
			<Button btnColor="blue" expandOnHover>Start</Button>
		</div>
	</section>
	<section>
		<img
			src="https://static.vecteezy.com/system/resources/previews/000/266/247/original/multicultural-communities-vector.jpg"
			alt="Community"
			width="550px"
		/>
		<div>
			<div class="my-8">
				<span class="text-4xl font-extrabold mx-1"
					>New opinions. <br /> New <GradientText color1="#FF0F0F" color2="#2300F9"
						>horizons.</GradientText
					></span
				>
			</div>
			<p>
				Communes enable you to discover communities instantly and helps you talk to them easily.
			</p>
		</div>
	</section>
	<section>
		<div>
			<div class="my-8">
				<span class="mx-1 font-extrabold text-4xl">
					Go
					<GradientText color1="#0FFF27" color2="#0081F9">globally.</GradientText></span
				>
			</div>
			<p>
				Communes are spread all around the world, and are comprised of a diverse folk leading to
				more diversity in your conversations.
			</p>
		</div>
		<img
			src="https://kimglobal.com/wp-content/uploads/2020/10/284-1536x1536.jpg"
			alt="Globe"
			width="450px"
		/>
	</section>
</main>

<style>
	.title-card {
		background: radial-gradient(147.78% 481.42% at 2.26% 7.34%, #020071 0%, #740000 100%);
	}

	section:not(.title-card) {
		@apply my-32 flex justify-center gap-24 mx-32 items-center;
	}

	p {
		max-width: 400px;
		font-weight: 500;
		font-size: 18px;
	}
</style>
