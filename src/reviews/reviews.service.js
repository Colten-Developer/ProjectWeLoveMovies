const knex = require('../db/connection')
const router = require('./reviews.router')

function update(updatedReview) {
  //your solution here
	return knex('reviews')
		.select('*')
		.where({ review_id: updatedReview.review_id })
		.update(updatedReview, '*')
}

function destroy(reviewId) {
	return knex('reviews')
		.where({ review_id: reviewId })
		.del()
}

function read(reviewId) {
    return knex('reviews')
        .select('*')
        .where({ review_id: reviewId })
        .first()
}

function readUpdate(reviewId){
	return knex('reviews as r')
		.join('critics as c', 'c.critic_id', 'r.critic_id')
		.select('r.*', 'c.*')
		.where({ 'r.review_id': reviewId})
}


module.exports = {
	update,
	delete: destroy,
	read,
	readUpdate,
};