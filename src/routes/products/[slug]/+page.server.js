export async function load({ params }) {
	const productId = params.slug;

	return {
		productId
	};
}
