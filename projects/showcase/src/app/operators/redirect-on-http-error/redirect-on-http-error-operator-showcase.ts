import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { of, take, throwError } from 'rxjs';
import { redirectOnHttpError } from '@grandgular/rx';

@Component({
  selector: 'app-redirect-on-http-error-operator-showcase',
  imports: [CommonModule, RouterModule],
  template: `
    <div>
      <h1>HTTP Error Handling Demo</h1>

      <div>
        <button (click)="makeRequest(200)">Make Successful Request</button>
        <button (click)="makeRequest(404)">Trigger 404 Error</button>
      </div>
    </div>
  `,
})
export class RedirectOnHttpErrorOperatorShowcase {
  readonly #router = inject(Router);

  public makeRequest(status: number): void {
    this.mockApi(status)
      .pipe(
        redirectOnHttpError(this.#router, {
          redirectConfig: {
            404: '/not-found',
            // 500: '/server-error',
            // 401: '/login',
            default: '/not-found',
          },
          logError: (err) => console.error('HTTP Error:', err),
          skipLocationChange: true,
        }),
        take(1),
      )
      .subscribe();
  }

  private mockApi(status: number) {
    if (status === 200) return of({ data: 'Success!' });

    return throwError(
      () =>
        new HttpErrorResponse({
          status,
          statusText:
            ['Not Found', 'Unauthorized', 'Server Error'][
              Math.floor(status / 100) - 4
            ] || 'Unknown Error',
        }),
    );
  }
}

@Component({
  selector: 'app-error-404-page',
  imports: [CommonModule, RouterModule],
  template: `
    <div>
      <button [routerLink]="['/operators/redirect-on-http-error']">Back</button>
      <br />

      <div>
        <span>Current route: {{ router.url }}</span>
        <br />
        <span>Current page(component): 404</span>
      </div>
    </div>
  `,
})
export class Error404Page {
  protected readonly router = inject(Router);
}
