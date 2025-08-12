<img src="https://raw.githubusercontent.com/Grandgular/rx/refs/heads/main/projects/showcase/public/favicon.svg" width="220px" alt="Grandgular Logo">

# @grandgular/rx

[//]: # "[![npm version](https://img.shields.io/npm/v/@grandgular/link)](https://www.npmjs.com/package/@grandgular/link)"

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

@grandgular/rx extends RxJS with Angular-optimized operators, starting with distinctUntilChangedWithMemory - a configurable duplicate-filtering operator that maintains a sliding window of past values for advanced comparison logic.

[//]: # "## Features"
[//]: # "- 🧠 Stateful Operators – Like distinctUntilChangedWithMemory for smarter deduplication with configurable history"
[//]: # "- ⚡ Angular-First – Designed to work seamlessly with Angular's change detection and lifecycle"
[//]: # "- 🏎️ Performance-Optimized – Minimal overhead, maximum efficiency for high-frequency streams"
[//]: # "- 🛠️ Type-Safe – Full TypeScript support with strict interfaces"
[//]: # "- 🔄 Reactive Patterns – Simplify common RxJS challenges in Angular apps"
[//]: # "- 📦 Lightweight – Tiny bundle size with zero unnecessary dependencies"

---

## Info

🔹 **Angular Community**:  
Join our Telegram channel for Angular tips:  
[![Telegram](https://img.shields.io/badge/Grandgular_Channel-2CA5E0?style=flat&logo=telegram)](https://t.me/grandgular)

🔹 **Author**:  
Connect with me on LinkedIn:  
[![LinkedIn](https://img.shields.io/badge/Andrei_Shpileuski-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/andrei-shpileuski)

---

## Installation

```bash
npm install @grandgular/rx
```

---

## Operators

### distinctUntilChangedWithMemory()

An enhanced version of RxJS's distinctUntilChanged() that maintains a memory of previous values, allowing for more sophisticated duplicate detection.

#### Key Features:

- Configurable memory size - Remember last N values (default: Infinity)
- Custom comparison - Define your own duplicate detection logic
- Angular-optimized - Works seamlessly with Angular's change detection
- Type-safe - Full TypeScript support

#### Usage Examples:

##### 1. Infinite Memory

```typescript
const nums$ = of(1, 2, 3, 4, 1, 2, 5);

nums$
  .pipe(
    distinctUntilChangedWithMemory(), // Defaults to Infinity
  )
  .subscribe(console.log);

// Output: 1, 2, 3, 4, 5
```

##### 2. Basic Deduplication (Remember last 3 values)

```typescript
const source$ = of(1, 2, 3, 1, 2, 3, 4, 3, 5);

source$
  .pipe(
    distinctUntilChangedWithMemory(3), // Remember last 3 values
  )
  .subscribe(console.log);

// Output: 1, 2, 3, 4, 5
// Explanation: The second '1' and '2' are filtered because they're in the memory
```

##### 3. Case-Insensitive String Comparison

```typescript
const words$ = of("Apple", "Banana", "apple", "orange", "Apple");

words$
  .pipe(
    distinctUntilChangedWithMemory({
      memorySize: 4,
      comparator: (prev, curr) => prev.some((word) => word.toLowerCase() === curr.toLowerCase()),
    }),
  )
  .subscribe(console.log);

// Output: 'Apple', 'Banana', 'orange'
```

---

### redirectOnHttpError()

An RxJS operator that handles HTTP errors by redirecting to specified routes based on error status codes, while maintaining the original error for downstream processing.

#### Key Features:

- Status-based routing - Map specific HTTP status codes to different routes
- Flexible configuration - Accepts either a route map or a single fallback route
- History control - Option to skip location change in browser history
- Error logging - Optional callback for error logging
- Type-safe - Full TypeScript support with HttpStatusCode enum

#### Usage Examples:

##### 1. Basic Usage with Fallback Route

```typescript
import { redirectOnHttpError } from "./path/to/operator";

this.http
  .get("/api")
  .pipe(
    redirectOnHttpError(this.router, {
      redirectConfig: "/error", // Single fallback route
    }),
  )
  .subscribe({
    next: (data) => handleData(data),
    error: (err) => console.error("Original error preserved:", err),
  });
```

##### 2. Status-Specific Routing

```typescript
this.http
  .get("/api")
  .pipe(
    redirectOnHttpError(this.router, {
      redirectConfig: {
        [HttpStatusCode.NotFound]: "/not-found",
        [HttpStatusCode.Forbidden]: "/access-denied",
        default: "/server-error",
      },
      skipLocationChange: true, // Won't add to browser history
    }),
  )
  .subscribe();
```

##### 3. With Error Logging

```typescript
this.http
  .post("/api", payload)
  .pipe(
    redirectOnHttpError(this.router, {
      redirectConfig: {
        [HttpStatusCode.BadRequest]: "/invalid-request",
        default: "/error",
      },
      logError: (error) => this.errorService.log(error), // Custom logging
    }),
  )
  .subscribe();
```

### Configuration Options:

| Option               | Type                                  | Description                                                                                |
| -------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------ |
| `redirectConfig`     | `string OR ErrorRoutesTypes`          | Either a single fallback route or a map of status codes to routes (must include 'default') |
| `skipLocationChange` | `boolean` (optional)                  | If true, navigation won't push a new state into browser history (default: false)           |
| `logError`           | `(error: unknown) => void` (optional) | Callback for custom error logging                                                          |

---

## License

MIT © [Grandgular](https://github.com/grandgular)
