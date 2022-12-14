import { readable } from 'svelte/store';
import { supabase } from './supabase';
import type { User } from './types';

const default_user: User = {
	created_on: new Date(),
	name: 'Unkown',
	icon: '',
	id: ''
};

async function getUser(): Promise<User> {
	const authUser = supabase.auth.user();
	if (!authUser) return default_user;
	const result = await supabase.from('user').select('*').eq('id', authUser.id);
    if (!result.body) return default_user;
	let user = result.body[0] as User;
    user.icon ??= `https://avatars.dicebear.com/api/jdenticon/{$user.id}.svg`
    return user;
}

export const user = readable(await getUser());
