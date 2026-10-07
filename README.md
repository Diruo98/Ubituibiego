# ✨ Il nostro piccolo universo

Un piccolo sito romantico statico da pubblicare gratuitamente con **GitHub Pages**.

## 1. Aggiungi le foto

Dentro `foto/` inserisci le tue immagini e chiamale:

- `foto1.jpg`
- `foto2.jpg`
- `foto3.jpg`
- `foto4.jpg`
- `foto5.jpg`
- `foto6.jpg`

Se hai meno di 6 foto, puoi modificare l'array `memories` in `script.js` e lasciare solo quelle che possiedi.

Puoi anche usare `.png` o `.webp`: in quel caso cambia il nome nel file `script.js`.

## 2. Personalizza il testo

Apri `index.html` e modifica:
- la frase iniziale;
- la lettera;
- la firma finale.

Poi modifica `script.js` per cambiare il titolo e la frase associata a ogni foto.

## 3. Musica (facoltativa)

Metti un file `musica.mp3` nella cartella principale e dentro `index.html` cambia:

```html
<audio id="music" loop preload="none">
  <!-- Inserisci qui una tua musica -->
</audio>
```

in:

```html
<audio id="music" loop preload="none">
  <source src="musica.mp3" type="audio/mpeg">
</audio>
```

Nota: alcuni browser impediscono l'avvio automatico della musica. Il pulsante ♪ è quindi intenzionalmente manuale.

## 4. Pubblica con GitHub Pages

1. Crea un repository su GitHub, per esempio `il-nostro-universo`.
2. Carica `index.html`, `style.css`, `script.js`, la cartella `foto/` e, se vuoi, `musica.mp3`.
3. Nel repository vai in **Settings → Pages**.
4. In **Build and deployment**, scegli **Deploy from a branch**.
5. Seleziona `main` e la cartella `/ (root)`.
6. Salva.
7. Dopo qualche momento GitHub mostrerà l'indirizzo del sito, normalmente:

`https://TUOUSERNAME.github.io/il-nostro-universo/`

## 5. QR Code

Dopo aver pubblicato il sito, copia l'indirizzo esatto della pagina e trasformalo in un QR code con un generatore QR affidabile.

Suggerimento: prima di stampare il QR, provalo con almeno due telefoni diversi.

## Struttura

```text
il-nostro-universo/
├── index.html
├── style.css
├── script.js
├── README.md
└── foto/
    ├── foto1.jpg
    ├── foto2.jpg
    ├── foto3.jpg
    ├── foto4.jpg
    ├── foto5.jpg
    └── foto6.jpg
```

## Privacy

GitHub Pages rende il sito pubblicamente accessibile a chi possiede l'indirizzo. Se non vuoi che le foto siano pubbliche, non usare GitHub Pages per questo progetto.
