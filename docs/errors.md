# Error Handling Guidelines

## ✅ Use `AppError` for known (operational) errors

```ts
throw new AppError('Invalid token', 401);
```

### Parameters:

- `message` – human-readable message
- `statusCode` – HTTP code (default: 500)
- `isOperational` – whether it's an expected error (default: true)
- `details` – optional metadata (e.g. validation errors, external response)

---

## ❌ Do NOT use `AppError` in config or bootstrap code

Instead, throw a standard `Error`:

```ts
if (!process.env.JWT_SECRET) {
  throw new Error('Missing required environment variable: JWT_SECRET');
}
```

---

## ✋ Never use `res.status(...).json(...)` in controllers

Use `throw new AppError(...)` or just let exceptions bubble up.

---

## ✅ Use `catchAsync` to wrap async route handlers

```ts
router.get('/me', catchAsync(me));
```

```ts
export const me = async (req, res) => {
  const user = await getUser();
  res.json(user);
};
```

---

## All errors are handled centrally in `errorHandler`

Includes:
- Logging with `traceId`, `userId`, `service`
- Standardized client response