/***********************************************
 * 1) IMPORT E CONFIGURAZIONE FIREBASE
 ***********************************************/
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Configurazione Firebase (sostituisci con i TUOI valori)
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefgh"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

/***********************************************
 * 2) VARIABILI GLOBALI
 ***********************************************/
let snippetArray = [];
let eaArray      = [];

/***********************************************
 * 3) TOGGLE SIDEBAR
 ***********************************************/
window.toggleSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('hidden');
};

/***********************************************
 * 4) MOSTRA / NASCONDI FORM
 ***********************************************/
window.showSnippetForm = function() {
  document.getElementById('snippetForm').classList.add('active');
  document.getElementById('eaForm').classList.remove('active');
};

window.showEAForm = function() {
  document.getElementById('eaForm').classList.add('active');
  document.getElementById('snippetForm').classList.remove('active');
};

/***********************************************
 * 5) CARICAMENTO SNIPPET & EA (LETTURA)
 ***********************************************/
async function loadAllSnippets() {
  snippetArray = [];
  const snapshot = await getDocs(collection(db, "snippets"));
  snapshot.forEach(doc => {
    const data = doc.data();
    snippetArray.push({
      id: doc.id,
      title: data.title || "",
      description: data.description || "",
      code: data.code || "",
      createdAt: data.createdAt
    });
  });
}

async function loadAllEA() {
  eaArray = [];
  const snapshot = await getDocs(collection(db, "ea"));
  snapshot.forEach(doc => {
    const data = doc.data();
    eaArray.push({
      id: doc.id,
      title: data.title || "",
      description: data.description || "",
      code: data.code || "",
      createdAt: data.createdAt
    });
  });
}

function updateSidebar() {
  const snippetIndex = document.getElementById('snippetIndex');
  const eaIndex      = document.getElementById('eaIndex');

  snippetIndex.innerHTML = "";
  eaIndex.innerHTML      = "";

  snippetArray.forEach(sn => {
    const li = document.createElement('li');
    li.textContent = sn.title || "[Senza titolo]";
    li.addEventListener('click', () => showSnippetDetail(sn));
    snippetIndex.appendChild(li);
  });

  eaArray.forEach(ea => {
    const li = document.createElement('li');
    li.textContent = ea.title || "[Senza titolo]";
    li.addEventListener('click', () => showEADetail(ea));
    eaIndex.appendChild(li);
  });
}

function showSnippetDetail(snippet) {
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = `
    <h2>${snippet.title}</h2>
    <p><em>${snippet.description}</em></p>
    <pre>${snippet.code}</pre>
  `;
}

function showEADetail(ea) {
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = `
    <h2>${ea.title}</h2>
    <p><em>${ea.description}</em></p>
    <pre>${ea.code}</pre>
  `;
}

/***********************************************
 * 6) RICERCA LOCALE (SNIPPET + EA)
 ***********************************************/
window.searchLocal = function() {
  const input = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = "";

  if (!input) {
    resultsDiv.innerHTML = "<p>Inserisci una parola chiave per cercare.</p>";
    return;
  }

  const filteredSnippets = snippetArray.filter(sn => {
    return (
      sn.title.toLowerCase().includes(input) ||
      sn.description.toLowerCase().includes(input) ||
      sn.code.toLowerCase().includes(input)
    );
  });

  const filteredEA = eaArray.filter(ea => {
    return (
      ea.title.toLowerCase().includes(input) ||
      ea.description.toLowerCase().includes(input) ||
      ea.code.toLowerCase().includes(input)
    );
  });

  if (filteredSnippets.length === 0 && filteredEA.length === 0) {
    resultsDiv.innerHTML = "<p>Nessun risultato trovato.</p>";
    return;
  }

  // Mostriamo i risultati Snippet
  if (filteredSnippets.length > 0) {
    const snippetHeader = document.createElement('h3');
    snippetHeader.textContent = "Risultati Snippet:";
    resultsDiv.appendChild(snippetHeader);

    filteredSnippets.forEach(sn => {
      const snippetElem = document.createElement('div');
      snippetElem.innerHTML = `
        <h4>${sn.title}</h4>
        <p><em>${sn.description}</em></p>
        <pre>${sn.code}</pre>
        <hr>
      `;
      resultsDiv.appendChild(snippetElem);
    });
  }

  // Mostriamo i risultati EA
  if (filteredEA.length > 0) {
    const eaHeader = document.createElement('h3');
    eaHeader.textContent = "Risultati EA:";
    resultsDiv.appendChild(eaHeader);

    filteredEA.forEach(ea => {
      const eaElem = document.createElement('div');
      eaElem.innerHTML = `
        <h4>${ea.title}</h4>
        <p><em>${ea.description}</em></p>
        <pre>${ea.code}</pre>
        <hr>
      `;
      resultsDiv.appendChild(eaElem);
    });
  }
};

/***********************************************
 * 7) INSERIMENTO SNIPPET / EA (SCRITTURA)
 ***********************************************/
window.addSnippet = async function() {
  const titleField       = document.getElementById('titleSnippet');
  const descriptionField = document.getElementById('descriptionSnippet');
  const codeField        = document.getElementById('codeSnippet');
  const infoAdd          = document.getElementById('infoAddSnippet');

  const title       = titleField.value.trim();
  const description = descriptionField.value.trim();
  const code        = codeField.value.trim();

  if (!title || !code) {
    infoAdd.style.color = "red";
    infoAdd.textContent = "Inserisci almeno un titolo e del codice!";
    return;
  }

  try {
    await addDoc(collection(db, "snippets"), {
      title,
      description,
      code,
      createdAt: new Date()
    });
    infoAdd.style.color = "green";
    infoAdd.textContent = "Snippet salvato con successo!";

    titleField.value       = "";
    descriptionField.value = "";
    codeField.value        = "";

    await loadAllSnippets();
    updateSidebar();
  } catch (err) {
    console.error("Errore salvataggio snippet:", err);
    infoAdd.style.color = "red";
    infoAdd.textContent = "Errore durante il salvataggio!";
  }
};

window.addEA = async function() {
  const titleField       = document.getElementById('titleEA');
  const descriptionField = document.getElementById('descriptionEA');
  const codeField        = document.getElementById('codeEA');
  const infoAdd          = document.getElementById('infoAddEA');

  const title       = titleField.value.trim();
  const description = descriptionField.value.trim();
  const code        = codeField.value.trim();

  if (!title || !code) {
    infoAdd.style.color = "red";
    infoAdd.textContent = "Inserisci almeno un titolo e del codice!";
    return;
  }

  try {
    await addDoc(collection(db, "ea"), {
      title,
      description,
      code,
      createdAt: new Date()
    });
    infoAdd.style.color = "green";
    infoAdd.textContent = "EA salvato con successo!";

    titleField.value       = "";
    descriptionField.value = "";
    codeField.value        = "";

    await loadAllEA();
    updateSidebar();
  } catch (err) {
    console.error("Errore salvataggio EA:", err);
    infoAdd.style.color = "red";
    infoAdd.textContent = "Errore durante il salvataggio!";
  }
};

/***********************************************
 * 8) AVVIO INIZIALE
 ***********************************************/
(async function start() {
  try {
    await loadAllSnippets();
    await loadAllEA();
    updateSidebar();
  } catch (err) {
    console.error("Errore iniziale:", err);
  }
})();
