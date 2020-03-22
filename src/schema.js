const { gql } = require('apollo-server');

const typeDefs = gql`    

    type CourseDescription {
        full: [String]
        short: String
        advantages: [String]
    }

    type CourseDuration {
        inHours: Float
        inClasses: Float!
    }
    
    type CourseLinks {
        buy: String
        certificate: String
        roving: String
    }

    type Course {
        courseId: String
        name: String
        price: Int
        level: Int
        canBeRoving: Boolean
        photos: [String!]
        description: CourseDescription
        duration: CourseDuration
        links: CourseLinks
    }

    type CoursesCollection {
        cursor: Int
        hasMore: Boolean!
        courses: [Course]!
    }

    type Query {
        courses(
            """
            The number of results to show. Must be >= 1. Default = 20
            """
            pageSize: Int
            """
            If you add a cursor here, it will only return results _after_ this cursor
            """
            after: String
        ): CoursesCollection
        hello: String
    }

    schema {
        query: Query
    }
`;

module.exports = typeDefs;