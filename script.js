import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class LibraryManager {

    private final List<Snippet> snippetList;
    private final List<EA> eaList;
    private final List<PromptItem> promptList;

    public LibraryManager() {
        this.snippetList = new ArrayList<>();
        this.eaList = new ArrayList<>();
        this.promptList = new ArrayList<>();
    }

    // Classes for each item type
    public static class Snippet {
        private String id;
        private String title;
        private String description;
        private String code;
        private Date createdAt;

        // Constructors
        public Snippet() {}
        public Snippet(String id, String title, String description, String code, Date createdAt) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.code = code;
            this.createdAt = createdAt;
        }
        
        // Getters & setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
        public Date getCreatedAt() { return createdAt; }
        public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    }

    public static class EA {
        private String id;
        private String title;
        private String description;
        private String comments;
        private String snippet;
        private Date createdAt;

        public EA() {}
        public EA(String id, String title, String description, String comments, String snippet, Date createdAt) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.comments = comments;
            this.snippet = snippet;
            this.createdAt = createdAt;
        }

        // Getters & setters
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
        public Date getCreatedAt() { return createdAt; }
        public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    }

    public static class PromptItem {
        private String id;
        private String title;
        private String description;
        private String snippet;
        private Date createdAt;

        public PromptItem() {}
        public PromptItem(String id, String title, String description, String snippet, Date createdAt) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.snippet = snippet;
            this.createdAt = createdAt;
        }

        // Getters & setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getSnippet() { return snippet; }
        public void setSnippet(String snippet) { this.snippet = snippet; }
        public Date getCreatedAt() { return createdAt; }
        public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    }

    // Basic add methods
    public void addSnippet(Snippet snippet) {
        snippetList.add(snippet);
    }
    public void addEA(EA ea) {
        eaList.add(ea);
    }
    public void addPrompt(PromptItem prompt) {
        promptList.add(prompt);
    }

    // Basic getAll methods
    public List<Snippet> getAllSnippets() {
        return snippetList;
    }
    public List<EA> getAllEA() {
        return eaList;
    }
    public List<PromptItem> getAllPrompts() {
        return promptList;
    }

    // Sample test
    public static void main(String[] args) {
        LibraryManager manager = new LibraryManager();
        
        // Add sample items
        manager.addSnippet(new Snippet("snip1", "Reverse Array", "Reverse an array in JS", "function reverse(arr){ return arr.reverse(); }", new Date()));
        manager.addEA(new EA("ea1", "EA Title", "EA Desc", "Some Comments", "EA snippet code", new Date()));
        manager.addPrompt(new PromptItem("prompt1", "Prompt Title", "Short desc", "Describe an optimization technique.", new Date()));

        // Print them
        System.out.println("=== SNIPPETS ===");
        for (Snippet s : manager.getAllSnippets()) {
            System.out.println("ID: " + s.getId());
            System.out.println("Title: " + s.getTitle());
            System.out.println("CreatedAt: " + s.getCreatedAt());
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
            System.out.println("CreatedAt: " + e.getCreatedAt());
            System.out.println("----");
        }

        System.out.println("\n=== PROMPTS ===");
        for (PromptItem p : manager.getAllPrompts()) {
            System.out.println("ID: " + p.getId());
            System.out.println("Title: " + p.getTitle());
            System.out.println("Description: " + p.getDescription());
            System.out.println("Snippet: " + p.getSnippet());
            System.out.println("CreatedAt: " + p.getCreatedAt());
            System.out.println("----");
        }
    }
}
