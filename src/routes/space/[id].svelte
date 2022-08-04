<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$src/lib/supabase';
	import type { Message } from '$src/lib/types';
	import { user } from '$src/lib/user';
	import { getUserIcon, splitAndCapitalize } from '$src/lib/utils';
	import { scale } from 'svelte/transition';

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
	const spaceId = $page.params.id;
	const spaceName = splitAndCapitalize(spaceId);
	const userMap = new Map();
	let newMsgScroll = false;

	async function load() {
		const result = await supabase
			.from('messages')
			.select('*, users ( name, icon, id )')
			.eq('space_id', spaceId)
			.order('created_at', { ascending: false })
			.limit(20);
		console.log(result);
		if (result.body) messages = result.body.reverse();
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
						.eq('id', msg.users)
						.then((result) => {
							if (!result.body) return console.error('Missing user for message');
							userMap.set(msg.users, result.body[0]);
							msg.users = result.body[0];
						});
				}
				messages[messages.length] = msg;
			})
			.subscribe(() => console.log('subscribed!'));
		console.log({ mySubscription });
	}


	let disableSubmit = false;
	async function sendMsg() {
		disableSubmit = true;
		await supabase.from('messages').insert({
			content: currentMsg,
			users: $user.id,
			space_id: spaceId
		});
		currentMsg = '';
		disableSubmit = false;
	}
	load();
</script>

<svelte:head>
	<title>{spaceName}</title>
</svelte:head>


<main class="relative">
	<div class="flex flex-col gap-3 px-10 py-2">
		{#each messages as msg, index (msg.id)}
			<div id="msg-{msg.id}" in:scale={{ duration: 200 }} out:scale={{ duration: 200 }}>
				{#if index == 0 || messages[index - 1].users.id != msg.users.id}
					<div class="flex gap-4 mt-10 -mb-2">
						<img src={getUserIcon(msg.users)} class="rounded-md w-10" alt="msg user" />
						<span class="text-lg font-semibold">{msg.users.name}</span>
					</div>
				{/if}
				<span class="mx-14">{msg.content}</span>
			</div>
		{/each}
		<div class="my-8" />
	</div>

	<form on:submit|preventDefault={sendMsg} disabled={disableSubmit} class="flex fixed bottom-0 left-0 w-full">
		<input
			type="text"
			bind:value={currentMsg}
			class="border-2 px-4 py-2 flex-grow border-gray-600"
		/>
		<button type="submit" disabled={disableSubmit} class="px-12 lg:px-24 font-semibold btn-blue">Send</button>
	</form>
</main>
