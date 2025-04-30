import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import{ CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin'; // Import NGXS Storage Plugin
import { UserState } from './state/user.state'; // Your UserState to persist

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore([UserState]),

    importProvidersFrom(
      ReactiveFormsModule,
      NgxsReduxDevtoolsPluginModule.forRoot(),  // Optional: for Redux DevTools
    ),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    }
  ]
};
