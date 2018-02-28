# The Movie DB API

We’ll be consuming the following endpoints over the course of the day. It may appear to be a limited set but we can explore most of GraphQL’s feature using just this set.

The base URL is a fastly cache since we don’t want to hit the theMovieDB rate limits.

#### API key `fa60ffe249c919e7f6c528a4aba8674a`

### `GET /3/discover/movies?page={int}&genre_ids={id}`
*Returns a list of latest/popular movies*
- Genres are returned as ids only. We’ll need to resolve these again to get genre names

### `GET /3/movie/:id` 
*Returns the movie details*
- Genres are returned in full

### `GET 3/genre/movie/list` 
*Returns the list of movie genres*

### `3/movie/:movieId/credits`
*Returns the list of credits for a movie. We’ll want to use this for displaying cast members.*

## Images

### `https://image.tmdb.org/t/p/:size/:posterPath`