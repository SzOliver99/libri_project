import { notify } from './utils/notify';

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
		console.log('Error getting user informations');
	}
}

export async function updateCartItem(productId, change) {
	try {
		const response = await fetch(`/api/cart/book/`, {
			method: change === 1 ? 'PUT' : 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getUserToken()
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

export async function fetchCartItems() {
	try {
		const response = await fetch(`/api/user/cart`, {
			headers: {
				Authorization: getUserToken()
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
	try {
		return await fetch(`/api/user/history/get-all`, {
			method: 'GET',
			headers: {
				Authorization: getUserToken()
			}
		}).then(async (response) => await response.json());
	} catch (error) {
		console.error('Error fetching products:', error);
	}
}

export async function fetchBuyCart() {
	await fetch('/api/cart/purchase', {
		method: 'POST',
		headers: {
			Authorization: getUserToken()
		}
	}).then(async (response) => {
		const data = await response.json();
		if (!response.ok) {
			notify.error(data);
			return response;
		}
		notify.success(data);
	});
}
