const mime = require('mime');
const { DataSource } = require('apollo-datasource');
const firebaseConfig = require("../../config").get('firebase');
const firebase = require('firebase');

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

class CoursesAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    /**
     * This is a function that gets called by ApolloServer when being setup.
     * This function gets called with the datasource config including things
     * like caches and context. We'll assign this.context to the request context
     * here, so we can know about the user making requests
     */
    initialize(config) {
        this.context = config.context;
    }

    /**
     * @returns {Promise<[{duration: {inHours: number, inClasses: number}, level: number, price: number, name: string, description: {short: null, full: string}, canBeRoving: boolean, photos: [string, string]}, {duration: {inHours: number, inClasses: number}, level: number, price: number, name: string, description: {short: string, full: string}, canBeRoving: boolean, photos: [string, string]}]>}
     */
    async getAllCourses() {
        const courses = [];

        try {
            let res = await db.collection('courses').get();
            res.forEach((doc) => courses.push(doc.data()));
        } catch(error) {
            console.error(error.message);
        }

        return courses;
    }
}

module.exports = CoursesAPI;