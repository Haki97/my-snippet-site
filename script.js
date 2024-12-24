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

/* Sostituisci con i TUOI valori da "Project settings" -> "Config" */
const firebaseConfig = {
  apiKey: "TUO_API_KEY",
  authDomain: "TUO_PROJECT_ID.firebaseapp.com",
  projectId: "TUO_PROJECT_ID",
  storageBucket: "TUO_PROJECT_ID.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefgh"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

/***********************************************
 * 2) VARIABILI GLOBALI
 ***********************************************/
let snippetArray = [];  // qui manteniamo in memoria tutti gli snippet

/***********************************************
 * 3) TOGGLE SIDEBAR
 ***********************************************/
window.toggleSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('hidden');
};

/***********************************************
 * 4) CARICAMENTO SNIPPET (LETTURA)
 ***********************************************/
async function loadAllSnippets() {
  snippetArray = []; // svuotiamo l'array

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

/* Aggiorna l'indice nella sidebar */
function updateSidebar() {
  const snippetIndex = document.getElementById('snippetIndex');
  snippetIndex.innerHTML = "";

  snippetArray.forEach(sn => {
    const li = document.createElement('li');
    li.textContent = sn.title || "[Senza titolo]";
    li.addEventListener('click', () => showSnippetDetail(sn));
    snippetIndex.appendChild(li);
  });
}

/* Mostra un singolo snippet al centro (in #searchResults) */
function showSnippetDetail(snippet) {
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = `
    <h2>${snippet.title}</h2>
    <p><em>${snippet.description}</em></p>
    <pre>${snippet.code}</pre>
  `;
}

/***********************************************
 * 5) RICERCA LOCALE
 ***********************************************/
window.searchLocal = function() {
  const input = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = "";

  if (!input) {
    resultsDiv.innerHTML = "<p>Inserisci una parola chiave per cercare.</p>";
    return;
  }

  const filtered = snippetArray.filter(sn => {
    return (
      sn.title.toLowerCase().includes(input) ||
      sn.description.toLowerCase().includes(input) ||
      sn.code.toLowerCase().includes(input)
    );
  });

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>Nessun snippet trovato.</p>";
    return;
  }

  filtered.forEach(sn => {
    const snippetElem = document.createElement('div');
    snippetElem.innerHTML = `
      <h3>${sn.title}</h3>
      <p><em>${sn.description}</em></p>
      <pre>${sn.code}</pre>
      <hr>
    `;
    resultsDiv.appendChild(snippetElem);
  });
};

/***********************************************
 * 6) INSERIMENTO SNIPPET (SCRITTURA)
 ***********************************************/
window.addSnippet = async function() {
  const titleField       = document.getElementById('title');
  const descriptionField = document.getElementById('description');
  const codeField        = document.getElementById('code');
  const infoAdd          = document.getElementById('infoAdd');

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

    // Svuota campi
    titleField.value       = "";
    descriptionField.value = "";
    codeField.value        = "";

    // Ricarichiamo i dati e aggiorniamo sidebar
    await loadAllSnippets();
    updateSidebar();

  } catch (err) {
    console.error("Errore salvataggio:", err);
    infoAdd.style.color = "red";
    infoAdd.textContent = "Errore durante il salvataggio!";
  }
};

/***********************************************
 * 7) AVVIO INIZIALE
 ***********************************************/
(async function start() {
  try {
    // Carichiamo tutti gli snippet dal DB
    await loadAllSnippets();
    // Aggiorniamo la sidebar
    updateSidebar();
  } catch (err) {
    console.error("Errore iniziale:", err);
  }
})();
