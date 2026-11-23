# Tourism 360 Security Specification

## Data Invariants
1. **User Profile Privacy (PII Isolation)**: Documents under `/users/{userId}` contain PII (`email`, `mobileNumber`, `fullName`) and may ONLY be read, created, or updated by `request.auth.uid == userId`. No user can list `/users`.
2. **Owner-Scoped Preferences**: Documents under `/users/{userId}/preferences/{prefId}` belong strictly to `userId` (`userId == request.auth.uid` and `data.userId == request.auth.uid`) and hold a bounded array (`<= 30`) of selected destination IDs.
3. **Private Trip Ownership & State Integrity**: Documents under `/users/{userId}/trips/{tripId}` belong strictly to `userId` (`data.userId == request.auth.uid`), require valid IDs (`^[a-zA-Z0-9_\-]+$`), enforce server timestamps (`createdAt == request.time`, `updatedAt == request.time`), enforce immutable `id`, `userId`, and `createdAt` on updates, and lock updates once `status == 'completed'`.
4. **No Shadow Fields**: Every create enforces `keys().hasAll(...) && keys().hasOnly(...)` and every update enforces `affectedKeys().hasOnly(...)` paired with the entity's `isValid[Entity]()` validator.

## Dirty Dozen Adversarial Payloads
1. **Cross-User Profile Read**: User B attempts `get(/users/userA)` -> `PERMISSION_DENIED`.
2. **Profile Listing Scrape**: Any user attempts `list(/users)` -> `PERMISSION_DENIED`.
3. **Identity Spoofing on Trip Create**: User B attempts `create(/users/userB/trips/t1)` with `userId: "userA"` -> `PERMISSION_DENIED`.
4. **Shadow Field Injection on Profile**: User A creates `/users/userA` with extra field `isAdmin: true` -> `PERMISSION_DENIED`.
5. **Timestamp Forgery on Trip Create**: User A creates trip with backdated `createdAt` (`!= request.time`) -> `PERMISSION_DENIED`.
6. **Immutable Owner Tampering on Update**: User A updates `/users/userA/trips/t1` changing `userId` or `createdAt` -> `PERMISSION_DENIED`.
7. **ID Poisoning**: User A writes `/users/userA/trips/bad$id..with..slashes` -> `PERMISSION_DENIED` via `isValidId`.
8. **Unbounded Array Exhaustion**: User A writes `selectedDestinationIds` with 31+ entries -> `PERMISSION_DENIED` via `.size() <= 30`.
9. **Value Poisoning on Update**: User A updates trip `travellers` to `"five"` (string) or `-1` -> `PERMISSION_DENIED` via `isValidTripPlan`.
10. **Terminal State Bypass**: User A attempts to edit a trip whose existing `status == 'completed'` -> `PERMISSION_DENIED`.
11. **Oversized String DoS**: User A attempts to store a 10,000-char `aiNotes` (`> 4000`) -> `PERMISSION_DENIED`.
12. **Unauthenticated Write**: Anonymous/unauthenticated request to `/users/u1/trips/t1` -> `PERMISSION_DENIED`.
