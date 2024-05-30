# Dev wiki

Dette er BETADEV sin utvikler-wiki for nettside prosjektet. Denne er laget for å samle så mye relevant info om prosjektet som mulig, på ett tilgjengelig sted. Dette gjøres for å forbedre samarbeid og kommunikasjon innen teamet og gjøre det lettere å introdusere nye!

Her finner du:

- **Prosjektoversikter**: Hva vi jobber med nå og planene fremover.
- **Verktøy/teknologier**: Hva vi bruker og hvordan vi bruker det.
- **Beste praksis/konvensjoner**: Hvordan vi skriver og vedlikeholder kode.
- **Planer/roadmaps**: Hvor vi er på vei og langsiktige mål.
- **Onboarding**: Hjelp for nye utviklere som har lyst til å engasjere seg.
- **Kommunikasjon/kontakt**: Hvem du kan kontakte og hvordan vi jobber og møter.
- **FAQ/feilsøking**: Svar på vanlige spørsmål og løsninger på vanlige problemer.

## Verktøy/teknologier

- **Verktøy**
    - **Git**: Versjonskontrollsystem, repository finnes på [GitHub](https://github.com/askeladd123/betadev-developed-development.net).
    - **Docker**: Containerisering, bruker Docker Compose for håndtering.
- **Teknologier**
    - **Flask**: Python webapp, brukes fullstack.
    - **NGINX**: Revers proxy-server.
## Beste praksis/konvensjoner

Under konstruksjon

## Planer/roadmaps

Under konstruksjon

## Onboarding

Under konstruksjon

## Kommunikasjon/kontakt

### Møter

BETADEV har ukentlige møter gjennom hele semesteret. Møtet er hver onsdag kl. 16:15 og blir annonsert på BETA sin discord.

### Kontaktpersoner

- Ask Sødal (leder)
    - Mail: betadev@betauia.net/asks@uia.no
    - Discord: [kjell_tore](https://discordapp.com/users/321235877567266818)

## FAQ/feilsøking

Under konstruksjon

<!-- ## Ting å gjøre -->
<!---->
<!-- - feature: login system -->
<!-- - feature: markdown system  -->
<!-- - feature: integrere markdown editor -->
<!-- - feature: legg til alle spill fra game jam 1 og 2 (h2023) -->
<!-- - feature: lage game jam entries side -->
<!-- - feature: lage wiki side -->
<!-- - feature: knapp som fører til wiki -->
<!-- - feature: fiske automatisk deployment -->
<!-- - feature: dark og light mode -->
<!-- - feature: server log, hvis den krasjer -->
<!-- - feature: ny kolonne på game jam entries; navn -->
<!-- - cleanup: lukke unødvendige porter som 8000 og 5000 -->
<!-- - cleanup: lage betalan tab -->
<!-- - cleanup: merge dark mode -->
<!-- - cleanup: skrive om javascript -->
<!-- - cleanup: merge main -->
<!-- - cleanup: fikse tab skrift: databasefil -->
<!-- - cleanup: gi ssh access fra vps til gitolite -->
<!-- - bug: fikse https -->
<!-- - bug: fikse tabs -->
<!-- - bug: www.betauia.net funker ikke -->
<!---->
<!-- ## Wiki -->
<!-- For å starte serveren, må du ha tilgang til den. Så kan du bruke ssh.  -->
<!-- Kjøre serveren:  -->
<!-- lag virtual environment, og aktiver -->
<!-- installer flask -->
<!-- dtach -c /tmp/betauia-server flask –app app run –host=0.0.0.0 -->
<!---->
<!-- Vi bruker NGINX med letsencrypt sin certbot for ssl cert.  -->
<!---->
<!-- Ny db: flask –app app init-db -->
<!-- Ny bruker: python3 create_user.py <username> <password> -->
<!---->
<!-- ## Spill -->
<!-- Spillene er hostet med Gitolite, på en egen bruker på vps som heter git. Med Gitolite kan du bestemme hvem som har tilgang til hvilke repos. Dette gjør at folk kan oppdatere spillene sine selv. For å gjøre dette, må du klone et repo som heter gitolite-admin, og endre på konfigurasjonsfilene der. Mer info finner du på internett. -->
