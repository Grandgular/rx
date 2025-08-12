import { Router } from '@angular/router';
import { catchError, OperatorFunction, throwError } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

export type ErrorRoutesTypes = Partial<Record<HttpStatusCode, string>> &
  Record<'default', string>;

/**
 * RxJS operator that handles HTTP errors by redirecting to specified routes
 * based on error status codes. Provides flexible configuration for error routing
 * while maintaining the original error for downstream processing.
 *
 * @param router - Angular Router service instance
 * @param options - Configuration for error handling:
 *   - redirectConfig: Map of status codes to routes or a single fallback route
 *   - skipLocationChange: Whether to update browser history (default: false)
 *   - logError: Optional error logging callback
 *
 * @example
 * // With status-specific routes
 * httpClient.get('/api').pipe(
 *   redirectOnHttpError(router, {
 *     redirectConfig: {
 *       [HttpStatusCode.NotFound]: '/not-found',
 *       default: '/error'
 *     }
 *   })
 * )
 *
 * @example
 * // Single fallback route
 * httpClient.get('/api').pipe(
 *   redirectOnHttpError(router, {
 *     redirectConfig: '/error'
 *   })
 * )
 */
export function redirectOnHttpError<T>(
  router: Router,
  options: {
    redirectConfig: ErrorRoutesTypes | string;
    skipLocationChange?: boolean;
    logError?: (error: unknown) => void;
  },
): OperatorFunction<T, T> {
  if (!router || !options) throw new Error('Router and options are required.');

  return catchError((error: HttpErrorResponse) => {
    options.logError?.(error);

    const redirectPath =
      typeof options.redirectConfig === 'string'
        ? options.redirectConfig
        : (options.redirectConfig[error.status as HttpStatusCode] ??
          options.redirectConfig.default);

    if (redirectPath) {
      void router.navigate([redirectPath], {
        skipLocationChange: options.skipLocationChange,
      });
    }

    return throwError(() => error);
  });
}
