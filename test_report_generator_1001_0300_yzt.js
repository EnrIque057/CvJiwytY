// 代码生成时间: 2025-10-01 03:00:23
const d3 = require('d3');

/**
 * Function to initialize the test report generator
 * @param {string} data - JSON string containing test results
 * @param {string} selector - CSS selector for the report container
 */
function initTestReport(data, selector) {
  try {
    // Parse the JSON data
    const testResults = JSON.parse(data);

    // Select the container for the report
    const reportContainer = d3.select(selector);

    // Check if the data is valid
    if (!testResults || !testResults.tests || !Array.isArray(testResults.tests)) {
      console.error('Invalid test results data');
      return;
    }

    // Create the report
    createTestReport(testResults, reportContainer);
  } catch (error) {
    console.error('Error initializing test report generator:', error);
  }
}

/**
 * Function to create the test report
 * @param {object} testResults - Object containing test results
 * @param {d3.selection} reportContainer - D3 selection for the report container
 */
function createTestReport(testResults, reportContainer) {
  // Define the report structure
  const report = {
    title: 'Test Report',
    description: 'Summary of test results',
    results: testResults.tests.map(test => ({
      name: test.name,
      passed: test.passed,
      message: test.message
    }))
  };

  // Add title and description
  reportContainer.append('h1').text(report.title);
  reportContainer.append('p').text(report.description);

  // Create table for test results
  const table = reportContainer.append('table').attr('class', 'test-report-table');
  table.append('thead').append('tr')
    .selectAll('th')
    .data(['Test Name', 'Passed', 'Message'])
    .enter()
    .append('th')
    .text(d => d);

  // Add test results to the table
  const tbody = table.append('tbody');
  tbody.selectAll('tr')
    .data(report.results)
    .enter()
    .append('tr')
      .selectAll('td')
      .data(d => [d.name, d.passed ? 'Yes' : 'No', d.message])
      .enter()
      .append('td')
      .text(d => d);
}

// Example usage
const testData = '{"tests":[{"name":"Test 1","passed":true,"message":"Test passed"},{"name":"Test 2","passed":false,"message":"Test failed"}]}';
initTestReport(testData, '#report-container');