# Identity-Reconciliation

## API Endpoint

**POST** `/api/v1/identifyCustomer/identify`

### Request Body

```json
{
  "email": "string (optional)",
  "phoneNumber": "string or number (optional)"
}
```

### Response

```json
{
  "isSuccess": true,
  "message": "Contact identified successfully",
  "data": {
    "contact": {
      "primaryContactId": 1,
      "emails": ["primary@email.com", "secondary@email.com"],
      "phoneNumbers": ["1234567890", "0987654321"],
      "secondaryContactIds": [2, 3]
    }
  }
}
```

---

## Project Overview

This service deduplicates customer identities based on email and phone number.  
It ensures a single "primary" contact per group and links all related contacts.

### Deduplication Rules

1. A contact can be linked if it shares either email or phone number.
2. The oldest contact (by `createdAt`) is "primary"; others are "secondary".
3. If a request matches multiple primaries, merge them: oldest stays primary, others become secondary and update `linkedId`.
4. If no contact matches, create a new primary contact.
5. If a request matches partially (new email/phone number), create a secondary contact linked to the existing primary.

---

## Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your PostgreSQL database in `.env`.
4. Run migrations:
   ```bash
   npm run db:migrate
   ```
5. Start the server:
   ```bash
   npm start
   ```

---

## Technologies Used

- Node.js
- Express
- Drizzle ORM
- Neon with PostgreSQL
- TypeScript

---

## Example Usage

**Request:**
```json
{
  "email": "john@example.com",
  "phoneNumber": "1234567890"
}
```

**Response:**
```json
{
  "isSuccess": true,
  "message": "Contact identified successfully",
  "data": {
    "contact": {
      "primaryContactId": 1,
      "emails": ["john@example.com"],
      "phoneNumbers": ["1234567890"],
      "secondaryContactIds": []
    }
  }
}
```

---

## Author
