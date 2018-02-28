import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const Favorite = ({
  selected,
  addToFavorites = () => { },
  removeFromFavorites = () => { }
}) => {
  return <i className={classnames("fa-star", {
    fas: selected,
    far: !selected
  })} onClick={(e) => {
    e.preventDefault();
    selected ? removeFromFavorites() : addToFavorites();
  }} />
}

Favorite.propTypes = {
  selected: PropTypes.bool,
  addToFavorites: PropTypes.func,
  selected: PropTypes.func,
}

/**
 * TODO
 *   - Create HOC mutation
 *   - Update query cache with writeQuery
 *   - Add writeFragment for global movie updates
 *   - Add an optimistic response
 * 
 *  Then do the same for removing favorites!
 */

export default Favorite;