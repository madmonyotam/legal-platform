# Logging Guidelines

## 📥 Context comes from `requestContext` middleware

Automatically sets:
- `traceId` – from header or generated
- `userId` – if available
- `service` – per app (e.g. gateway, auth)

---

## ✅ Logging API

```ts
logger.info('message', meta?);
logger.warn('message', meta?);
logger.error('message', meta?);
logger.debug('message', meta?);
```

All messages include current context.

---

## ✅ Log only when necessary

| Situation                      | Recommendation                |
|-------------------------------|--------------------------------|
| Successful flow               | `logger.info` (if meaningful) |
| Expected validation error     | Don't log (AppError only)     |
| Unexpected error              | Handled by `errorHandler`     |
| External service failure      | Use `AppError(details)`       |

---

## ❌ Avoid logging manually inside `catch`

Let `errorHandler` do the job.

---

## 🔍 Example log with context:

```json
{
  "level": "error",
  "message": "Token validation failed",
  "traceId": "abc-123",
  "userId": "user-42",
  "service": "gateway",
  "path": "/api/cases"
}
```