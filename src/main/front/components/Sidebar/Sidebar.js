import React from 'react';
import { array, bool, func, string } from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signUserOut } from '../../redux/actions/user.action';

/* Styles */
import './Sidebar.less';

export const Sidebar = props => (
  <div className={ `t4t-sidebar ${props.isOpen ? 'is-open' : 'is-closed'}` }>
    <div className="side-bar-option side-bar-expand" onClick={ props.onOpen }>
      { props.isOpen && <p className="side-bar-option-text">{ props.name }</p> }<span className={ `side-bar-arrow ${props.isOpen ? 'collapse' : 'expand'}-arrow` } />
    </div>
    <NavLink exact to="/" activeClassName="is-selected">
      <div className="side-bar-option" title="Home" >
        { props.isOpen && <p className="side-bar-option-text">Home</p> }
        <span className="side-bar-option-type" />
      </div>
    </NavLink>
    <NavLink exact to="/dashboard" activeClassName="is-selected">
      <div className="side-bar-option" title="Dashboard">
        { props.isOpen && <p className="side-bar-option-text">Dashboard</p> }
        <span className="side-bar-option-type" />
      </div>
    </NavLink>
    <NavLink exact to="/account" activeClassName="is-selected">
      <div className="side-bar-option" title="Account">
        { props.isOpen && <p className="side-bar-option-text">Account</p> }
        <span className="side-bar-option-type" />
      </div>
    </NavLink>
    <div className="side-bar-option topics-sub-menu">
      { props.isOpen && <p className="side-bar-option-text">Topics</p> }<hr />
    </div>
    {
      props.topics.map((topic, key) => (
        <div
          onClick={ props.isOpen ? () => props.onTopicSelection(topic.key) : null }
          className={ `side-bar-option ${props.selectedOption === topic.key ? 'is-selected' : ''}` } key={ key }
          title={ topic.title }
        >
          { props.isOpen && <p className="side-bar-option-text">{topic.title}</p> }
          <span className="side-bar-option-type" />
        </div>
      ))
    }
    <div onClick={ () => { props.signUserOut(); props.history.push("/"); } } className="side-bar-option">
      { props.isOpen && <p className="side-bar-option-text">Sign Out</p> }
      <span className="side-bar-three-dots">...</span>
    </div>
  </div>
);

Sidebar.propTypes = {
  isOpen: bool,
  onOpen: func.isRequired,
  name: string.isRequired,
  topics: array.isRequired,
  onTopicSelection: func.isRequired,
  selectedOption: string,
};

Sidebar.defaultProps = {
  isOpen: false,
  selectedOption: ''
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ signUserOut }, dispatch);

export default connect(null, mapDispatchToProps)(withRouter(Sidebar));