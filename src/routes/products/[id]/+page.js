export const prerender = false;

export async function load({ params, fetch }) {
	const productId = params.id;
	const bookData = await fetch(`/api/book/${productId}`).then((data) => data.json());

	return {
		bookData
	};
}
