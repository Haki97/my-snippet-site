// Nome della chiave da usare in localStorage
const SNIPPETS_KEY = 'mysnippets';

// Questa funzione carica tutti gli snippet salvati in localStorage
function loadSnippets() {
  const saved = localStorage.getItem(SNIPPETS_KEY);
  if (!saved) {
    return []; // Se non c'è nulla, restituiamo un array vuoto
  }
  // Se c'è, convertiamo da stringa JSON a array
  return JSON.parse(saved);
}

// Questa funzione salva un array di snippet in localStorage
function saveSnippets(snippets) {
  localStorage.setItem(SNIPPETS_KEY, JSON.stringify(snippets));
}

// Funzione chiamata quando clicchi "Salva snippet"
function addSnippet() {
  const titleField = document.getElementById('title');
  const codeField = document.getElementById('code');

  const title = titleField.value.trim();
  const code = codeField.value.trim();

  if (!title || !code) {
    alert('Inserisci almeno un titolo e del codice.');
    return;
  }

  // Carica snippet esistenti
  const snippets = loadSnippets();

  // Aggiunge il nuovo snippet
  snippets.push({
    title: title,
    code: code
  });

  // Salva di nuovo in localStorage
  saveSnippets(snippets);

  alert('Snippet salvato con successo!');

  // Svuota i campi
  titleField.value = '';
  codeField.value = '';
}

// Funzione per cercare snippet in base a parola chiave
function searchSnippets() {
  const key = document.getElementById('searchKey').value.trim().toLowerCase();
  const resultsList = document.getElementById('results');

  // Svuotiamo la lista
  resultsList.innerHTML = '';

  if (!key) {
    alert('Inserisci almeno una parola chiave');
    return;
  }

  const snippets = loadSnippets();

  // Filtra snippet che contengono la parola chiave nel titolo o nel codice
  const filtered = snippets.filter(snippet =>
    snippet.title.toLowerCase().includes(key) ||
    snippet.code.toLowerCase().includes(key)
  );

  if (filtered.length === 0) {
    resultsList.innerHTML = '<li>Nessun snippet trovato</li>';
    return;
  }

  // Mostriamo i risultati
  filtered.forEach(snippet => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${snippet.title}</b>: <pre>${snippet.code}</pre>`;
    resultsList.appendChild(li);
  });
}
