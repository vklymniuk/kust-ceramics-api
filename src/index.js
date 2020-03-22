require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const env = require('../config').get('env');

// creates a sequelize connection once. NOT for every request
const CoursesAPI = require('./datasources/cources');
const store = {};

// set up any dataSources our resolvers need
const dataSources = () => ({
    coursesAPI: new CoursesAPI({store}),
});

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    introspection: true,
    playground: true,
    engine: {
        apiKey: env.engineApiKey
    },
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (env.NODE_ENV !== 'test') {
    server
        .listen({ port: env.PORT || 4000 })
        .then(({ url }) => console.log(`🚀 app running at ${url}`));
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
    dataSources,
    typeDefs,
    resolvers,
    ApolloServer,
    CoursesAPI,
    store,
    server
};