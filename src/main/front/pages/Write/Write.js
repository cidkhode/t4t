import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Components */
import T4TEditor from "../../components/Editor/T4TEditor";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Opsbar from "./Opsbar.js";

/* Styles */
import './Write.less';

class Write extends Component {
	render() {
		return(
			<>
				<Navbar isLoggedIn />
				<main id="content" className="new-article">
					<Opsbar
						title=""
					/>
					<T4TEditor
						update_url="/api/article/store-article"
					/>
				</main>
			</>
		)
	}
}

export default Write;