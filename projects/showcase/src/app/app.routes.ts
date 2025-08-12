import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'operators',
  },
  {
    path: 'operators',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'redirect-on-http-error',
      },
      {
        path: 'distinct-until-changed-with-memory',
        loadComponent: () =>
          import(
            './operators/distinct-until-changed-with-memory-showcase/distinct-until-changed-with-memory-operator-showcase.component'
          ).then((m) => m.DistinctUntilChangedWithMemoryOperatorShowcase),
      },
      {
        path: 'redirect-on-http-error',
        loadComponent: () =>
          import(
            './operators/redirect-on-http-error/redirect-on-http-error-operator-showcase'
          ).then((m) => m.RedirectOnHttpErrorOperatorShowcase),
      },
    ],
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import(
        './operators/redirect-on-http-error/redirect-on-http-error-operator-showcase'
      ).then((m) => m.Error404Page),
  },
];
