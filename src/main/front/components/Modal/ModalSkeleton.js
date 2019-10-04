import React from 'react';
import { element, bool } from 'prop-types';

/* Styles */
import './ModalSkeleton.less';

const ModalSkeleton = props => (
  <div className={`modal-container ${props.isActive ? "active" : ""}`}>
	<div className={`inner`}>
		{props.children}
	</div>
  </div>
);

ModalSkeleton.propTypes = {
    isActive: bool.isRequired,
    children: element,
};

ModalSkeleton.defaultProps = {
    isActive: false
};

export default ModalSkeleton;