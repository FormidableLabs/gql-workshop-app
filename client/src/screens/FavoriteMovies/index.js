import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import numeral from "numeral";

import MovieCard from "../../components/MovieCard";
import { MOVIES_QUERY } from "../../screens/MoviesScreen";

const Favorites = ({ favorites, loading, loadMore }) => {
    if (loading) return null;
    console.log(favorites);

    return (
        <div className="moviesScreen">
            <div className="moviesResults">
                {favorites.map(movie => <MovieCard key={movie.id} {...movie} />)}
            </div>
        </div>
    );
};

// export const FAVES_QUERY = gql`
//     query Favorites {
//         favorites {
//             id
//             ...MovieCard
//         }
//     }
//     ${MovieCard.fragment}
// `;

const withData = graphql(MOVIES_QUERY, {
    props: ({ data: { favorites, loading } }) => ({
        loading,
        favorites,
    }),
});

export default withData(Favorites);