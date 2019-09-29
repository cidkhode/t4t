import React from 'react';
import './ModalSkeleton.less';

const Modal = props => (
  <div className={`modal-container ${props.isActive ? "active" : ""}`}>
	<div className={`inner`}>
		{props.children}
	</div>
  </div>
);

export default Modal;