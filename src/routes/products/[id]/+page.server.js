export async function load({ params, fetch }) {
	const productId = params.id;
	const response = await fetch(`/api/books/${productId}`);
	if (!response.ok) {
		const errorText = await response.text(); // Get the response as text
		console.error('Error fetching data:', errorText); // Log the error
		throw new Error('Failed to fetch data');
	}
	const bookData = await response.json();

	return {
		bookData
	};
}
