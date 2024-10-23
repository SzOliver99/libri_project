export const getUserId = async () => {
	const token = localStorage.getItem('AuthorizationToken');
	if (!token) return null;

	try {
		const response = await fetch('/api/user/protected', {
			headers: {
				Authorization: `${token}`
			}
		});
		if (!response.ok) throw new Error('Failed to fetch user data');
		const userData = await response.json();
		return userData.id;
	} catch (error) {
		console.error('Error fetching user ID:', error);
		return null;
	}
};

export const updateCartItem = async (userId, productId, change) => {
	try {
		const method = change > 0 ? 'PUT' : 'DELETE';
		const response = await fetch(`/api/cart/book`, {
			method: method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ userId, productId })
		});
		if (!response.ok) {
			console.error('Failed to update cart item:', await response.json());
			return false;
		}
		return true;
	} catch (error) {
		console.error('Error updating cart item:', error);
		return false;
	}
};

export const fetchCartItems = async (userId) => {
	try {
		const response = await fetch(`/api/user/${userId}/cart`, {
			headers: {
				Authorization: `${localStorage.getItem('AuthorizationToken')}`
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
