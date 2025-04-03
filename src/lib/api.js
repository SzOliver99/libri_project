import { notify } from './utils/notify';

const isBuildingToPhone = true;
export const proxy = isBuildingToPhone ? 'https://libri-backend.fly.dev' : '/api';

export const getUserToken = () => localStorage.getItem('AuthorizationToken');

export async function getUserInfo() {
	try {
		const response = await fetch(`${proxy}/user/info`, {
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
		const response = await fetch(`${proxy}/cart/book/`, {
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
		const response = await fetch(`${proxy}/user/cart`, {
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
		const response = await fetch(`${proxy}/book/get-all`);
		if (!response.ok) throw new Error('Failed to fetch products');

		return await response.json();
	} catch (error) {
		console.error('Error fetching products:', error);
		return [];
	}
}
export async function fetchProductById(productId) {
	try {
		const response = await fetch(`${proxy}/book/get/${productId}`);
		if (!response.ok) throw new Error('Failed to fetch products');

		return response.json();
	} catch (error) {
		console.error('Error fetching products:', error);
		return [];
	}
}

export async function fetchBestSellers() {
	try {
		const response = await fetch(`${proxy}/book/get-best`);
		if (!response.ok) throw new Error('Failed to fetch products');

		return await response.json();
	} catch (error) {
		console.error('Error fetching products:', error);
		return [];
	}
}

export async function fetchPurchases() {
	try {
		return await fetch(`${proxy}/user/history/get-all`, {
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
	let response = await fetch(`${proxy}/cart/purchase`, {
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
		return response;
	});
	return response;
}

export async function fetchForgotPassword(email) {
	return fetch(`${proxy}/user/forgot-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email })
	});
}

export async function fetchChangeBillingInformations(
	billing_address,
	city,
	state_province,
	postal_code
) {
	return fetch(`${proxy}/user/change/billing-information`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getUserToken()
		},
		body: JSON.stringify({
			billing_address,
			city,
			state_province,
			postal_code
		})
	});
}

export async function fetchChangePersonalInformations(first_name, last_name, phone_number) {
	return fetch(`${proxy}/user/change/personal-information`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getUserToken()
		},
		body: JSON.stringify({
			first_name,
			last_name,
			phone_number
		})
	});
}

export async function fetchResetPassword(token, password) {
	return fetch(`${proxy}/user/reset-password?token=${token}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ password })
	});
}

export async function fetchSignIn(username, password) {
	return fetch(`${proxy}/user/sign-in`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	});
}

export async function fetchSignUp(email, username, password) {
	return fetch(`${proxy}/user/sign-up`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			username,
			password
		})
	});
}

export async function fetchSendVerifyCode(email) {
	return fetch(`${proxy}/user/send-code/email`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email })
	});
}

export async function fetchVerifyCode(code) {
	return fetch(`${proxy}/user/sign-in/email`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ code })
	});
}

export async function fetchChangeEmail(new_email, password) {
	return fetch(`${proxy}/user/change/email`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getUserToken()
		},
		body: JSON.stringify({ new_email, password })
	});
}

export async function fetchChangeUsername(new_username) {
	return fetch(`${proxy}/user/change/username`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getUserToken()
		},
		body: JSON.stringify({ new_username })
	});
}
export async function fetchChangePassword(old_password, new_password) {
	return fetch(`${proxy}/user/change/password`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getUserToken()
		},
		body: JSON.stringify({ old_password, new_password })
	});
}
export async function fetchDeleteAccount() {
	return fetch('${proxy}/user/delete-account', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getUserToken()
		}
	});
}

export async function fetchFilterBy(content) {
	return fetch(`${proxy}/book/filter-by`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ content })
	});
}
