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

export const createCart = async (userId) => {
	try {
		const response = await fetch(`/api/cart/${userId}`);
		if (!response.ok) throw new Error('Failed to create cart');
		return true;
	} catch (error) {
		console.error('Error creating cart:', error);
		return false;
	}
};

export const addToCart = async (userId, productId) => {
	try {
		const response = await fetch('/api/cart/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${localStorage.getItem('AuthorizationToken')}`
			},
			body: JSON.stringify({ userId, productId })
		});
		if (!response.ok) throw new Error('Failed to add item to cart');
		return true;
	} catch (error) {
		console.error('Error adding item to cart:', error);
		return false;
	}
};

export const fetchCartItems = async (userId) => {
	try {
		const response = await fetch(`/api/cart/${userId}`, {
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
