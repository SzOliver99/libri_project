<script>
	import { getUserToken } from '$lib/api';
	import { onMount } from 'svelte';
	import { UserIcon } from 'lucide-svelte';
	import { page } from '$app/stores';

    const handleSignOut = () => {
		localStorage.removeItem('AuthorizationToken');
		window.location.href = '/';
	};

    const list = [
        { href: "/profile/history", title: "Purchase History" },
        { href: "/profile/personal-informations", title: "Personal Informations" },
        { href: "/profile/billing", title: "Billing Information" },
        { href: "/profile/delete", title: "Delete Account" }
    ];

	let loggedIn;
	onMount(async () => {
		loggedIn = getUserToken() ? true : false;
	});
</script>

<section>
	{#if loggedIn === true}
		<div class="hidden md:flex w-full h-[calc(100vh-7rem)] bg-slate-200 rounded-lg p-6">
			<div class="flex flex-col w-50">
                <h1 class="text-2xl font-bold mb-4">Profile</h1>
                <div class="flex flex-col gap-4 h-full">
                    {#each list as item}
                        <a href={item.href} class="text-sm text-left px-3 bg-primary-800 text-white py-1 rounded-lg hover:scale-105 hover:bg-primary-700 duration-300 transition-all">{item.title}</a>
                    {/each}

                    <button 
					class="text-sm py-2 bg-red-950 text-white mt-auto rounded-lg hover:scale-105 hover:bg-red-800 active:bg-red-900 duration-300 transition-all"
					on:click={handleSignOut}
					>Sign out</button>
                </div>
            </div>
			<div class="border-l-2 border-gray-300 h-full mx-4"></div>
			<div>
				<slot />
			</div>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center h-[calc(100vh-7rem)]">
			<h1 class="text-2xl font-bold">You are not logged in!</h1>
		</div>
	{/if}
</section>
