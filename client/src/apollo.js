import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    request: operation => {
        /* context will be used by "Links" */
        operation.setContext(context => ({
            headers: {
                ...context.headers,
                authorization: localStorage.getItem("token"),
            },
        }));
    },
});

export default client;
