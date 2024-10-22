export async function load({ params }) {
	const productId = params.id;

	return {
		productId
	};
}

// export async function load({ params, fetch }) {
//     const productId = params.id;
//     const response = await fetch(`/api/books/${productId}`);

//     if (response.ok) {
//         const product = await response.json();
//         return { product };
//     } else {
//         return { status: 404, error: new Error('Product not found') };
//     }
// }
