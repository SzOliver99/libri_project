export const getUserToken = () => {
	return localStorage.getItem('AuthorizationToken');
};

export async function getUserInfo() {
	try {
		const response = await fetch('/api/user/info', {
			headers: {
				Authorization: `${getUserToken()}`
			}
		});
		const data = await response.json();
		return data;
	} catch {
		console.log('asd');
	}
}

export const updateCartItem = async (userToken, productId, change) => {
	try {
		const response = await fetch(`/api/cart/book/`, {
			method: change === 1 ? 'PUT' : 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${userToken}`
			},
			body: JSON.stringify({ book_id: productId })
		});
		if (!response.ok) throw new Error('Failed to update cart item');

		return true;
	} catch (error) {
		console.error('Error updating cart item:', error);
		return false;
	}
};

export const fetchCartItems = async (userToken) => {
	try {
		const response = await fetch(`/api/user/cart`, {
			headers: {
				Authorization: `${userToken}`
			}
		});
		if (!response.ok) throw new Error('Failed to fetch cart items');
		return await response.json();
	} catch (error) {
		console.error('Error fetching cart items:', error);
		return null;
	}
};

export const fetchProducts = async () => {
	try {
		const response = await fetch('/api/books/');
		if (!response.ok) throw new Error('Failed to fetch products');

		return await response.json();
	} catch (error) {
		console.error('Error fetching products:', error);
		return [];
	}
};
