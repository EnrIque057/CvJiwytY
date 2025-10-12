// 代码生成时间: 2025-10-12 17:44:38
// Import D3.js library
const d3 = require('d3');

// Global settings for the visualization
const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Function to create the SVG element
function createSvgElement(selector, width, height) {
  return d3.select(selector)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
}

// Function to load data and create the visualization
function loadDataAndCreateVisualization(selector, dataUrl) {
  d3.json(dataUrl)
    .then(data => {
      // Data processing
      // Assume data is an array of objects with 'date', 'qualityMetric', 'value'
      const processedData = data.map(d => ({
        date: new Date(d.date),
        qualityMetric: d.qualityMetric,
        value: d.value
      }));

      // Create SVG
      const svg = createSvgElement(selector, width, height);

      // Scales and axes
      const x = d3.scaleTime()
        .domain(d3.extent(processedData, d => d.date))
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(processedData, d => d.value)])
        .range([height, 0]);

      const xAxis = d3.axisBottom(x).ticks(5);
      const yAxis = d3.axisLeft(y);

      // Add X-axis
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

      // Add Y-axis
      svg.append('g')
        .call(yAxis);

      // Add line
      svg.append('path')
        .datum(processedData)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
          .x(d => x(d.date))
          .y(d => y(d.value)));

    }).catch(error => {
      console.error('Error loading data:', error);
    });
}

// Usage example, assuming the data is hosted at '/data/medical_quality_data.json'
loadDataAndCreateVisualization('#visualization', '/data/medical_quality_data.json');