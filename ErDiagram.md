
---

# 4. ErDiagram.md (Mermaid)

```md
# ER Diagram – AI Lost & Found System

```mermaid
erDiagram

USER {
  int id
  string name
  string email
  string password
  string role
}

LOST_ITEM {
  int id
  string name
  string description
  string image
  string location
  string status
  int user_id
}

FOUND_ITEM {
  int id
  string name
  string description
  string image
  string location
  string status
  int user_id
}

CLAIM {
  int id
  int lost_item_id
  int found_item_id
  int claimant_user_id
  string status
}

USER ||--o{ LOST_ITEM : reports
USER ||--o{ FOUND_ITEM : reports
USER ||--o{ CLAIM : creates

LOST_ITEM ||--o{ CLAIM : referenced_in
FOUND_ITEM ||--o{ CLAIM : referenced_in
