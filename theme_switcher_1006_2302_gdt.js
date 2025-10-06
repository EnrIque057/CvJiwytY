// 代码生成时间: 2025-10-06 23:02:43
// Importing D3.js
const d3 = require('d3');

// Define available themes
const themes = {
  'light': 'light-theme',
  'dark': 'dark-theme',
  'default': 'default-theme'
};

// Function to apply theme
function applyTheme(themeName) {
  // Check if the theme exists in themes object
  if (!themes[themeName]) {
    console.error(`Theme '${themeName}' not found.`);
    return;
  }

  // Apply the theme to the body element
  d3.select('body').classed(themeName, true);
  d3.select('body').classed(Object.keys(themes).filter(key => key !== themeName).join(' '), false);
}

// Function to toggle theme
function toggleTheme() {
  let currentTheme = d3.select('body').attr('class');
  if (currentTheme) {
    // Find the next theme to apply
    let nextTheme = Object.keys(themes).find(key => themes[key] !== currentTheme);
    applyTheme(nextTheme || 'default');
  } else {
    // If no theme is applied, apply the default theme
    applyTheme('default');
  }
}

// Listen for theme toggle event
d3.select('body').on('click', toggleTheme);

// Initialize the theme
applyTheme('default');
