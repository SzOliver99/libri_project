import { fetchProductById } from "$lib/api";

export const prerender = false;

export async function load({ params, fetch }) {
	const productId = params.id;
	const bookData = await fetchProductById(productId);

	return {
		bookData
	};
}
