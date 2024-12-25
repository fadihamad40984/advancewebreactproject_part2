import React from "react";

const Overview = () => {
  return (
    <div className="overview-pane">
      <h2>Overview</h2>
      <div id="map"></div>
      <div className="stats">
        <div id="totalVillages">Total Number of Villages: 0</div>
        <div id="totalUrbanAreas">Total Number of Urban Areas: 0</div>
        <div id="totalPopulationSize">Total Population Size: 0</div>
        <div id="averageLandArea">Average Land Area: 0.00 sq km</div>
      </div>
      <div className="charts">
        <div className="chart-container">
          <h3>Age Distribution</h3>
          <canvas id="ageChart"></canvas>
        </div>
        <div className="chart-container">
          <h3>Gender Ratios</h3>
          <canvas id="genderChart"></canvas>
        </div>
      </div>
      <div className="bar-chart">
        <canvas id="populationChart"></canvas>
      </div>
    </div>
  );
};

export default Overview;
