# Use Case Diagram – AI Lost & Found System

```mermaid
flowchart LR

User((User))
Admin((Admin))
AI((AI Matching Service))

User --> Register
User --> Login
User --> ReportLostItem
User --> ReportFoundItem
User --> ViewMatches
User --> SubmitClaim
User --> ViewHistory

Admin --> AdminLogin
Admin --> ViewAllItems
Admin --> ApproveClaim
Admin --> RejectClaim

ReportLostItem --> AI
ReportFoundItem --> AI
AI --> ViewMatches
