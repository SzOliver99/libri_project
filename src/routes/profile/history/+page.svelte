<script>
	import { getUserToken, fetchPurchases } from '$lib/api';
	import { notify } from '$lib/utils/notify';

	async function refreshPurchases() {
		purchases = await fetchPurchases();
	}

	let purchases = $state([]);
	$effect(async () => {
		if (!getUserToken()) return;

		refreshPurchases();
	});
</script>

<section class="w-full max-w-7xl px-4">
	<h2 class="mb-6 text-2xl font-bold">Purchase History</h2>

	{#if purchases.length === 0}
		<p class="py-8 text-center text-gray-500">No purchase history available</p>
	{:else}
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
			{#each purchases as purchase}
				<div class="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<div class="mb-4 flex items-center justify-between">
						<div>
							<p class="text-sm text-gray-500">Order #{purchase.id}</p>
							<p class="text-sm text-gray-500">{purchase.purchase_date}</p>
						</div>
						<span
							class="rounded-full px-3 py-1 text-sm {purchase.status === 'Delivered'
								? 'bg-green-100 text-green-800'
								: 'bg-yellow-100 text-yellow-800'}"
						>
							{purchase.status}
						</span>
					</div>

					<div class="border-y border-gray-200 py-4">
						{#each purchase.books as item}
							<div class="flex items-center justify-between py-2">
								<div>
									<p class="font-medium">{item.title}</p>
									<p class="text-sm text-gray-500">Quantity: {item.quantity}</p>
								</div>
								<p class="whitespace-nowrap font-medium">{item.price * (item.quantity || 1)} Ft</p>
							</div>
						{/each}
					</div>

					<div class="mt-auto flex items-center justify-between border-gray-200 pt-4">
						<p class="font-medium">Total</p>
						<p class="text-lg font-bold">{purchase.price} Ft</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>
