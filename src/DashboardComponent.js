import React from 'react';
import PropTypes from 'prop-types';

function DashboardComponent({ title, children }) {
  return (
    <div className="dashboard-component card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

DashboardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DashboardComponent;
