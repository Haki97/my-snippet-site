// Nome della chiave in localStorage
const STORAGE_KEY = 'snippetList';

// Carica snippet da localStorage (ritorna array)
function loadSnippets() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

// Salva un array di snippet in localStorage
function saveSnippets(snippets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

// Aggiungi un nuovo snippet
function addSnippet() {
  const titleField = document.getElementById('title');
  const descField = document.getElementById('description');
  const codeField = document.getElementById('code');
  const insertMsg = document.getElementById('insertMsg');

  const title = titleField.value.trim();
  const description = descField.value.trim();
  const code = codeField.value.trim();

  if (!title || !code) {
    insertMsg.textContent = 'Devi almeno inserire un titolo e del codice!';
    return;
  }

  const snippet = {
    title,
    description,
    code
  };

  // Carica gli snippet già esistenti
  const snippets = loadSnippets();
  // Aggiungi il nuovo
  snippets.push(snippet);
  // Salva tutto
  saveSnippets(snippets);

  // Messaggio di conferma
  insertMsg.textContent = 'Snippet salvato correttamente!';
  
  // Svuota i campi
  titleField.value = '';
  descField.value = '';
  codeField.value = '';
}

// Ricerca snippet
function searchSnippets() {
  const key = document.getElementById('searchKey').value.trim().toLowerCase();
  const searchResults = document.getElementById('searchResults');
  const searchMsg = document.getElementById('searchMsg');

  searchResults.innerHTML = '';
  searchMsg.textContent = '';

  if (!key) {
    searchMsg.textContent = 'Inserisci una parola chiave per cercare.';
    return;
  }

  const snippets = loadSnippets();
  // Filtra snippet
  const filtered = snippets.filter(sn => {
    return (
      sn.title.toLowerCase().includes(key) ||
      (sn.description && sn.description.toLowerCase().includes(key)) ||
      sn.code.toLowerCase().includes(key)
    );
  });

  if (filtered.length === 0) {
    searchMsg.textContent = 'Nessun snippet trovato.';
    return;
  }

  // Costruisce card per ogni snippet
  filtered.forEach(snippet => {
    // Creiamo un div card
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Titolo (cliccabile -> copia codice)
    const titleEl = document.createElement('div');
    titleEl.classList.add('card-title');
    titleEl.textContent = snippet.title;
    titleEl.addEventListener('click', () => copyCode(snippet.code));

    // Descrizione
    const descEl = document.createElement('div');
    descEl.classList.add('card-desc');
    descEl.textContent = snippet.description || '';

    // Codice
    const codeEl = document.createElement('div');
    codeEl.classList.add('card-code');
    codeEl.textContent = snippet.code;

    // Assembliamo la card
    card.appendChild(titleEl);
    if (snippet.description) {
      card.appendChild(descEl);
    }
    card.appendChild(codeEl);

    searchResults.appendChild(card);
  });
}

// Copia il codice negli appunti
function copyCode(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert('Codice copiato negli appunti!'))
    .catch(err => console.error('Errore copia:', err));
}
