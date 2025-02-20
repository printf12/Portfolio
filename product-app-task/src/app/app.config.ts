import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { productReducer } from './store/reducers/product.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
  provideHttpClient(withFetch()),
  provideStore({ products: productReducer }),
  provideEffects([ProductEffects]),
  ],
};
