<script>
	import { active } from "tinro";

	const logo = "/logo.png";
</script>

<nav class="head">
	<e class="active" />
	<a class="logo" href="/"><img height="48" alt="logo" src={logo} /></a>
	<a class="link" use:active href="/events">ARRANGEMENTER</a>
	<a class="link" use:active href="/jobs">STILLINGSANNONSER</a>
	<a class="link" use:active href="/bedrift">FOR BEDRIFTER</a>
	<a class="link" use:active href="/about">OM BETA</a>
</nav>

<style>
	@media screen and (max-width: 1280px) {
		.head {
			margin: 20px;
			max-width: 1100px;
			align-items: center;
		}
		a {
			text-align: center;
			display: block;
			margin: 15px 0;
			font-weight: normal;
		}
		.logo {
			width: 100%;
		}
	}

	@media screen and (min-width: 1280px) {
		.head {
			display: flex;
			margin: 50px auto 30px auto;
			max-width: 1100px;
			align-items: center;
		}
		a {
			font-size: 20px;
			margin: 0 15px;
			font-weight: normal;
		}
	}
	.logo {
		flex-grow: 1;
	}

	.active {
		color: #333;
		font-weight: bold;
	}
</style>
