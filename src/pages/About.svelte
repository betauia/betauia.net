<script>
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import { router } from "tinro";

	$: console.log();

	onMount(() => {
		show = true;
	});

	let show = false;

	const about = `
		<h2>Om Beta</h2>
			<p>
				Beta er linjeforeningen for datastudenter ved Universitetet
				i Agder. Beta er en non-profit organisasjon. Det betyr Beta
				ikke driver for å tjene penger, men heller bruker
				fortjenesten på våre medlemmer. Alle studenter ved
				datarelaterte fag ved UiA er automatisk medlem av Beta
				dersom en ikke aktivt melder seg ut. Det betyr at vi idag
				har omlag 500 medlemmer.
			</p>`;

	const verv = `
		<h2>Verv</h2>
			<p>
				Beta har 8 forskjellige verv i hovedstyret
				<ul style="list-style:none; padding:0">
					<li>Leder</li>
					<li>Nestleder</li>
					<li>Økonomiansvarlig</li>
					<li>BetaLAN leder</li>
					<li>Bedkom leder</li>
					<li>Eventkom leder</li>
					<li>BetaDEV leder</li>
					<li>BetaSEC leder</li>
				</ul>
			</p>
		<h3>Leder</h3>
		<p>
			Lederen har den øverste ansvaret i organisasjonen. De skal sørge for
			 den daglige driften av organisasjonen.
		</p>

		<br>

		<h3>Nestleder</h3>
		<p>
			Nestlederens ansvar er å være lederens høyre hånd.
		</p>

		<br>

		<h3>Økonomiansvarlig</h3>
		<p>
			Økonomiansvarlig har ansvaret for organisasjonens økonomi.
		</p>

		<br>

		<h3>BetaLAN leder</h3>
		<p>
			BetaLAN leder har ansvar for å planlegge, og organisere BetaLan,
			som er et LAN-party som blir avholdt en gang per semester.
		</p>

		<br>

		<h3>Bedkom leder</h3>
		<p>
			Bedkom leder har ansvar for å ha kontakt med bedrifter, og planlegge
			framtidige bedrifstpresentasjoner, og andre arrangementer.
		</p>
		<div>

		<br>

		<h3>Eventkom leder</h3>
		<p>
			Eventkom leder har ansvar for å planlegge og organisere andre
			arrangementer som skal skje i løpet av semesteret.
		</p>
		<div>

		<br>

		<h3>BetaDEV leder</h3>
		<p>
			BetaDEV leder har ansvar for interessegruppen BetaDEV. Ansvaret her
			ligger i å planlegge og oragnisere et møte annenhver uke, samt
			eventuelt andre arrangementer.
		</p>
		</div>

		<br>

		<h3>BetaSEC leder</h3>
		<p>
			BetaSEC leder har ansvar for interessegruppen BetaSEC. Ansvaret her
			ligger i å planlegge og oragnisere et møte annenhver uke, samt
			eventuelt andre arrangementer.
		</p>
		`;

	const interestGroups = `
				<h2>Interessegrupper</h2>
				<div class="cont">
					<div class="half">
						<h3>BetaSec</h3>
						<p>
							BetaSec er en gruppe studenter med interresse for
							sikkerhet. Her går vi gjennom alt fra CTF'er til
							andre sikkerhetsrelaterte utfordringer.
							I Betasec vil en ikke bare få muligheten til å være med å diskutere sikkerhet, men en vil også få mulighet til å være med å arrangere CTF'er som er i regi av Betasec.
							En vil få muligheten til å være med å kunne lage oppgaver til CTF'er, drifte infrastrukturen som hoster plattformen, oppgavene og hvordan 
						</p>
					</div>
					<br/>
					<br/>
					<div class="half">
						<h3>BetaDev</h3>
						<p>
							BetaDev er en gjeng som er interresert i alt av
							utvikling. De har blant annet vært med på å designe
							og utvikle nettsiden du sitter å ser på akkurat nå.
							Annet enn det holder de på med å utvikle en Discord
							bot, og diverse python scripts og andre godbiter.
							Stikk en tur innom hvis dette høres kult ut.
						</p>
					</div>
				</div>
			`;

	const komiteer = `
				<h2>Komiteer</h2>
				<div class="cont">
					<div class="half">
						<h3>Bedriftskomiteen</h3>
						<p>
							Bedriftskomitéen er BETAs bindeledd mellom bedrifter og studentene. Komitéen står som ansvarlig for å sørge for at
							kontakten mellom bedrifter og studentene opprettholdes. Dette utføres ved å kommunisere via mail, for å planlegge og
							arrangere ulike arrangementer i samarbeid med bedriftene. Arrangementene varierer som regel mellom å være
							bedriftspresentasjoner, workshops eller konkurranser (slik som for eksempel. CTF\’er), men kan også være andre typer
							arrangementer som en blir enig med bedriftene om å arrangere.
						</p>

						<p>
							Medlemmer av bedriftskomitéen vil få en helt unik mulighet til å bryne seg på en rekke oppgaver. Som komitémedlem
							vil du få ansvar for en eller flere bedrifter, hvor du fungerer som BETAs kontaktperson til bedriftene. Bedriftsansvar vil
							bli tildelt av komitélederen på komitémøtene. Ditt ansvar vil da være å kommunisere og planlegge arrangementer med
							bedriftene. Så fort du og bedriften har kommet til enighet om at et arrangement skal ta sted, vil det være ditt ansvar å
							sørge for at alt som må på plass for at arrangementet skal bli en suksess, blir håndtert. Som komitémedlem vil du bli
							kalt inn til møter enten hver eller annenhver uke. Her vil du ha mulighet til å komme med forslag til endringer eller
							idéer som komité lederen kan ta med videre til hovedstyret.
						</p>

						<p>
							Som medlem av bedriftskomitéen, vil du få mulighet til å knytte kontakt med en rekke bedrifter innen data- og
							teknologibransjen, som kan skape unike utvidelser i ditt nettverk og kunne gi deg mulige fordeler i jobbsøker
							sammenheng. I tillegg vil du få erfaring med å arbeide i grupper og å være en del av en større organisasjon.
						</p>
					</div>
					<br/>
					<div class="half">
						<h3>Eventkomiteen</h3>
						<p>
							Det å være medlem av Betas komiteer er et lav-terksel tilbud som ikke innebærer mer ansvar enn medlemmet ønsker
							å ta. Mulige arbeidsoppgaver er omtrent alt som har med sosiale eller faglige arrangementer å gjøre.
							Dette tilsvarer arrangementer som Retrokveld, Smash Bluebox, brettspillkvelder, fester og fagkvelder.
							Typiske arrangementer som ikke er eventkomiteens ansvar er BetaLAN, CTFer og bedriftspresentasjoner.
							Arbeidsoppgavene kan typisk være planlegging, utvikling av Facebook arrangement/PR, booking av rom, rigging og
							ordning av arrangementet fysisk. Det er gode muligheter for å realisere egne arrangementer gjennom eventkomiteen.
						</p>
					</div>
					<br/>
					<div class="half">
						<h3>BetaLan</h3>
						<p>
							BetaLAN er et LAN party som varer fra fredag til søndag i løpet av en helg per semester. Vi er vert for flere 
							konkurranser som vil ha en premie for høyt plasserende konkurrenter. Bli med som crew så får du gratis billett 
							og være med å bestemme! Å være crew kan være en god måte å få litt erfaring med lokalt nettverk, server/game-server 
							managing og event planlegging. Alle i crew får være med i konkurranser og får gratis pizza i løpet av helga.
						</p>
					</div>
				</div>
			`;

	const history = `
			<h2>Historie</h2>
				<p>
					Beta ble grunnlagt i 2006 mens det fortsatt het Høyskolen i
					Agder, deretter, under flyttingen i 2010 fulgte Beta med inn
					på Universitetet i Agder.
				</p>
				<p>
					Beta har hatt en lang tradisjon med å forbedre det
					studentsosiale mulighet rundt studiet for studenter. Vi
					arrangerer blant annet BetaLAN og Retrokveld som er helt
					åpent for alle studenter, samt bedriftpresentasjoner som har
					hjulpet studenter ut i arbeidslivet.
				</p>
				<p>
					Siden oppstarten har Beta vært underlagt STA
					(STudentorganisasjonen i Agder), men det var først i 2014 at
					Beta for første gang ble registrert i Brønnøysund Registeret
					som en frivillig organisasjon under STA.
				</p>
		`;

	const getPage = (page) => {
		switch (page) {
			case "komitee":
				return komiteer;
			case "interest":
				return interestGroups;
			case "verv":
				return verv;
			case "about":
				return about;
			case "history":
				return history;
		}
	};

	$: content = getPage($router.path.split("/").pop());
</script>

<svelte:head>
	<title>Om oss - Beta</title>
	<meta name="description" content="Informasjon om Beta" />
</svelte:head>

<main>
	{#if show}
		<div class="container" in:fly={{ y: 20 }}>
			<div class="card sidebar">
				<ul>
					<a href="/about">
						<li
							class={$router.path.split("/").pop() === "about" &&
								"selected"}
						>
							Om BETA
						</li></a
					>
					<a href="/about/komitee">
						<li
							class={$router.path.split("/").pop() ===
								"komitee" && "selected"}
						>
							Komiteer
						</li></a
					>
					<a href="/about/interest">
						<li
							class={$router.path.split("/").pop() ===
								"interest" && "selected"}
						>
							Interessegrupper
						</li></a
					>
					<a href="/about/verv">
						<li
							class={$router.path.split("/").pop() === "verv" &&
								"selected"}
						>
							Verv
						</li></a
					>
					<a href="/about/history"
						><li
							class={$router.path.split("/").pop() ===
								"history" && "selected"}
						>
							Historie
						</li></a
					>
				</ul>
			</div>

			<div class="card content">
				{@html content}
			</div>
		</div>
	{/if}
</main>

<style>
	.container {
		display: grid;
		grid-gap: 20px;
		grid-template-areas: "sidebar content";
		grid-template-columns: 1fr 3fr;
	}
	.sidebar {
		grid-area: sidebar;
		padding: 15px;
	}
	.content {
		grid-area: content;
	}
	ul {
		list-style: none;
		padding-left: 0;
		margin-top: 0;
	}
	li {
		padding: 10px;
	}
	li.selected {
		background-color: #eee;
	}
	.card {
		min-height: 600px;
	}
</style>
