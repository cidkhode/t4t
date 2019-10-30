import React from 'react';
import { bool, func } from 'prop-types';

/* Components */
import ModalSkeleton from '../../Modal/ModalSkeleton.js';

/* Styles */
import '../ModalSkeleton.less';
import './AddInterest.less';

const AddInterest = props => (
	<ModalSkeleton isActive={props.isActive}>
		<div id="add-interest-container" className="modal-content">
			<span onClick={ props.closeWindow } className="closeModal" />
		</div>
	</ModalSkeleton>
);

AddInterest.propTypes = {
	isActive: bool.isRequired,
	closeWindow: func.isRequired,
};

export default AddInterest;