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

public class FirebaseSnippetManager {
    private static Firestore db;

    public static void main(String[] args) {
        try {
            // Initialize Firebase
            initializeFirebase();

            // Load all snippets
            System.out.println("Loading all snippets...");
            List<QueryDocumentSnapshot> snippets = getAllSnippets();
            for (QueryDocumentSnapshot snippet : snippets) {
                displaySnippet(snippet);
            }

            // Add a new snippet
            System.out.println("\nAdding a new snippet...");
            String snippetId = addSnippet("New Title", "New Description", "New Code");
            System.out.println("Snippet added with ID: " + snippetId);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Initialize Firebase Firestore using the Admin SDK.
     */
    private static void initializeFirebase() throws IOException {
        // Load the service account key JSON file
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
     * Retrieve all snippets from Firestore.
     */
    private static List<QueryDocumentSnapshot> getAllSnippets() throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = db.collection("snippets").get();
        QuerySnapshot snapshot = future.get();
        return snapshot.getDocuments();
    }

    /**
     * Add a new snippet to Firestore.
     */
    private static String addSnippet(String title, String description, String code) throws ExecutionException, InterruptedException {
        Map<String, Object> snippet = new HashMap<>();
        snippet.put("title", title);
        snippet.put("description", description);
        snippet.put("code", code);
        snippet.put("createdAt", System.currentTimeMillis());

        ApiFuture<DocumentReference> future = db.collection("snippets").add(snippet);
        return future.get().getId();
    }

    /**
     * Display a single snippet's details.
     */
    private static void displaySnippet(QueryDocumentSnapshot snippet) {
        System.out.println("Snippet ID: " + snippet.getId());
        System.out.println("Title: " + snippet.getString("title"));
        System.out.println("Description: " + snippet.getString("description"));
        System.out.println("Code: " + snippet.getString("code"));
        System.out.println("Created At: " + snippet.get("createdAt"));
        System.out.println("-----------------------------");
    }
}
