<script>
	import { onMount } from "svelte";

	import { fly } from "svelte/transition";

	onMount(() => {
		show = true;
	});

	let show = false;
	const art = `
                                                                                            
                                                                                            
BBBBBBBBBBBBBBBBB   EEEEEEEEEEEEEEEEEEEEEETTTTTTTTTTTTTTTTTTTTTTT         AAA               
B::::::::::::::::B  E::::::::::::::::::::ET:::::::::::::::::::::T        A:::A              
B::::::BBBBBB:::::B E::::::::::::::::::::ET:::::::::::::::::::::T       A:::::A             
BB:::::B     B:::::BEE::::::EEEEEEEEE::::ET:::::TT:::::::TT:::::T      A:::::::A            
  B::::B     B:::::B  E:::::E       EEEEEETTTTTT  T:::::T  TTTTTT     A:::::::::A           
  B::::B     B:::::B  E:::::E                     T:::::T            A:::::A:::::A          
  B::::BBBBBB:::::B   E::::::EEEEEEEEEE           T:::::T           A:::::A A:::::A         
  B:::::::::::::BB    E:::::::::::::::E           T:::::T          A:::::A   A:::::A        
  B::::BBBBBB:::::B   E:::::::::::::::E           T:::::T         A:::::A     A:::::A       
  B::::B     B:::::B  E::::::EEEEEEEEEE           T:::::T        A:::::AAAAAAAAA:::::A      
  B::::B     B:::::B  E:::::E                     T:::::T       A:::::::::::::::::::::A     
  B::::B     B:::::B  E:::::E       EEEEEE        T:::::T      A:::::AAAAAAAAAAAAA:::::A    
BB:::::BBBBBB::::::BEE::::::EEEEEEEE:::::E      TT:::::::TT   A:::::A             A:::::A   
B:::::::::::::::::B E::::::::::::::::::::E      T:::::::::T  A:::::A               A:::::A  
B::::::::::::::::B  E::::::::::::::::::::E      T:::::::::T A:::::A                 A:::::A 
BBBBBBBBBBBBBBBBB   EEEEEEEEEEEEEEEEEEEEEE      TTTTTTTTTTTAAAAAAA                   AAAAAAA

Heisann, Lyst til å være med å bidra til å gjøre BETA bedre, send inn en søknad på https://forms.office.com/r/YPd8g07p5q da vell, så sees vi nok snart ;)
`;

	console.log(art);
</script>

<svelte:head>
	<title>Hjem - Beta</title>
	<meta
		name="description"
		content="BETA er linjeforeningen for datastudenter ved UiA, og drives av studenter ved disse studiene."
	/>
</svelte:head>

<main>
	{#if show}
		<div class="container" in:fly={{ y: 20 }}>
			<a href="/about/komitee" class="card velkommen">
				<h1>Velkommen til alle nye studenter!</h1>
				<h3>
					Trykk her for å få mer informasjon om de forskjellige
					interessegruppene og komiteene du kan bli med i og gjøre
					BETA enda bedre!
				</h3>
			</a>
			<div class="card apply">
				<h2>
					For å bli med i en eller flere interessegrupper/komiteer, Så
					kan du melde din interesse her
					<br />
					<br />
					<a href="https://forms.office.com/r/YPd8g07p5q"
						>https://forms.office.com/r/YPd8g07p5q</a
					>
				</h2>
			</div>
			<div class="card header">
				<h2>Velkommen til BETA!</h2>
				<p>
					BETA er linjeforeningen for datastudentene ved UiA, og
					drives av studenter ved disse studiene.
				</p>
				<p>
					BETA's formål er å gi disse studentene veiledning i
					studiesituasjonen, arrangere kurs som utfyller fagtilbudet
					ved UiA, fremme kontakten med næringslivet og bidra med
					sosiale aktiviteter.
				</p>
			</div>

			<div class="card bedpres">
				<div class="cont">
					<div class="half">
						<h2>Bedpres / Kurs</h2>
						<ul class="nox">
							<li>Mer info kommer :)</li>
						</ul>
					</div>
					<div class="half">
						<h2>Møter</h2>
						<ul class="nox">
							<li>Mer info kommer :)</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="card facebook">
				<div class="full" in:fly>
					<h2>Sosiale Lenker</h2>
					<blockquote>
						<li>
							<a
								href="https://www.facebook.com/beta.linjeforening/"
								>Facebook</a
							>
						</li>
						<li>
							<a href="https://www.instagram.com/betauia/"
								>Instagram</a
							>
						</li>

						<li>
							<a href="https://github.com/betauia">Github</a>
						</li>
						<li>
							<a
								href="https://www.linkedin.com/company/beta-engineering-technology-association"
								>Linkedin</a
							>
						</li>
						<li>
							<a href="https://www.strava.com/clubs/betauia"
								>Strava</a
							>
						</li>
					</blockquote>
				</div>
			</div>

			<!--div class="card nytt">
				<div>
					<h2></h2>
					<div class="news">
						<a
							><h3 class="dist">BetaLAN Pog!</h3>
							<p class="dist">
								Da er det straks klart for en ny runde med
								BetaLAN! BetaLAN vil foregå på bluebox som
								vanlig, og finner i år sted den 25.10. Husk å
								meld dere på arrangementet på forhånd slik at
								dere bare kan...
							</p>
						</a>
						<div class="gray">16.08.2020</div>
					</div>
					<div class="news">
						<a
							><h3 class="dist">CGI</h3>
							<p class="dist">
								21.09.2020 Kommer CGI for å holde
								bedriftspresentasjon med beta! Her er det gode
								muligheter for å bli kjent med en vikitg aktør
								fra næringslivet! Det blir servert Wraps og
								brus! Påmelding via docs...
							</p>
						</a>
						<div class="gray">28.08.2020</div>
					</div>
				</div>
			</div-->
		</div>
	{/if}
</main>

<style>
	@media screen and (max-width: 1280px) {
		main {
			margin: 20px;
		}
		.container {
			display: grid;
			grid-template-columns: 1fr;
			grid-gap: 20px;
			grid-template-areas:
				"velkommen"
				"apply"
				"header"
				"bedpres"
				"nytt"
				"facebook";
		}
	}
	@media screen and (min-width: 1280px) {
		.container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 20px;
			grid-template-areas:
				"velkommen velkommen"
				"blank facebook"
				"header header"
				"bedpres bedpres";
		}
	}

	.velkommen {
		grid-area: velkommen;
		background-color: #26c5f3;
	}
	.header {
		grid-area: header;
	}
	.bedpres {
		grid-area: bedpres;
	}
	.partner {
		grid-area: partner;
	}
	.facebook {
		grid-area: facebook;
	}
	ul {
		list-style: none;
		padding: 0px;
	}
	li {
		display: flex;
		justify-content: space-between;
	}

	.bg_blue {
		background-color: #26c5f3;
	}
	.dist {
		margin: 5px;
		padding: 0;
	}
	.full {
		width: 100%;
	}

	.center {
		text-align: center;
	}
	.gray {
		color: #555;
		padding-left: 5px;
	}
	.news {
		margin-bottom: 30px;
	}
	.cont {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 40px;
	}
	/*	img {
		width: 100%;
	}
*/
</style>
