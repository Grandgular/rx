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
        redirectTo: 'distinct-until-changed-with-memory',
      },
      {
        path: 'distinct-until-changed-with-memory',
        loadComponent: () =>
          import(
            './operators/distinct-until-changed-with-memory-showcase/distinct-until-changed-with-memory-operator-showcase.component'
          ).then((m) => m.DistinctUntilChangedWithMemoryOperatorShowcase),
      },
    ],
  },
];
