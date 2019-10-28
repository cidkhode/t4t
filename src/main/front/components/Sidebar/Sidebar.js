import React from 'react';
import { array, bool, func, string } from 'prop-types';
import { NavLink } from 'react-router-dom';

/* Styles */
import './Sidebar.less';

export const Sidebar = props => (
  <div className={ `t4t-sidebar ${props.isOpen ? 'is-open' : 'is-closed'}` }>
    <div className="side-bar-option side-bar-expand" onClick={ props.onOpen }>
      { props.isOpen && <p className="side-bar-option-text">{ props.name }</p> }<span className={ `side-bar-arrow ${props.isOpen ? 'collapse' : 'expand'}-arrow` } />
    </div>
    <div onClick={ props.isOpen ? () => props.onTopicSelection('myDashboard') : null } className={ `side-bar-option ${props.selectedOption === 'myDashboard' ? 'is-selected' : ''}` }>
      { props.isOpen && <NavLink exact to="/"><p className="side-bar-option-text">Home</p></NavLink> }
      <span className="side-bar-option-type" />
    </div>
    <div onClick={ props.isOpen ? () => props.onTopicSelection('myDashboard') : null } className={ `side-bar-option ${props.selectedOption === 'myDashboard' ? 'is-selected' : ''}` }>
      { props.isOpen && <NavLink exact to="/dashboard"><p className="side-bar-option-text">Dashboard</p></NavLink> }
      <span className="side-bar-option-type" />
    </div>
    <div onClick={ props.isOpen ? () => props.onTopicSelection('myAccount') : null } className={ `side-bar-option ${props.selectedOption === 'myAccount' ? 'is-selected' : ''}` }>
      { props.isOpen && <NavLink exact to="/dashboard/account"><p className="side-bar-option-text">Account</p></NavLink> }
      <span className="side-bar-option-type" />
    </div>
    <div className="side-bar-option topics-sub-menu">
      { props.isOpen && <p className="side-bar-option-text">Topics</p> }<hr />
    </div>
    {
      props.topics.map((topic, key) => (
        <div onClick={ props.isOpen ? () => props.onTopicSelection(topic.key) : null } className={ `side-bar-option ${props.selectedOption === topic.key ? 'is-selected' : ''}` } key={ key }>
          { props.isOpen && <p className="side-bar-option-text">{topic.title}</p> }<span className="side-bar-option-type" />
        </div>
      ))
    }
    <div onClick={ props.isOpen ? props.onSignOut : null } className="side-bar-option">
      { props.isOpen && <p className="side-bar-option-text">Sign Out</p> }<span className="side-bar-three-dots">...</span>
    </div>
  </div>
);

Sidebar.propTypes = {
  isOpen: bool,
  onOpen: func.isRequired,
  name: string.isRequired,
  topics: array.isRequired,
  onTopicSelection: func.isRequired,
  onSignOut: func.isRequired,
  selectedOption: string,
};

Sidebar.defaultProps = {
  isOpen: false,
  selectedOption: ''
};

export default Sidebar;