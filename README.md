# Oltre le stelle 🌌

Un'esperienza romantica 3D per GitHub Pages, senza layout tradizionale: cielo stellato in movimento, pianeti 3D, nebulose, camera in volo, ricordi interattivi e una destinazione finale.

## Personalizzazione
Apri `app.js` e modifica l'oggetto `PERSONAL` all'inizio:
- `signature`: firma finale;
- `memories`: titoli e testi dei cinque pianeti. Inserisci ricordi reali vostri per renderlo personale.

## Pubblicazione
1. Crea un repository GitHub, per esempio `oltre-le-stelle`.
2. Carica `index.html`, `style.css`, `app.js`, `README.md` nella radice.
3. In **Settings → Pages**, scegli **Deploy from a branch**, `main`, `/ (root)`, poi salva.
4. Apri l'indirizzo GitHub Pages dopo la pubblicazione.

## Note tecniche
- `app.js` importa Three.js da jsDelivr: serve una connessione internet.
- Il progetto non richiede build o installazione.
- È un sito pubblico se pubblicato su GitHub Pages: non caricare dati sensibili.
- I ricordi iniziali sono segnaposto e vanno sostituiti.
- Il pulsante audio produce un tono ambientale sintetico semplice, attivabile dall'utente.
