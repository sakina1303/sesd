
# Sequence Diagram – Lost Item Matching and Claim Flow

```mermaid
sequenceDiagram

participant User
participant Backend
participant Database
participant AI
participant Admin

User->>Backend: Submit Lost Item
Backend->>Database: Save Lost Item
Backend->>AI: Request Matching
AI->>Backend: Return Matches
Backend->>User: Show Matches

User->>Backend: Submit Claim
Backend->>Database: Save Claim (PENDING)

Admin->>Backend: Approve Claim
Backend->>Database: Update Claim Status (APPROVED)
Backend->>User: Notify Claim Approved
