  import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { provideHttpClient } from '@angular/common/http';
  import { HttpLink } from 'apollo-angular/http';
  import { InMemoryCache, ApolloLink } from '@apollo/client/core';
  import { provideApollo } from 'apollo-angular';
  import { appRoutes } from './app.routes';

  export const appConfig: ApplicationConfig = {
    providers: [
      provideHttpClient(),

      provideApollo(() => {
        const httpLink = inject(HttpLink).create({ uri: 'http://localhost:3001/api/graphql' });

        const authLink = new ApolloLink((operation, forward) => {
          const token = localStorage.getItem('access_token') || '';

          operation.setContext((context) => {
            const headers = (context.headers ?? {}) as Record<string, string>;

            if (headers['Authorization']) {
              return { headers };
            }

            return {
              headers: {
                ...headers,
                ...(token ? { Authorization: `Bearer ${token}` } : {})
              }
            };
          });

          return forward(operation);
        });

        return {
          link: ApolloLink.from([authLink, httpLink]),
          cache: new InMemoryCache()
        };
      }),

      provideBrowserGlobalErrorListeners(),
      provideRouter(appRoutes)
    ]
  };
