import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        // component: ArtistDetailComponent,
        loadComponent: () =>
          import('./pages/artist-list/artist-list.component').then(
            (c) => c.ArtistListComponent
          ),
      },
      {
        path: 'artist/:id',
        // component: ArtistDetailComponent,
        loadComponent: () =>
          import('./pages/artist-detail/artist-detail.component').then(
            (c) => c.ArtistDetailComponent
          ),
      },
    ],
  },
];
