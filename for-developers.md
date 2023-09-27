Her ligger planen for nettsiden.

Vi har et [google docs](https://docs.google.com/document/d/1CjgAVb8YmcYH2ZEyVPL0cWT0qKIYIVwKiQafgooqHuo) dokument for bugs, features og utkast til *wiki-en* vi vil lage. Her er et utdrag fra nå, *13-12-23*:
> ## Ting å gjøre
> - [ ] feature: login system
> - [ ] feature: markdown system 
> - [ ] feature: integrere markdown editor
> - [ ] feature: spill til game jam
> - [ ] feature: lage game jam entries side
> - [ ] feature: lage wiki side
> - [ ] feature: knapp som fører til wiki
> - [ ] feature: fiske automatisk deployment
> - [ ] feature: dark og light mode
> - [ ] feature: server log, hvis den krasjer
> - [ ] cleanup: lukke unødvendige porter som 8000 og 5000
> - [ ] cleanup: lage betalan tab
> - [ ] cleanup: merge dark mode
> - [ ] cleanup: skrive om javascript
> - [ ] cleanup: merge main
> - [ ] cleanup: fikse tab skrift: databasefil
> - [ ] bug: fikse https
> - [ ] bug: fikse tabs
> - [ ] bug: www.betauia.net funker ikke

### struktur
- [hovedside](#hovedside)
	- [feed](#feed)
	- [upcoming](#upcoming)
	- [tabs](#tabs)
		- betasec
		- bedkom
		- eventkom
		- [betadev](#tabs)
			- [spillarkiv](#arkiv-spill)
	- [admin functions](#admin-functions)

# hovedside
Dette er det første brukeren ser. Vi skal informere brukere som:
- lurer på hva Beta er
- er nysgjerrige på de forskjellige grenene
- ser etter arrangementer som kommer
- vil kontakte oss

Litt sånn layout:
```
(logo)
| Om Beta | BetaDev | Bedkom | ...
(tab innhold) + feed
(kontakt oss)
```

# feed
Denne har innhold som oppdateres automatisk, og tar innlegg fra *ting-som-skjer* i Discord.

# upcoming
Denne har innhold som oppdateres automatisk, og tar innlegg fra Betas kalender.

# tabs
Hver av grenene i Beta skal ha sine egne undersider. Disse kan redigeres med [admin funksjoner](#admin-functions).

# side-betadev
Dette er en seksjon i hovedsiden. Brukere skal informeres om:
- hva betadev er, og hvordan man kan bli med
- hva Game Jam er og tips for spillutvikling

# arkiv-spill
Dette er en del av betadevsiden, der du kan se bidrag til tidligere Game Jams. Hvis mulig kan du prØve spillene i browser.

# admin-functions
Dette er for styret i Beta, så de enkelt kan logge inn på nettsiden og oppdatere sin [tab](#tabs) ved å redigere et markdown dokument. På denne måten slipper de å involvere oss developers hver gang.

Du vil få:
- en drop down menu der du kan velge hvilken side du skal redigere, eller feed.
- en text box eller editor med den gamle siden du kan redigere
- en knapp med `send` eller `discard`

# tips
- lokal server: `python -m http.server`, eller vscode live server
