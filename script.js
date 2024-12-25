import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public class SnippetManager {
    private static Firestore db;

    public static void main(String[] args) {
        try {
            // Initialize Firebase
            initializeFirebase();

            // Test Adding a Snippet
            addSnippet("Example Title", "Example Description", "Example Code");

            // Fetch and Display All Snippets
            List<QueryDocumentSnapshot> snippets = getAllSnippets();
            displaySnippets(snippets);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Initialize Firebase Firestore using Service Account Key.
     */
    private static void initializeFirebase() throws IOException {
        // Load Service Account Key File
        FileInputStream serviceAccount = new FileInputStream("path/to/serviceAccountKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setProjectId("my-snippet-project-a84b5")
                .build();

        FirebaseApp.initializeApp(options);
        db = FirestoreClient.getFirestore();
        System.out.println("Firebase initialized successfully.");
    }

    /**
     * Add a new snippet to Firestore.
     *
     * @param title       Title of the snippet.
     * @param description Description of the snippet.
     * @param code        Code content of the snippet.
     */
    private static void addSnippet(String title, String description, String code) {
        Map<String, Object> snippet = new HashMap<>();
        snippet.put("title", title);
        snippet.put("description", description);
        snippet.put("code", code);
        snippet.put("createdAt", System.currentTimeMillis());

        try {
            ApiFuture<DocumentReference> result = db.collection("snippets").add(snippet);
            System.out.println("Snippet added with ID: " + result.get().getId());
        } catch (Exception e) {
            System.err.println("Error adding snippet: " + e.getMessage());
        }
    }

    /**
     * Retrieve all snippets from Firestore.
     *
     * @return List of all snippets as documents.
     */
    private static List<QueryDocumentSnapshot> getAllSnippets() {
        try {
            ApiFuture<QuerySnapshot> future = db.collection("snippets").get();
            return future.get().getDocuments();
        } catch (Exception e) {
            System.err.println("Error fetching snippets: " + e.getMessage());
            return List.of();
        }
    }

    /**
     * Display a list of snippets in the console.
     *
     * @param snippets List of snippets to display.
     */
    private static void displaySnippets(List<QueryDocumentSnapshot> snippets) {
        if (snippets.isEmpty()) {
            System.out.println("No snippets found.");
            return;
        }

        System.out.println("Snippets:");
        for (QueryDocumentSnapshot doc : snippets) {
            System.out.println("ID: " + doc.getId());
            System.out.println("Title: " + doc.getString("title"));
            System.out.println("Description: " + doc.getString("description"));
            System.out.println("Code: " + doc.getString("code"));
            System.out.println("Created At: " + doc.get("createdAt"));
            System.out.println("--------------------");
        }
    }
}
