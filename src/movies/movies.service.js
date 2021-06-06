const knex = require('../db/connection')

function read(movieId) {
    return knex('movies')
        .select('*')
        .where({ movie_id: movieId })
        .first()
}
/*
function readIsShowing(movieId) {
	return knex('movies as m')
		.join('movies_theaters as mt', 'mt.movie_id', 'm.movie_id')
		.select('m.title')
		.where({ 'm.movie_id': movieId, 'mt.is_showing': true })
		.first()
}
*/

function list() {
  return knex("movies").select("*");
}

function listTheaters() {
    return knex('movies as m')
		.join('movies_theaters as mt', 'mt.movie_id', 'm.movie_id')
		.join('theaters as t', 't.theater_id', 'mt.theater_id')
        .select('t.name')
		.distinct('t.name')
}

function listShowing() {
	return knex('movies as m')
		.join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
		.select('m.*')
		.distinct('m.movie_id', 'mt.movie_id', 'm.title')
		.where({ 'mt.is_showing': true})
		
}


function listReviews(movieId) {
    return knex("movies as m")
		.join("reviews as r", "r.movie_id", "m.movie_id")
		.join("critics as c", "c.critic_id", "r.critic_id")
        .select('r.review_id', 'm.movie_id', 'c.preferred_name', 'c.surname', 'c.organization_name')
		.distinct('r.movie_id')
		.where({ "m.movie_id": movieId })
}




module.exports = {
    read,
    list,
    listTheaters,
    listReviews,
	listShowing,
};