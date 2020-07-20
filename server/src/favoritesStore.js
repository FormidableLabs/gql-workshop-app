class FavoritesStore extends Set {}

/**
 * We're using a Set as a dumb data store. This will hold our favourites in
 * memory but obviously won't persist between server restarts.
 */
module.exports = new FavoritesStore();
