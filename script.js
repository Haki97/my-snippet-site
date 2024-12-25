import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB68foBKWO0OEJBh7YGAvMMs145ChfzfuQ",
  authDomain: "my-snippet-project-a84b5.firebaseapp.com",
  projectId: "my-snippet-project-a84b5",
  storageBucket: "my-snippet-project-a84b5.firebasestorage.app",
  messagingSenderId: "775794283075",
  appId: "1:775794283075:web:2edd77ebee2f4a4e54baf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let snippetArray = [];

window.toggleSidebar = function () {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('hidden');
};

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
      createdAt: data.createdAt,
    });
  });
  updateSidebar();
}

async function loadEaSnippets() {
  snippetArray = [];
  const q = query(collection(db, "snippets"), where("type", "==", "EA"));
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => {
    const data = doc.data();
    snippetArray.push({
      id: doc.id,
      title: data.title || "",
      description: data.description || "",
      code: data.code || "",
      createdAt: data.createdAt,
    });
  });
  updateSidebar();
}

function updateSidebar() {
  const snippetIndex = document.getElementById('snippetIndex');
  snippetIndex.innerHTML = "";
  snippetArray.forEach(snippet => {
    const li = document.createElement('li');
    li.textContent = snippet.title || "[Senza titolo]";
    li.addEventListener('click', () => showSnippetDetail(snippet));
    snippetIndex.appendChild(li);
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

window.searchLocal = function () {
  const input = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = "";

  if (!input) {
    resultsDiv.innerHTML = "<p>Inserisci una parola chiave per cercare.</p>";
    return;
  }

  const filtered = snippetArray.filter(snippet =>
    snippet.title.toLowerCase().includes(input) ||
    snippet.description.toLowerCase().includes(input) ||
    snippet.code.toLowerCase().includes(input)
  );

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>Nessun snippet trovato.</p>";
    return;
  }

  filtered.forEach(snippet => {
    const snippetElem = document.createElement('div');
    snippetElem.innerHTML = `
      <h3>${snippet.title}</h3>
      <p><em>${snippet.description}</em></p>
      <pre>${snippet.code}</pre>
      <hr>
    `;
    resultsDiv.appendChild(snippetElem);
  });
};

window.addSnippet = async function () {
  const titleField = document.getElementById('title');
  const descriptionField = document.getElementById('description');
  const codeField = document.getElementById('code');
  const infoAdd = document.getElementById('infoAdd');

  const title = titleField.value.trim();
  const description = descriptionField.value.trim();
  const code = codeField.value.trim();

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
      type: "snippet", // Default to snippet
      createdAt: new Date(),
    });
    infoAdd.style.color = "green";
    infoAdd.textContent = "Snippet salvato con successo!";
    titleField.value = "";
    descriptionField.value = "";
    codeField.value = "";
    await loadAllSnippets();
  } catch (err) {
    console.error("Errore durante il salvataggio:", err);
    infoAdd.style.color = "red";
    infoAdd.textContent = "Errore durante il salvataggio!";
  }
};

(async function start() {
  await loadAllSnippets();
})();
