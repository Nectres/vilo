import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    console.log(event.url.pathname)
	const response = await resolve(event, {
		ssr: false,
	});
	return response;
};
