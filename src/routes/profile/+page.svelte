<script>
	import { getUserToken } from '$lib/api';
	import { onMount } from 'svelte';
	import { UserIcon } from 'lucide-svelte';
	import { page } from '$app/stores';

    const handleSignOut = () => {
		localStorage.removeItem('AuthorizationToken');
		window.location.href = ``;
	};

    const list = {
        history: "Purchase History",
        password: "Change Password",
        email: "Change Email",
        address: "Change Address",
        phone: "Change Phone Number",
        delete: "Delete Account"
    }

	let loggedIn;
	onMount(async () => {
		loggedIn = getUserToken() ? true : false;
	});
</script>

<section>
	{#if loggedIn === true}
		<div class="hidden md:flex w-full h-[calc(100vh-7rem)] bg-slate-200 rounded-lg p-6">
			<div class="flex flex-col w-1/5">
                <h1 class="text-2xl font-bold mb-4">Profile</h1>
                <div class="flex flex-col gap-4 h-full">
                    {#each Object.keys(list) as key}
                        <button class="text-sm text-left px-3 bg-primary-800 text-white py-1 rounded-lg hover:scale-105 hover:bg-primary-700 duration-300 transition-all">{list[key]}</button>
                    {/each}

                    <button class="text-sm py-2 bg-red-950 text-white mt-auto rounded-lg hover:scale-105 hover:bg-red-800 active:bg-red-900">Sign out</button>
                </div>
            </div>
			<div class="border-l-2 border-gray-300 h-full mx-4"></div>
			<div class="w-4/5">
				<h1 class="text-2xl font-bold mb-4">Residential Address</h1>
                <p>asdas</p>
			</div>
		</div>
	{:else}
		
	{/if}
</section>
