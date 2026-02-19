# Class Diagram – AI Lost & Found System

```mermaid
classDiagram

class User {
  id
  name
  email
  password
  role
  login()
  register()
}

class Item {
  id
  name
  description
  image
  location
  status
}

class LostItem
class FoundItem

class Claim {
  id
  status
  createClaim()
  updateStatus()
}

class AIMatchService {
  findMatches()
  calculateSimilarity()
}

class ItemService {
  addLostItem()
  addFoundItem()
}

class ClaimService {
  createClaim()
  approveClaim()
  rejectClaim()
}

Item <|-- LostItem
Item <|-- FoundItem

User --> LostItem
User --> FoundItem
User --> Claim

Claim --> LostItem
Claim --> FoundItem

AIMatchService --> Item
ItemService --> Item
ClaimService --> Claim
