import java.util.ArrayList;
import java.util.List;

/**
 * A simple manager for three item types: Snippet, EA, and Prompt.
 * In a real app, you'd link it to Firestore or a database.
 */
public class LibraryManager {
    
    private final List<Snippet> snippetList;
    private final List<EA> eaList;
    private final List<PromptItem> promptList;

    public LibraryManager() {
        snippetList = new ArrayList<>();
        eaList = new ArrayList<>();
        promptList = new ArrayList<>();
    }

    public static class Snippet {
        private String id;
        private String title;
        private String description;
        private String code;

        // Constructors
        public Snippet() {}
        public Snippet(String id, String title, String description, String code) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.code = code;
        }

        // Getters and Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
    }

    public static class EA {
        private String id;
        private String title;
        private String description;
        private String comments;
        private String snippet;

        // Constructors
        public EA() {}
        public EA(String id, String title, String description, String comments, String snippet) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.comments = comments;
            this.snippet = snippet;
        }

        // Getters and Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getComments() { return comments; }
        public void setComments(String comments) { this.comments = comments; }
        public String getSnippet() { return snippet; }
        public void setSnippet(String snippet) { this.snippet = snippet; }
    }

    public static class PromptItem {
        private String id;
        private String title;
        private String description;
        private String snippet; // The text or content of the prompt

        public PromptItem() {}
        public PromptItem(String id, String title, String description, String snippet) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.snippet = snippet;
        }

        // Getters and Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getSnippet() { return snippet; }
        public void setSnippet(String snippet) { this.snippet = snippet; }
    }

    // Adders
    public void addSnippet(Snippet s) {
        snippetList.add(s);
    }
    public void addEA(EA e) {
        eaList.add(e);
    }
    public void addPrompt(PromptItem p) {
        promptList.add(p);
    }

    // Retrievers
    public List<Snippet> getAllSnippets() {
        return snippetList;
    }
    public List<EA> getAllEA() {
        return eaList;
    }
    public List<PromptItem> getAllPrompts() {
        return promptList;
    }

    // Example main test
    public static void main(String[] args) {
        LibraryManager manager = new LibraryManager();

        // Add some sample items
        manager.addSnippet(new Snippet("snip1", "Reverse Array", "Reverses an array", "function reverseArray(arr){ return arr.reverse(); }"));
        manager.addEA(new EA("ea1", "EA Title", "EA Desc", "Some Comments", "EA snippet code"));
        manager.addPrompt(new PromptItem("prompt1", "Prompt Title", "Short desc", "Explain how to optimize an algorithm"));

        // Print them
        System.out.println("=== SNIPPETS ===");
        for (Snippet s : manager.getAllSnippets()) {
            System.out.println("ID: " + s.getId());
            System.out.println("Title: " + s.getTitle());
            System.out.println("Description: " + s.getDescription());
            System.out.println("Code: " + s.getCode());
            System.out.println("----");
        }

        System.out.println("\n=== EA ===");
        for (EA e : manager.getAllEA()) {
            System.out.println("ID: " + e.getId());
            System.out.println("Title: " + e.getTitle());
            System.out.println("Description: " + e.getDescription());
            System.out.println("Comments: " + e.getComments());
            System.out.println("Snippet: " + e.getSnippet());
            System.out.println("----");
        }

        System.out.println("\n=== PROMPTS ===");
        for (PromptItem p : manager.getAllPrompts()) {
            System.out.println("ID: " + p.getId());
            System.out.println("Title: " + p.getTitle());
            System.out.println("Description: " + p.getDescription());
            System.out.println("Content: " + p.getSnippet());
            System.out.println("----");
        }
    }
}
