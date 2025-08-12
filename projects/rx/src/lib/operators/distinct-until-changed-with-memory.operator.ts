import { MonoTypeOperatorFunction, Observable } from 'rxjs';

interface DistinctUntilChangedWithMemoryConfig<T> {
  memorySize: number;
  comparator?: (prev: T[], current: T) => boolean;
}

/**
 * Creates an operator that filters consecutive duplicate values from an Observable,
 * with configurable memory of previous values.
 *
 * ### Features
 * - Configurable memory size (last N values)
 * - Custom comparison function
 * - Type-safe implementation
 *
 * @example
 * // Basic usage (remember last 3 values)
 * observable.pipe(distinctUntilChangedWithMemory(3))
 *
 * @example
 * // With custom comparator
 * observable.pipe(distinctUntilChangedWithMemory({
 *   memorySize: 5,
 *   comparator: (prev, curr) => prev.some(item => item.id === curr.id)
 * }))
 *
 * @template T Type of stream values
 */
export function distinctUntilChangedWithMemory<T>(
  config: DistinctUntilChangedWithMemoryConfig<T>,
): MonoTypeOperatorFunction<T>;

export function distinctUntilChangedWithMemory<T>(
  memorySize?: number,
): MonoTypeOperatorFunction<T>;

export function distinctUntilChangedWithMemory<T>(
  memorySizeOrConfig?: number | DistinctUntilChangedWithMemoryConfig<T>,
): MonoTypeOperatorFunction<T> {
  let memorySize: number;
  let comparator: ((prev: T[], current: T) => boolean) | undefined;

  if (typeof memorySizeOrConfig === 'object' && memorySizeOrConfig !== null) {
    memorySize = memorySizeOrConfig.memorySize;
    comparator = memorySizeOrConfig.comparator;
  } else {
    memorySize = memorySizeOrConfig ?? Infinity;
    comparator = undefined;
  }

  return (source: Observable<T>) => {
    return new Observable<T>((subscriber) => {
      let state: { value: T; history: T[] } = {
        value: undefined! as T,
        history: [],
      };

      return source.subscribe({
        next: (value) => {
          const isDuplicate = comparator
            ? comparator(state.history, value)
            : state.history.some((item) => item === value);

          if (!isDuplicate) {
            state = {
              value,
              history: [...state.history.slice(-(memorySize - 1)), value],
            };
            subscriber.next(value);
          }
        },
        error: (err) => subscriber.error(err),
        complete: () => subscriber.complete(),
      });
    });
  };
}
