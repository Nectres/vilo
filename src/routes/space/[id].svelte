<script lang="ts">
	import { page } from '$app/stores';
import Button from '$src/components/Button.svelte';

	import { supabase } from '$src/lib/supabase';

	import type { Message } from '$src/lib/types';

	let messages: Message[] = [
		{
			content: "Hello, I'm a new user",
			created_on: new Date('2020-01-01'),
			id: 'awfe',
			user: 'awefok'
		}
	];
	let currentMsg: string;

	async function load() {
		const { id } = $page.params;
		const result = await supabase.from('messages').select('*');
		console.log(result);
		if (result.body) messages = result.body;
		const mySubscription = supabase
			.from('*')
			.on('*', (payload) => {
				const msg = payload.new as Message;
				messages[messages.length] = msg;
			})
			.subscribe(() => console.log('subscribed!'));
		console.log({ mySubscription });
	}

	async function sendMsg() {
		await supabase.from('messages').insert({
			content: currentMsg,
			user_id: 'aebb21ae-c32d-43cd-9b02-30e6c820d829'
		});
		currentMsg = '';
	}
	load();
</script>

<div class="flex flex-col gap-4 px-10 py-2">
	{#each messages as msg (msg.id)}
		<span>{msg.content}</span>
	{/each}
</div>

<form on:submit|preventDefault={sendMsg} class="absolute flex bottom-4 px-3 sm:w-4/5 w-full">
	<input type="text" class="border-2 border-gray-600" />
    <button type="submit" class="btn btn-blue rounded-r-lg">Send</button>
</form>
