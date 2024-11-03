<script>
	const handleUpdateInfo = async (e) => {
		e.preventDefault();
        isEditing = false;
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.disabled = true;
        });
	};

    const handleEditInfo = () => {
        isEditing = true;
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.disabled = false;
        });
    };

    const getUserInfo = async () => {
        const response = await fetch('/api/user/info');
        const data = await response.json();
        return data;
    };

    let isEditing = false;
</script>

<div class="w-full max-w-2xl px-4">
	<h2 class="text-2xl font-bold mb-6">Personal Information</h2>

	<form on:submit|preventDefault={handleUpdateInfo} class="space-y-6">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- First Name -->
			<div>
				<label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
				<input
					type="text"
					id="firstName"
					placeholder="John"
                    disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>

			<!-- Last Name -->
			<div>
				<label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
				<input
					type="text"
					id="lastName"
					placeholder="Doe"
                    disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>

			<!-- Email -->
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					id="email"
					placeholder="example@email.com"
                    autocomplete="off"
                    disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>

			<!-- Phone Number -->
			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
				<input
					type="tel"
					id="phone"
					placeholder="+36 30 123 4567"
                    disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>

			<!-- Username -->
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
				<input
					type="text"
					id="username"
					placeholder="johndoe123"
                    disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>
		</div>

		<!-- Submit Button -->
        <div class="flex justify-end">
		    {#if isEditing}
                <button type="submit" class="bg-primary-800 text-white px-4 py-2 rounded-lg hover:bg-primary-700 duration-300 transition-all">
                    Save Changes
                </button>
		    {:else}
                <button
                    type="button"
                    class="bg-primary-800 text-white px-4 py-2 rounded-lg hover:bg-primary-700 duration-300 transition-all"
                    on:click={() => handleEditInfo()}
                >
                    Edit Information
                </button>
            {/if}
        </div>
	</form>

	<!-- Change Password Section -->
	<div class="mt-10">
		<h3 class="text-xl font-semibold mb-4">Security</h3>
		<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
			<div>
				<p class="font-medium">Password</p>
				<p class="text-sm text-gray-500">Last changed 3 months ago</p>
			</div>
			<a
				href="/profile/change-password"
				class="bg-primary-800 text-white px-4 py-2 rounded-lg hover:bg-primary-700 duration-300 transition-all"
			>
				Change Password
			</a>
		</div>
	</div>
</div>
