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

## License

MIT © [Grandgular](https://github.com/grandgular)
