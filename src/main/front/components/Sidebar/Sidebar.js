import React from 'react';
import { bool, func, string } from 'prop-types';

import './Sidebar.less';

export const Sidebar = props => (
  <div className={ `t4t-sidebar ${props.isOpen ? 'is-open' : 'is-closed'}` }>
    <div className="side-bar-option side-bar-expand" onClick={ props.onOpen }>
      { props.isOpen && <p className="side-bar-name">{ props.name }</p> }<span className={ `side-bar-arrow ${props.isOpen ? 'collapse' : 'expand'}-arrow` } />
    </div>
    <div className="side-bar-option">
      <span className="side-bar-option-type" />
    </div>
    <div className="side-bar-option">
      <span className="side-bar-option-type" />
    </div>
    <div className="side-bar-option">
      <span className="side-bar-option-type" />
    </div>
    <div className="side-bar-option">
      <span className="side-bar-option-type" />
    </div>
    <div className="side-bar-option">
      <span className="side-bar-option-type" />
    </div>
    <div className="side-bar-option">
      <span className="side-bar-option-type" />
    </div>
    <div className="side-bar-option">
      <span className="side-bar-option-type" />
    </div>
    <div className="side-bar-option">
      <span className="side-bar-option-type" />
    </div>
    <div className="side-bar-option">
      <span className="side-bar-option-type" />
    </div>
    <div className="side-bar-option">
      <span className="side-bar-three-dots">...</span>
    </div>
  </div>
);

Sidebar.propTypes = {
  isOpen: bool,
  onOpen: func.isRequired,
  name: string.isRequired,
};

Sidebar.defaultProps = {
  isOpen: false
};
export default Sidebar;