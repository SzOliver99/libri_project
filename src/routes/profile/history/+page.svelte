<script>
	let purchases = [
		{
			id: 1,
			date: '2024-01-15',
			items: [
				{
					name: 'Product 1',
					quantity: 2,
					price: 29.99
				},
				{
					name: 'Product 2',
					quantity: 1,
					price: 49.99
				}
			],
			total: 109.97,
			status: 'Delivered'
		},
		{
			id: 2,
			date: '2023-12-20',
			items: [
				{
					name: 'Product 3',
					quantity: 1,
					price: 79.99
				}
			],
			total: 79.99,
			status: 'Processing'
		},
		{
			id: 2,
			date: '2023-12-20',
			items: [
				{
					name: 'Product 3',
					quantity: 1,
					price: 79.99
				}
			],
			total: 79.99,
			status: 'Processing'
		},
		{
			id: 2,
			date: '2023-12-20',
			items: [
				{
					name: 'Product 3',
					quantity: 1,
					price: 79.99
				}
			],
			total: 79.99,
			status: 'Processing'
		},
		{
			id: 2,
			date: '2023-12-20',
			items: [
				{
					name: 'Product 3',
					quantity: 1,
					price: 79.99
				}
			],
			total: 79.99,
			status: 'Processing'
		},
		{
			id: 2,
			date: '2023-12-20',
			items: [
				{
					name: 'Product 3',
					quantity: 1,
					price: 79.99
				}
			],
			total: 79.99,
			status: 'Processing'
		},
		{
			id: 2,
			date: '2023-12-20',
			items: [
				{
					name: 'Product 3',
					quantity: 1,
					price: 79.99
				}
			],
			total: 79.99,
			status: 'Processing'
		},
		{
			id: 2,
			date: '2023-12-20',
			items: [
				{
					name: 'Product 3',
					quantity: 1,
					price: 79.99
				}
			],
			total: 79.99,
			status: 'Processing'
		}
	];
</script>

<div class="w-full max-w-7xl px-4">
	<h2 class="text-2xl font-bold mb-6">Purchase History</h2>

	{#if purchases.length === 0}
		<p class="text-gray-500 text-center py-8">No purchase history available</p>
	{:else}
		<div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
			{#each purchases as purchase}
				<div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full">
					<div class="flex justify-between items-center mb-4">
						<div>
							<p class="text-sm text-gray-500">Order #{purchase.id}</p>
							<p class="text-sm text-gray-500">{purchase.date}</p>
						</div>
						<span class="px-3 py-1 text-sm rounded-full {purchase.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
							{purchase.status}
						</span>
					</div>

					<div class="border-y border-gray-200 py-4">
						{#each purchase.items as item}
							<div class="flex justify-between items-center py-2">
								<div>
									<p class="font-medium">{item.name}</p>
									<p class="text-sm text-gray-500">Quantity: {item.quantity}</p>
								</div>
								<p class="font-medium">${item.price}</p>
							</div>
						{/each}
					</div>

					<div class="border-gray-200 pt-4 flex justify-between items-center mt-auto">
						<p class="font-medium">Total</p>
						<p class="font-bold text-lg">${purchase.total}</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
