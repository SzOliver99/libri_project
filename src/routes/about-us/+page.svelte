<script>
	import image from '$lib/images/Pannonhalmi-Konyvtar-1024x576.jpg';
</script>

<svelte:head>
	<title>About-Us Page</title>
</svelte:head>

<section class="container mx-auto px-4 py-10">
	<h1 class="mb-6 text-center text-4xl font-bold text-primary-500">Rólunk</h1>

	<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
		<!-- Image Section -->
		<div class="flex justify-center">
			<img src={image} alt="Library Basement" class="rounded-lg shadow-lg" />
		</div>

		<!-- Text Section -->
		<div class="text-primary-900">
			<h2 class="mb-4 text-3xl font-semibold text-primary-700">
				Üdvözöljük a Library Basement-ben!
			</h2>
			<p class="mb-4 leading-relaxed">
				A Library Basement nem csupán egy könyvesbolt, hanem egy különleges hely, ahol az irodalom
				szerelmesei találkozhatnak, megoszthatják egymással az olvasás örömét, és új kedvenceket
				fedezhetnek fel. Szakértő csapatunk minden látogatót szívesen segít a tökéletes könyv
				megtalálásában.
			</p>
			<p class="mb-4 leading-relaxed">
				Könyvválasztékunkban megtalálhatók a klasszikus irodalom remekművei, a modern bestsellerek,
				gyermekkönyvek, tudományos kiadványok és még sok más. Helyet biztosítunk azok számára is,
				akik szeretnének elmélyedni az olvasásban, egy csésze kávé társaságában.
			</p>
			<p class="mb-4 leading-relaxed">
				Folyamatosan bővítjük kínálatunkat, és rendszeresen szervezünk könyvbemutatókat, író-olvasó
				találkozókat és irodalmi eseményeket. Nálunk a könyvek nem csupán árucikkek, hanem az
				életünk részei.
			</p>
		</div>
	</div>

	<div class="mt-12">
		<h2 class="mb-4 text-center text-2xl font-semibold text-primary-700">
			Kapcsolat és Nyitvatartás
		</h2>
		<div class="flex flex-col justify-around text-center text-primary-900 md:flex-row md:text-left">
			<div class="mb-8 md:mb-0">
				<h3 class="mb-2 text-lg font-semibold text-primary-600">Cím</h3>
				<p>Könyvtári Alagsor</p>
				<p>Budapest, Fő utca 42.</p>
			</div>
			<div class="mb-8 md:mb-0">
				<h3 class="mb-2 text-lg font-semibold text-primary-600">Nyitvatartás</h3>
				<p>Hétfő-Péntek: 10:00 - 18:00</p>
				<p>Szombat: 10:00 - 14:00</p>
				<p>Vasárnap: Zárva</p>
			</div>
			<div>
				<h3 class="mb-2 text-lg font-semibold text-primary-600">Elérhetőség</h3>
				<p>Telefon: +36 1 234 5678</p>
				<p>E-mail: info@librarybasement.hu</p>
			</div>
		</div>
	</div>
</section>
