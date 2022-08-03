<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$src/lib/supabase';
	import type { Message } from '$src/lib/types';
	import { user } from '$src/lib/user';
	import { getUserIcon } from '$src/lib/utils';

	let messages: Message[] = [
		{
			content: 'Loading messages . . .',
			created_on: new Date('2020-01-01'),
			id: 'system-msg',
			users: {
				name: 'System',
				icon: 'https://avatars.dicebear.com/api/jdenticon/system.svg',
				id: 'system'
			}
		}
	];

	let currentMsg: string;
	const userMap = new Map();

	async function load() {
		const { id } = $page.params;
		const result = await supabase.from('messages').select('*, users ( name, icon, id )');
		console.log(result);
		if (result.body) messages = result.body;
		messages.forEach((msg) => {
			if (!userMap.has(msg.users.id)) {
				userMap.set(msg.users.id, msg.users);
			}
		});
		const mySubscription = supabase
			.from('messages')
			.on('INSERT', (payload) => {
				console.log({ payload });
				const msg = payload.new;
				if (userMap.get(msg.users)) msg.users = userMap.get(msg.users);
				else {
					supabase
						.from('users')
						.select('id, icon, name')
						.eq(id, msg.users)
						.then((result) => {
							if (!result.body)
								return console.error("Missing user for message");
							userMap.set(msg.users, result.body[0]);
							msg.users = result.body[0];
						});
				}
				messages[messages.length] = msg;
			})
			.subscribe(() => console.log('subscribed!'));
		console.log({ mySubscription });
	}

	async function sendMsg() {
		await supabase.from('messages').insert({
			content: currentMsg,
			users: $user.id
		});
		currentMsg = '';
	}
	load();
</script>

<div class="flex flex-col gap-3 px-10 py-2">
	{#each messages as msg, index (msg.id)}
		{#if index == 0 || messages[index - 1].users.id != msg.users.id}
			<div class="flex gap-4 mt-10 -mb-2">
				<img src={getUserIcon(msg.users)} class="rounded-md w-10" alt="msg user" />
				<span class="text-lg font-semibold">{msg.users.name}</span>
			</div>
		{/if}
		<span class="mx-14">{msg.content}</span>
	{/each}
	<div class="my-8" />
</div>

<div class="fixed bottom-4 flex w-screen justify-center px-5">
	<form on:submit|preventDefault={sendMsg} class="flex w-full">
		<input
			type="text"
			bind:value={currentMsg}
			class="border-2 rounded-l-lg px-4 py-2 border-gray-600 w-9/12"
		/>
		<button type="submit" class="btn btn-blue rounded-r-lg">Send</button>
	</form>
</div>
