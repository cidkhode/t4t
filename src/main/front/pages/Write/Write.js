import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Components */
import T4TEditor from "../../components/Editor/T4TEditor";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Title from "./Title.js";

/* Styles */
import './Write.less';

export default class Write extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sideBarOpen: false,
			selectedSideBarOption: '',
		};
	}

	fetchTopics = () => [{ title: 'Sample topic 1', key: 'sampleTopic1' }, { title: 'Sample topic 2', key: 'sampleTopic2' }, { title: 'Sample topic 3 that\'s just way too long', key: 'sampleTopic3' }, { title: 'Sample topic 4', key: 'sampleTopic4' }]

	selectTopic = (selectedSideBarOption) => this.setState({ sideBarOpen: false, selectedSideBarOption }, () => console.log(`Topic selected: `, selectedSideBarOption));

	openSideBar = () => this.setState({ sideBarOpen: !this.state.sideBarOpen });

	render() {
		return(
			<>
				<Navbar isLoggedIn />
				<main id="content" className="new-article">
					<Title title="" />
					<T4TEditor />
				</main>
			</>
		)
	}
}