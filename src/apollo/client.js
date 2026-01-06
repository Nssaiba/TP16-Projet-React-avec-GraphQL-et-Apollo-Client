import { ApolloClient, InMemoryCache } from '@apollo/client';
import { mockLink } from './mockServer';

export const client = new ApolloClient({
    link: mockLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
        query: {
            fetchPolicy: 'network-only',
        },
    },
});
