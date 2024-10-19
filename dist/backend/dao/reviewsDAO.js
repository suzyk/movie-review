import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews){ // means we already have database connection
            return
        }
        try {
            reviews = await conn.db("reviews").collection("reviews");
        }catch(e){
            console.error(`Unable to establish collection handles in userDAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review){
        try {
            const reviewDoc = { // database entry key-value
                movieId: movieId,
                user: user,
                review: review
            }
            return await reviews.insertOne(reviewDoc); //insertOne is mongodb command
        }catch(e){
            console.error(`Unable to post review: ${e}`);
            return {error: e}
        }
    }

    static async getReview(reviewId) {
        try {
          return await reviews.findOne({ _id:  ObjectId.createFromHexString(reviewId) })
        } catch (e) {
          console.error(`Unable to get review: ${e}`)
          return { error: e }
        }
      }

    static async updateReview(reviewId, user, review){
        try{
            const updateResponse = await reviews.updateOne(
                {_id: ObjectId.createFromHexString(reviewId)},
                {$set: {user: user, review: review}}
            )
            return updateResponse
        }catch(e){
            console.error(`Unable to update review: ${e}`);
            return {error: e}
        }
    }

    static async deleteReview(reviewId){
        try{
            const deleteResponse = await reviews.deleteOne(
                {_id: ObjectId.createFromHexString(reviewId)}
            )
            return deleteResponse
        }catch(e){
            console.error(`Unable to delete review: ${e}`);
            return {error: e}
        }
    }

    static async getReviewsByMovieId(movieId){
        try {              // we are converting string to integer and passing it to mongodb
            const cursor = await reviews.find({movieId: parseInt(movieId)}); 
            return cursor.toArray();
        }catch(e){
            console.error(`Unable to get review: ${e}`);
            return {error: e}
        }
    }
}