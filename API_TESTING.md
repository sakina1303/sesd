# API Testing Guide

## Using cURL

### 1. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Save the `access_token` from the response.

### 3. Report Lost Item
```bash
TOKEN="your-jwt-token-here"

curl -X POST http://localhost:5000/api/items/lost \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=iPhone 13 Pro" \
  -F "description=Blue iPhone 13 Pro with cracked screen" \
  -F "location=Library 3rd Floor"
```

### 4. Get AI Matches
```bash
curl -X GET http://localhost:5000/api/items/lost/1/matches \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Submit Claim
```bash
curl -X POST http://localhost:5000/api/claims/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "lost_item_id": 1,
    "found_item_id": 2
  }'
```

## Using Postman

1. Import the API collection (create a Postman collection)
2. Set environment variable `baseUrl` = `http://localhost:5000/api`
3. Set environment variable `token` after login
4. Use `{{token}}` in Authorization header

## Expected Response Formats

### Success Response
```json
{
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": "Additional information"
}
```

### Match Response
```json
{
  "matches": [
    {
      "found_item": {...},
      "similarity_score": 0.85,
      "match_confidence": "High"
    }
  ]
}
```
