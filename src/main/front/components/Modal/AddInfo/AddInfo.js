import React from 'react';
import { bool, func, string } from 'prop-types';
import { SAMPLE_INTERESTS_TO_SELECT_FROM } from '../../../utils/constants';

/* Components */
import ModalSkeleton from '../ModalSkeleton.js';
import CreatableDropdown from '../../Dropdown/CreatableDropdown';

/* Styles */
import '../ModalSkeleton.less';
import './AddInfo.less';
import Button from "../../Button/Button";

const AddInfo = props => (
	<ModalSkeleton extraClass={ props.addInfoPopupExtraClass } isActive={props.isActive}>
		<div className="add-info-container modal-content">
			<span onClick={ props.closeWindow } className="closeModal" />
			<h2> Add { props.type } </h2>
			<CreatableDropdown
				isMulti={ props.isMulti }
				value={ props.selectedOptions }
				onChange={ props.selectOption }
				options={ SAMPLE_INTERESTS_TO_SELECT_FROM }
			/>
			<Button handleClick={ props.addFunc } text="Add to Profile" />
		</div>
	</ModalSkeleton>
);

AddInfo.propTypes = {
	type: string.isRequired,
	isActive: bool.isRequired,
	closeWindow: func.isRequired,
	addFunc: func.isRequired,
	isMulti: bool.isRequired,
	selectOption: func.isRequired,
	addInfoPopupExtraClass: string,
};

AddInfo.defaultProps = {
	addInfoPopupExtraClass: ''
};

export default AddInfo;