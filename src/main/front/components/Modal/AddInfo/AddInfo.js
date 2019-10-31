import React from 'react';
import { bool, func, string } from 'prop-types';

/* Components */
import ModalSkeleton from '../ModalSkeleton.js';

/* Styles */
import '../ModalSkeleton.less';
import './AddInfo.less';

const AddInfo = props => (
	<ModalSkeleton isActive={props.isActive}>
		<div id="add-info-container" className="modal-content">
			<span onClick={ props.closeWindow } className="closeModal" />
			<h2> Add { props.type } </h2>
			<input type="text" placeholder={`Enter ${props.type} here`} />
			<input type="text" placeholder={`Enter ${props.type} here`} />
			<button onClick={props.addFunc} id={ props.type }>Add</button>
		</div>
	</ModalSkeleton>
);

AddInfo.propTypes = {
	type: string.isRequired,
	isActive: bool.isRequired,
	closeWindow: func.isRequired,
	addFunc: func.isRequired,
};

export default AddInfo;