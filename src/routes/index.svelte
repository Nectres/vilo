<script lang="ts">
	import Button from '$src/components/Button.svelte';
	import Footer from '$src/components/Footer.svelte';
	import GradientText from '$src/components/GradientText.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const card = document.getElementsByClassName('title-card')[0];
		const endCard = document.getElementsByClassName('end-btn')[0];
		const fixedBtn = document.getElementsByClassName('fixed-btn')[0];

		fixedBtn.classList.remove('active');

		const endHeight = endCard.getBoundingClientRect().y;

		console.log({ endHeight });

		document.onscroll = () => {
			console.log(window.scrollY);
			if (window.scrollY >= card.scrollHeight - 50 && window.scrollY < endHeight)
				fixedBtn.classList.add('active');
			else fixedBtn.classList.remove('active');
		};
	});
</script>

<svelte:head>
	<title>vilo</title>
</svelte:head>

<div class="fixed z-50 bottom-2 w-full flex justify-center transition-all fixed-btn active">
	<Button btnColor="blue" extended>Start your Journey</Button>
</div>
<main>
	<section class="relative flex justify-center items-center title-card text-white">
		<img class="absolute top-8 left-8" src="vilo_lg.png" alt="vilo" width="65px" />
		<div class="flex flex-col gap-6 items-center justify-center my-32 mb-24">
			<h1 class="title">Meaningful communities.</h1>
			<p>
				Find like-minded people to talk to and create meaningful networks of people around the world
			</p>
			<Button btnColor="blue" expandOnHover>Start</Button>
		</div>
	</section>
	<section class="content">
		<img
			src="https://static.vecteezy.com/system/resources/previews/000/266/247/original/multicultural-communities-vector.jpg"
			alt="Community"
			width="550px"
		/>
		<div class="center flex-col">
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
	<section class="content flex-reverse">
		<div class="center flex-col">
			<div class="my-8">
				<span class="mx-1 font-extrabold text-4xl">
					Go
					<GradientText color1="#0FFF27" color2="#0081F9">global.</GradientText></span
				>
			</div>
			<p>
				Communes are spread all around the world, and are comprised of a diverse folk leading to
				more diversity in your conversations.
			</p>
		</div>
		<img src="poly-globe.png" alt="Globe" width="300px" />
	</section>

	<section class="relative w-full p-4" style="background-color: #130048;">
		<img
			src="dot_triangle.png"
			width="120px"
			class="dot-img top-4 absolute left-4"
			alt="triangle"
		/>
		<div class="flex text-white gap-2 flex-col justify-center items-center w-full my-24">
			<h1 class="title">Ready to start?</h1>
			<p>Joining spaces is as easy as swiping.</p>
			<br />
			<div class="end-btn">
				<Button expandOnHover btnColor="white">Start</Button>
			</div>
		</div>
		<img
			src="dot_triangle.png"
			width="120px"
			class="dot-img bottom-4 absolute right-4"
			alt="triangle"
			style="transform: rotate(180deg);"
		/>
	</section>
	<Footer />
</main>

<style>
	.title-card {
		background: radial-gradient(147.78% 481.42% at 2.26% 7.34%, #020071 0%, #740000 100%);
	}

	img {
		max-width: 40%;
	}

	.title {
		@apply font-bold text-4xl;
	}

	.fixed-btn {
		transform: translateY(150px);
		transition: 450ms ease-in-out;
	}

	.flex-reverse {
		flex-direction: row;
	}
	.fixed-btn.active {
		transform: translateY(0);
	}

	.content {
		@apply my-32 flex justify-center gap-24 mx-32 items-center;
	}

	@media (max-width: 1000px) {
		img {
			max-width: 50%;
		}

		.center {
			@apply flex justify-center items-center;
		}

		.content {
			@apply my-32;
		}
	}

	p {
		max-width: 400px;
		font-weight: 500;
		font-size: 18px;
	}

	@media (max-width: 768px) {
		.dot-img {
			width: 20%;
			max-width: 100px;
		}
		.content {
			@apply flex-col gap-4 mx-10 justify-center items-center;
		}

		.title {
			@apply text-2xl;
		}

		p {
			max-width: 75%;
			font-size: 16px;
		}

		.title-card > p {
			font-size: 14px;
			font-weight: 400;
		}

		.fixed-btn.active {
			transform: none;
		}

		.flex-reverse {
			flex-direction: column-reverse !important;
		}

		img {
			max-width: 85%;
		}
	}
</style>
