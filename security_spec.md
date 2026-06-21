# security_spec.md

## Data Invariants

1. **User Identity:** A user record’s document ID must exactly match the user's authenticated `uid` (`request.auth.uid`).
2. **Account Verification:** Only users with a verified email address (`request.auth.token.email_verified == true`) are permitted to register as sellers or create shops.
3. **Pillar 2 Category Locks & Verification Logic:**
   - If a seller has an active verification badge (`verifyStatus != 'None'`), the shop is categorized under strict modification locks (`isLocked == true`).
   - Any updates to the Shop's `shopName` or `category` when `isLocked == true` are strictly forbidden unless the lock is toggled, which enforces the administrative/override protection.
4. **KYC Integrity:** A seller cannot self-approve their KYC status or verification status. High-privilege state fields like `kycStatus` and `verifyStatus` are immutable to standard users and can only be set or modified by administrative lookups or specific backend roles.
5. **No Orphaned Records:** Referenced identifiers in shop documentations must adhere to schema-defined string paths and match length formats.

---

## The "Dirty Dozen" Payloads

The following payloads represent malicious attempts to compromise authentication, schema types, category locks, KYC, or integrity. They must all yield `PERMISSION_DENIED`.

### 1. Identity Spoofing
An authenticated user (`uid: user_99`) tries to create a custom handle profile under a different user's UID path (`/users/user_100`).
```json
{
  "uid": "user_100",
  "handle": "@spoof",
  "displayName": "Impostor",
  "createdAt": "2026-06-21T10:00:00Z"
}
```

### 2. Custom Handle Size Poisoning
A user tries to register a handle that is excessively long (> 30 characters), attempting a memory/DoS resource exhaustion.
```json
{
  "uid": "user_99",
  "handle": "@verylonghandlethatshouldbeinvalidbyallstandardsandlongerthanlimits",
  "displayName": "Excessive Store",
  "createdAt": "request.time"
}
```

### 3. Handle Pattern Injection
A user tries to register a handle with invalid, malicious characters like SQL comments or HTML scripts to try and trigger XSS/Injection.
```json
{
  "uid": "user_99",
  "handle": "@nitish;<script>alert('xss')</script>",
  "displayName": "XSS Store",
  "createdAt": "request.time"
}
```

### 4. Client-Provided Timestamp (Temporal Corruption)
A user tries to bypass server-authoritative times, providing an invalid static past or future timestamp.
```json
{
  "uid": "user_99",
  "handle": "@nitish_rawat",
  "displayName": "Nitish Rawat",
  "createdAt": "2001-01-01T00:00:00Z"
}
```

### 5. Self-Assigned KYC Status Approval
A seller tries to directly write a document where their own `kycStatus` is `Approved`, bypassing checking gates.
```json
{
  "uid": "user_99",
  "kycStatus": "Approved",
  "verifyStatus": "None"
}
```

### 6. Privilege Escalation (Self-Assigned Verified Badge)
A standard seller tries to write their own `verifyStatus` as `Green` (Elite Brand) without appropriate admin-level assertions.
```json
{
  "uid": "user_99",
  "kycStatus": "None",
  "verifyStatus": "Green"
}
```

### 7. Unverified Email Access
An authenticated user with `email_verified == false` tries to register and construct a verified seller dossier.
```json
{
  "uid": "unverified_99",
  "kycStatus": "Pending",
  "verifyStatus": "None"
}
```

### 8. Giant Document ID Poisoning
A client tries to target a document with an extremely long ID string (e.g. 150+ characters of junk data).
```json
{
  "id": "shop_extremely_long_id_with_over_one_hundred_and_twenty_eight_junk_characters_that_aims_to_cause_storage_and_indexing_denial_of_wallet_attacks",
  "ownerUid": "user_99",
  "shopName": "Nitish Saree Center",
  "category": "Traditions Wear",
  "isLocked": false,
  "catalogCount": 3
}
```

### 9. Bypassing Category Lock
With `isLocked` set to `true`, the user tries to update the shop's `category` to `Modern Apparel` directly while keeping the lock intact.
```json
{
  "id": "shop_01",
  "ownerUid": "user_99",
  "shopName": "Aura Premium Styles",
  "category": "Modern Apparel",
  "isLocked": true,
  "catalogCount": 24,
  "updatedAt": "request.time"
}
```

### 10. Modifying Immutable Fields
A user tries to change the `ownerUid` or `id` of an existing active shop.
```json
{
  "id": "shop_01",
  "ownerUid": "hacker_99",
  "shopName": "Aura Premium Styles",
  "category": "Ethnic Apparel",
  "isLocked": false,
  "catalogCount": 24,
  "updatedAt": "request.time"
}
```

### 11. Type-Poisoned Catalog Count
A user attempts to submit a floating point or negative value or arbitrary string for the `catalogCount` attribute.
```json
{
  "id": "shop_01",
  "ownerUid": "user_99",
  "shopName": "Aura Premium Styles",
  "category": "Ethnic Apparel",
  "isLocked": false,
  "catalogCount": -12,
  "updatedAt": "request.time"
}
```

### 12. Ghost Field Injection (The "Shadow Update" Test)
A user attempts to add an unapproved schema property `"isPremiumWholesale"` to bypass validation checks.
```json
{
  "id": "shop_01",
  "ownerUid": "user_99",
  "shopName": "Aura Premium Styles",
  "category": "Ethnic Apparel",
  "isLocked": false,
  "catalogCount": 24,
  "isPremiumWholesale": true,
  "updatedAt": "request.time"
}
```

---

## Test Runner Definition

The verification test cases are represented below:

```typescript
// firestore.rules.test.ts
// Test cases mock the behavior of security parameters and assert PERMISSION_DENIED on each of the Dirty Dozen.
```
