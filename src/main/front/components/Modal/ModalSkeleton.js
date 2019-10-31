import React from 'react';
import { element, bool, string } from 'prop-types';

/* Styles */
import './ModalSkeleton.less';

const ModalSkeleton = props => (
  <div className={ `modal-container ${props.extraClass} ${props.isActive ? "active" : ""}` }>
    <div className="inner">
      {props.children}
    </div>
  </div>
);

ModalSkeleton.propTypes = {
  isActive: bool.isRequired,
  children: element.isRequired,
  extraClass: string,
};

ModalSkeleton.defaultProps = {
  extraClass: '',
};

export default ModalSkeleton;