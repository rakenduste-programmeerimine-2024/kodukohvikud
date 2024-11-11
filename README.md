# Kodukohvikute Rakendus

## Kirjeldus
Rakendus, kus kasutajad saavad sirvida ja avastada erinevaid kodukohvikuid oma lähiümbruses. Sisselogitud kasutajad saavad lisada oma kodukohviku, hinnata teisi kohvikuid ning jälgida teisi kasutajaid, et hoida end kursis nende lemmikkohvikute uute pakkumiste ja sündmustega.

Kodukohvikute külastamine pakub suurepärase võimaluse leida unikaalseid maitseelamusi ja toetada kohalikke tegijaid. See rakendus sobib hästi neile, kes otsivad autentset ja omapärast kohvikukogemust, ilma et peaksid tavakohvikute kõrgeid hindu maksma. Samuti aitab rakendus luua kogukonda, kus kodukohvikute pidajad ja kohvikuhuvilised saavad suhelda ja kogemusi jagada.

## Funktsionaalsused

### Pealeht
- Ülevaade populaarsetest kodukohvikutest ja uusimatest lisandustest.

### Kasutaja loomine
- Võimalus luua kasutajakonto, et pääseda ligi personaliseeritud funktsioonidele.

### Sisselogimine / väljalogimine
- Turvaline sisselogimine ja väljalogimine.

### Kasutajate jälgimine
- Kasutajad saavad jälgida teisi kohvikupidajaid ja huvilisi, et luua oma kohvikuvõrgustik.

### Kodukohviku lisamine
- Kodukohviku andmete sisestamine:
  - **Nimi** – kohviku nimi
  - **Pilt** – visuaalne esindus
  - **Asukoht** – aadress või ligikaudne asukoht
  - **Kohviku tüübi valik** (nt hommikukohvik, magusakohvik, soolakohvik)
  - **Avamisajad** – millal kohvik avatud on
  - **Pakkumised** – spetsiaalsed menüüvalikud või üritused
  - **Kontaktandmed** – telefon või e-mail

### Kohvikuvoog (feed)
- Kohvikute voog, kus kuvatakse kasutajale kohvikuid vastavalt tema eelistustele.

### Kohvikuvoolu filtreerimine
- Filtreerimise võimalused:
  - **Asukoht** – kuvab ainult kohvikuid kasutaja valitud piirkonnas
  - **Kohviku tüüp** – kohvikud vastavalt tüübile (magus, soolane, hommik jne)
  - **Jälgitavad kasutajad** – ainult jälgitavate kasutajate kohvikud

### Kasutaja, kes ei ole sisselogitud
- Piiratud funktsionaalsus, kus kuvatakse üldine ülevaade kodukohvikutest ja filtreerimine ainult kohviku tüübi järgi.

---
### wireframe link
https://www.figma.com/design/cIC2hktI7OXKrafbdhIkmx/Untitled?node-id=0-1&node-type=canvas&t=syKL9FI53Po7IW7M-0
---
## Projekti Tööplaan

**10.11**

- Uurida ja valida kaardirakenduste API (nt Google Maps, Leaflet), et kuvada kodukohvikud Eesti kaardil.
- Alustada projektikeskkonna seadistamisega (nt React, Node.js või Next.js).
- Luua projekti esmane raamistik, sealhulgas kaardi, autentimise ja kohvikute registreerimise komponentide paigutus.

**17.11**

- Luua API funktsionaalsus kodukohvikute registreerimiseks ja kuvamiseks.
- Arendada esmane andmebaasimudel (nt kohvikute asukoht, aadress, menüü, omaniku info).
- Testida ja kinnitada, et kasutajad saavad edukalt registreerida ja leida kodukohvikuid.

**24.11**

- Arendada funktsioone kohvikute haldamiseks (nt muutmine, menüü uuendamine).
- Arendada kodukohvikute kuvamise moodul kaardil.
- Luua administraatori paneel, kus omanikud saavad hallata oma kodukohvikut.
- Alustada UI disainiga, et muuta kohvikute ja menüüde kuvamine kasutajatele atraktiivseks ja hõlpsasti navigeeritavaks.

**01.12**

- Lisada funktsioon, mis võimaldab kasutajatel hinnata kodukohvikuid.
- Lisada kasutajate autentimine ja sisselogimine, et kasutajad saaksid kodukohvikut registreerida ja hallata.
- Testida ja parandada UI-d, et pakkuda sujuvat kasutuskogemust.

**08.12**

- Viia läbi põhjalik testimine, et leida ja parandada bugid ning optimeerida jõudlust.
- Teha lõplik esitlus ja arutada võimalikke tulevasi täiustusi.
- Viimistleda kasutajaliides ja täiustada kasutajakogemust.
- Koostada dokumentatsioon ja kasutusjuhendid veebilehe efektiivseks kasutamiseks.

---
## Meeskond
- Hannes Väster
- Eerik Poopuu
- Erik Brück
- Kaspar Merisalu
- Kaspar Merisalu
- Erik brück
