import { ApplicationConfig, inject, Injector } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink, Observable } from '@apollo/client/core';
import { appRoutes } from './app.routes';
import { AuthService } from './services/core/auth/auth.service';

export const authLink = new ApolloLink((operation, forward) => {
  const context = operation.getContext();
  if (context['useRefreshToken']) return forward(operation);
  const token = localStorage.getItem('access_token');
  if (token) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    }));
  }
  return forward(operation);
});

export const createErrorLink = (injector: Injector) => {
  return new ApolloLink((operation, forward) => {
    return new Observable(observer => {
      let subscription: any;

      const handleRequest = () => {
        subscription = forward(operation).subscribe({
          next: result => {
            // Явно указываем тип (e: any) или (e: GraphQLError)
            const hasAuthError = result.errors?.some((e: any) =>
              e.extensions?.['code'] === 'UNAUTHENTICATED'
            );

            if (hasAuthError && !operation.getContext()['useRefreshToken']) {
              tryRefresh();
            } else {
              observer.next(result);
            }
          },
          error: err => {
            const isUnauthenticated = err?.graphQLErrors?.some((e: any) =>
              e.extensions?.code === 'UNAUTHENTICATED'
            );

            if (isUnauthenticated && !operation.getContext()['useRefreshToken']) {
              tryRefresh();
            } else {
              observer.error(err);
            }
          },
          complete: () => observer.complete()
        });
      };

      const tryRefresh = () => {
        const authService = injector.get(AuthService);
        authService.updateToken().subscribe({
          next: () => handleRequest(),
          error: (refreshErr) => {
            authService.logout();
            observer.error(refreshErr);
          }
        });
      };

      handleRequest();
      return () => { if (subscription) subscription.unsubscribe(); };
    });
  });
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink).create({ uri: 'http://localhost:3001/api/graphql' });
      const injector = inject(Injector);
      return {
        link: ApolloLink.from([createErrorLink(injector), authLink, httpLink]),
        cache: new InMemoryCache()
      };
    }),
    provideRouter(appRoutes)
  ]
};
