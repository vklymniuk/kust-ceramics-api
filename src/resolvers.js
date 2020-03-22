const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        hello: () => 'Hello roger!',
        courses: async (_, { pageSize = 20, after }, { dataSources }) => {
            const coursesAll = await dataSources.coursesAPI.getAllCourses();
            //launchAPI.getAllLaunches();
            // const allLaunches = await dataSources.launchAPI.getAllLaunches();
            // we want these in reverse chronological order
            coursesAll.reverse();

            const courses = paginateResults({
                after,
                pageSize,
                results: coursesAll,
            });

            const cursor = courses.length && courses[courses.length - 1].cursor ? courses[courses.length - 1].cursor : null;
            const hasMore = courses.length
                ? courses[courses.length - 1].cursor !==
                coursesAll[coursesAll.length - 1].cursor
                : false;

            return {
                cursor: cursor,
                hasMore: hasMore,
                courses: courses
            }
        },
    },
    // Mutation: {
    //
    // }
};