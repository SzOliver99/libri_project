import { error } from '@sveltejs/kit';

export function load({ params }) {
	const productId = params.slug;
	// You can use the slug to fetch the specific product data
	// For now, we'll just return it
	return {
		productId
	};
}
