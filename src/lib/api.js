export const getUserToken = () => localStorage.getItem('AuthorizationToken');

export async function getUserInfo() {
	try {
		const response = await fetch('/api/user/info', {
			headers: {
				Authorization: getUserToken()
			}
		});
		const data = await response.json();
		return data;
	} catch {
		console.log('asd');
	}
}

export async function updateCartItem(userToken, productId, change) {
	try {
		const response = await fetch(`/api/cart/book/`, {
			method: change === 1 ? 'PUT' : 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: userToken
			},
			body: JSON.stringify({ book_id: productId })
		});
		if (!response.ok) throw new Error('Failed to update cart item');

		return true;
	} catch (error) {
		console.error('Error updating cart item:', error);
		return false;
	}
}

export async function fetchCartItems(userToken) {
	try {
		const response = await fetch(`/api/user/cart`, {
			headers: {
				Authorization: userToken
			}
		});
		if (!response.ok) throw new Error('Failed to fetch cart items');
		return await response.json();
	} catch (error) {
		console.error('Error fetching cart items:', error);
		return null;
	}
}

export async function fetchProducts() {
	try {
		const response = await fetch('/api/book/get-all');
		if (!response.ok) throw new Error('Failed to fetch products');

		return await response.json();
	} catch (error) {
		console.error('Error fetching products:', error);
		return [];
	}
}

export async function fetchPurchases() {
	const userToken = getUserToken();

	return fetch(`/api/user/history/get-all`, {
		method: 'GET',
		headers: {
			Authorization: userToken
		}
	}).then(async (response) => await response.json());
}
