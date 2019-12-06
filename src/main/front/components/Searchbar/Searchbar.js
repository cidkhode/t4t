import React from 'react';
import PropTypes from 'prop-types';
import './Searchbar.less';
import { NavLink } from 'react-router-dom';

export const Searchbar = props => (
  <div className={ `t4t-search-bar-container ${props.extraClass}` }>
    <NavLink to={`/search`} className="t4t-search-bar-button">
      { props.searchIconPath && <img alt="search-icon" src={ props.searchIconPath } onClick={props.onSearch}/> }
    </NavLink>
    <input
      className="t4t-search-bar"
      type="text"
      onChange={ props.onSearchInputChange}
      value={ props.searchInputValue }
      placeholder={ props.searchInputPlaceholder }
    />
  </div>
);

Searchbar.propTypes = {
  searchIconPath: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  searchInputValue: PropTypes.string.isRequired,
  onSearchInputChange: PropTypes.func.isRequired,
  searchInputPlaceholder: PropTypes.string,
  extraClass: PropTypes.string,
};

Searchbar.defaultProps = {
  searchIconPath: '',
  searchInputPlaceholder: 'Search Thought4Thought...',
  extraClass: '',
};

export default Searchbar;