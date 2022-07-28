<script context="module" lang="ts">
	import { supabase } from '$src/lib/supabase';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async () => {
		let auth_user = await supabase.auth.user();
		if (auth_user)
			return {
				status: 301,
				redirect: '/',
			}
		const hashParams = new URLSearchParams(location.hash.slice(1));
		const access_token = hashParams.get('access_token');
		console.log(access_token);
		if (access_token) {
			const user = supabase.auth.user();
			const data = user?.identities?.[0]?.identity_data;
			if (data)
				await supabase.from('user').insert({
					name: data.full_name,
					id: user.id
				});
			return {
				status: 301,
				headers: {
					location: location.origin
				}
			};
		}
		const { user } = await supabase.auth.signIn(
			{
				provider: 'google'
			},
			{
				redirectTo: `${location.origin}/auth/login`
			}
		);
		return {
			status: 200,
			body: JSON.stringify(user)
		};
	}
</script>
