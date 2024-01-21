# BetaDev wiki

Her skriver vi ned hva som må gjøres på nettsiden, og lager også en skisse til wikien.

## Ting å gjøre

- feature: login system
- feature: markdown system 
- feature: integrere markdown editor
- feature: legg til alle spill fra game jam 1 og 2 (h2023)
- feature: lage game jam entries side
- feature: lage wiki side
- feature: knapp som fører til wiki
- feature: fiske automatisk deployment
- feature: dark og light mode
- feature: server log, hvis den krasjer
- feature: ny kolonne på game jam entries; navn
- cleanup: lukke unødvendige porter som 8000 og 5000
- cleanup: lage betalan tab
- cleanup: merge dark mode
- cleanup: skrive om javascript
- cleanup: merge main
- cleanup: fikse tab skrift: databasefil
- cleanup: gi ssh access fra vps til gitolite
- bug: fikse https
- bug: fikse tabs
- bug: www.betauia.net funker ikke

## Wiki
For å starte serveren, må du ha tilgang til den. Så kan du bruke ssh. 
Kjøre serveren: 
lag virtual environment, og aktiver
installer flask
dtach -c /tmp/betauia-server flask –app app run –host=0.0.0.0

Vi bruker NGINX med letsencrypt sin certbot for ssl cert. 

Ny db: flask –app app init-db
Ny bruker: python3 create_user.py <username> <password>

## Spill
Spillene er hostet med Gitolite, på en egen bruker på vps som heter git. Med Gitolite kan du bestemme hvem som har tilgang til hvilke repos. Dette gjør at folk kan oppdatere spillene sine selv. For å gjøre dette, må du klone et repo som heter gitolite-admin, og endre på konfigurasjonsfilene der. Mer info finner du på internett.
