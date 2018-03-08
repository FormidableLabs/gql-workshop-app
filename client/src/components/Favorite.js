import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { MOVIES_QUERY } from "../screens/MoviesScreen";

const Favorite = ({ selected, addToFavorites = () => {}, removeFromFavorites = () => {} }) => {
    return (
        <i
            className={classnames("fa-star", {
                fas: selected,
                far: !selected,
            })}
            onClick={e => {
                e.preventDefault();
                selected ? removeFromFavorites() : addToFavorites();
            }}
        />
    );
};

Favorite.propTypes = {
    selected: PropTypes.bool,
    addToFavorites: PropTypes.func,
    selected: PropTypes.func,
};

/**
 * TODO
 *   - Create HOC mutation
 *   - Update query cache with writeQuery
 *   - Add writeFragment for global movie updates
 *   - Add an optimistic response
 *
 *  Then do the same for removing favorites!
 */

const withAddToFavorites = graphql(
    gql`
        mutation($movieId: ID!) {
            addToFavorites(input: { id: $movieId }) {
                id
                isFavorite
            }
        }
    `,
    {
        props: ({ mutate, ownProps: { movieId } }) => {
            return {
                addToFavorites: () =>
                    mutate({
                        variables: {
                            movieId,
                        },
                        optimisticResponse: {
                            __typename: "Mutation",
                            addToFavorites: {
                                __typename: "Movie",
                                id: movieId,
                                isFavorite: true,
                            },
                        },
                        update: (cache, { data: { addToFavorites: movie } }) => {
                            const data = cache.readQuery({
                                query: MOVIES_QUERY,
                            });

                            const hasMovie = data.favorites.some(({ id }) => id === movieId);

                            if (!hasMovie) {
                                data.favorites.push(movie);

                                cache.writeQuery({
                                    query: MOVIES_QUERY,
                                    data,
                                });
                            }
                        },
                    }),
            };
        },
    }
);

const withRemoveFromFavorites = graphql(
    gql`
        mutation($movieId: ID!) {
            removeFromFavorites(input: { id: $movieId }) {
                id
                isFavorite
            }
        }
    `,
    {
        props: ({ mutate, ownProps: { movieId } }) => {
            return {
                removeFromFavorites: () =>
                    mutate({
                        variables: {
                            movieId,
                        },
                        optimisticResponse: {
                            __typename: "Mutation",
                            removeFromFavorites: {
                                __typename: "Movie",
                                id: movieId,
                                isFavorite: false,
                            },
                        },
                        update: (cache, { data: { removeFromFavorites: movie } }) => {
                            const data = cache.readQuery({
                                query: MOVIES_QUERY,
                            });

                            const hasMovie = data.favorites.some(({ id }) => id === movieId);

                            if (hasMovie) {
                                data.favorites.filter(({ id }) => id !== movieId);

                                cache.writeQuery({
                                    query: MOVIES_QUERY,
                                    data,
                                });
                            }
                        },
                    }),
            };
        },
    }
);

export default compose(withAddToFavorites, withRemoveFromFavorites)(Favorite);
