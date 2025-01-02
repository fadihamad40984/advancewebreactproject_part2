import React, { useEffect, useRef } from "react";
import "../styles/overview.css";
import Dashboard from "../components/Dashboard";
import L from "leaflet";
import Chart from "chart.js/auto";
import villages from "/data/villages.json"; 

const Overview = () => {
  const mapRef = useRef(null);
  const ageChartRef = useRef(null);
  const genderChartRef = useRef(null);
  const populationChartRef = useRef(null);

  useEffect(() => {
    let map = null;

    if (mapRef.current && !map) {
      map = L.map(mapRef.current).setView([31.7683, 35.2137], 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      villages.forEach((village) => {
        L.marker([village.latitude, village.longitude])
          .addTo(map)
          .bindPopup(village.villageName);
      });
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [villages]);

  useEffect(() => {
    // Initialize and update charts
/*     const initializeCharts = () => {
      const totalVillages = villages.length;
      const totalUrbanAreas = villages.filter(
        (village) => village.landArea > 20
      ).length;

      const totalPopulation = villages.reduce((sum, village) => {
        const demographic = village.demographic;
        return sum + (demographic ? demographic.populationSize : 0);
      }, 0);

      const averageLandArea = (
        villages.reduce((sum, village) => sum + village.landArea, 0) /
        totalVillages
      ).toFixed(2);

      document.getElementById("totalVillages").textContent = `Total Number of Villages: ${totalVillages}`;
      document.getElementById("totalUrbanAreas").textContent = `Total Number of Urban Areas: ${totalUrbanAreas}`;
      document.getElementById("totalPopulationSize").textContent = `Total Population Size: ${totalPopulation.toLocaleString()}`;
      document.getElementById("averageLandArea").textContent = `Average Land Area: ${averageLandArea} sq km`;

      const populationData = villages.map((village) => {
        const demographic = village.demographic;
        return demographic ? demographic.populationSize : 0;
      });

      const villageNames = villages.map((village) => village.villageName);

      if (populationChartRef.current) {
        if (populationChartRef.current.chart) {
          populationChartRef.current.chart.destroy();
        }
        populationChartRef.current.chart = new Chart(populationChartRef.current, {
          type: "bar",
          data: {
            labels: villageNames,
            datasets: [
              {
                label: "Population Size",
                data: populationData,
                backgroundColor: "#36a2eb",
              },
            ],
          },
          options: {
            responsive: true,
          },
        });
      }

      const ageDistributionLabels = ["0-14", "15-64", "65+"];
      let aggregatedAgeDistribution = [0, 0, 0];

      villages.forEach((village) => {
        const demographic = village.demographic;
        if (demographic && demographic.ageDistribution) {
          const ageDistribution = demographic.ageDistribution
            .split(", ")
            .map((dist) => parseInt(dist.split(":")[1], 10));
          aggregatedAgeDistribution = aggregatedAgeDistribution.map(
            (sum, idx) => sum + ageDistribution[idx]
          );
        }
      });

      aggregatedAgeDistribution = aggregatedAgeDistribution.map(
        (value) => value / totalVillages
      );

      if (ageChartRef.current) {
        if (ageChartRef.current.chart) {
          ageChartRef.current.chart.destroy();
        }
        ageChartRef.current.chart = new Chart(ageChartRef.current, {
          type: "pie",
          data: {
            labels: ageDistributionLabels,
            datasets: [
              {
                data: aggregatedAgeDistribution,
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
              },
            ],
          },
        });
      }

      const genderLabels = ["Male", "Female"];
      let aggregatedGenderRatio = [0, 0];

      villages.forEach((village) => {
        const demographic = village.demographic;
        if (demographic && demographic.genderRatio) {
          const genderRatio = demographic.genderRatio
            .split(", ")
            .map((ratio) => parseInt(ratio.split(":")[1], 10));
          aggregatedGenderRatio = aggregatedGenderRatio.map(
            (sum, idx) => sum + genderRatio[idx]
          );
        }
      });

      aggregatedGenderRatio = aggregatedGenderRatio.map(
        (value) => value / totalVillages
      );

      if (genderChartRef.current) {
        if (genderChartRef.current.chart) {
          genderChartRef.current.chart.destroy();
        }
        genderChartRef.current.chart = new Chart(genderChartRef.current, {
          type: "pie",
          data: {
            labels: genderLabels,
            datasets: [
              {
                data: aggregatedGenderRatio,
                backgroundColor: ["#36a2eb", "#ff6384"],
              },
            ],
          },
        });
      }
    }; */

    const initializeCharts = () => {
      const totalVillages = villages.length;
      const totalUrbanAreas = villages.filter(
        (village) => village.landArea > 20
      ).length;
    
      const totalPopulation = villages.reduce((sum, village) => {
        const demographic = village.demographic;
        return sum + (demographic ? demographic.populationSize : 0);
      }, 0);
    
      const averageLandArea = (
        villages.reduce((sum, village) => sum + village.landArea, 0) /
        totalVillages
      ).toFixed(2);
    
      document.getElementById("totalVillages").textContent = `Total Number of Villages: ${totalVillages}`;
      document.getElementById("totalUrbanAreas").textContent = `Total Number of Urban Areas: ${totalUrbanAreas}`;
      document.getElementById("totalPopulationSize").textContent = `Total Population Size: ${totalPopulation.toLocaleString()}`;
      document.getElementById("averageLandArea").textContent = `Average Land Area: ${averageLandArea} sq km`;
    
      const populationData = villages.map((village) => {
        const demographic = village.demographic;
        return demographic ? demographic.populationSize : 0;
      });
    
      const villageNames = villages.map((village) => village.villageName);
    
      if (populationChartRef.current) {
        if (populationChartRef.current.chart) {
          populationChartRef.current.chart.destroy();
        }
        populationChartRef.current.chart = new Chart(populationChartRef.current, {
          type: "bar",
          data: {
            labels: villageNames,
            datasets: [
              {
                label: "Population Size",
                data: populationData,
                backgroundColor: "#36a2eb",
              },
            ],
          },
          options: {
            responsive: true,
          },
        });
      }
    
      // Age Distribution chart
      const ageDistributionLabels = ["0-14", "15-64", "65+"];
      let aggregatedAgeDistribution = [0, 0, 0];
    
      villages.forEach((village) => {
        const demographic = village.demographic;
        if (demographic && demographic.ageDistribution) {
          const ageDistribution = demographic.ageDistribution
            .split(", ")
            .map((dist) => parseInt(dist.split(":")[1], 10));
          aggregatedAgeDistribution = aggregatedAgeDistribution.map(
            (sum, idx) => sum + (ageDistribution[idx] || 0) // Default to 0 if missing
          );
        } else {
          // If no demographic or age distribution, assume 0 for all age groups
          aggregatedAgeDistribution = aggregatedAgeDistribution.map(() => 0);
        }
      });
    
      aggregatedAgeDistribution = aggregatedAgeDistribution.map(
        (value) => value / totalVillages
      );
    
      if (ageChartRef.current) {
        if (ageChartRef.current.chart) {
          ageChartRef.current.chart.destroy();
        }
        ageChartRef.current.chart = new Chart(ageChartRef.current, {
          type: "pie",
          data: {
            labels: ageDistributionLabels,
            datasets: [
              {
                data: aggregatedAgeDistribution,
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
              },
            ],
          },
        });
      }
    
      // Gender Distribution chart
      const genderLabels = ["Male", "Female"];
      let aggregatedGenderRatio = [0, 0];
    
      villages.forEach((village) => {
        const demographic = village.demographic;
        if (demographic && demographic.genderRatio) {
          const genderRatio = demographic.genderRatio
            .split(", ")
            .map((ratio) => parseInt(ratio.split(":")[1], 10));
          aggregatedGenderRatio = aggregatedGenderRatio.map(
            (sum, idx) => sum + (genderRatio[idx] || 0) // Default to 0 if missing
          );
        } else {
          // If no demographic or gender ratio, assume 0 for both male and female
          aggregatedGenderRatio = aggregatedGenderRatio.map(() => 0);
        }
      });
    
      aggregatedGenderRatio = aggregatedGenderRatio.map(
        (value) => value / totalVillages
      );
    
      if (genderChartRef.current) {
        if (genderChartRef.current.chart) {
          genderChartRef.current.chart.destroy();
        }
        genderChartRef.current.chart = new Chart(genderChartRef.current, {
          type: "pie",
          data: {
            labels: genderLabels,
            datasets: [
              {
                data: aggregatedGenderRatio,
                backgroundColor: ["#36a2eb", "#ff6384"],
              },
            ],
          },
        });
      }
    };
    

    initializeCharts();
  }, [villages]);

  return (
    <Dashboard>
      <div className="main-page">
        <div className="overview">
          <h2>Overview</h2>
          <div id="map" ref={mapRef}></div>
          <div className="stats">
            <div id="totalVillages">Total Number of Villages: 0</div>
            <div id="totalUrbanAreas">Total Number of Urban Areas: 0</div>
            <div id="totalPopulationSize">Total Population Size: 0</div>
            <div id="averageLandArea">Average Land Area: 0.00 sq km</div>
          </div>
        </div>
        <div className="charts">
          <div className="chart-container">
            <h3>Age Distribution</h3>
            <canvas ref={ageChartRef}></canvas>
          </div>
          <div className="chart-container">
            <h3>Gender Ratios</h3>
            <canvas ref={genderChartRef}></canvas>
          </div>
        </div>
        <div className="bar-chart">
          <canvas ref={populationChartRef}></canvas>
        </div>
      </div>
    </Dashboard>
  );
};

export default Overview;