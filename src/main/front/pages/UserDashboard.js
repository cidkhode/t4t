import React, { Component } from 'react';

import DashboardSidebar from '../components/Dashboard/Sidebar/DashboardSidebar.js';

class UserDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="Dashboard" className="dashboard">
          <DashboardSidebar />
      </div>
    )
  }
}

export default UserDashboard;