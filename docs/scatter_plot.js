// Scatter Plot Code
d3.csv("scatter_plot_data.csv").then(data => {
  // Parse numeric values and convert Date column
  data.forEach(d => {
    d.high_mean = +d.high_mean;
    d.low_mean = +d.low_mean;
    d.volume_mean = +d.volume_mean;
    d.adj_close_mean = +d.adj_close_mean;
    d.Date = new Date(d.Date);
  });

  // Define axis label mappings
  const axisLabels = {
    high_mean: "Average High Price (USD)",
    low_mean: "Average Low Price (USD)",
    volume_mean: "Average Trading Volume",
    adj_close_mean: "Average Adjusted Close Price (USD)"
  };

  // Initial settings for axes and date range
  let xKey = "high_mean";
  let yKey = "low_mean";
  let selectedDate = d3.max(data, d => d.Date); // Start with the latest date

  // Add a single slider for filtering by date
  const slider = d3
    .select("#slider-container")
    .select("#time-slider")
    .attr("type", "range")
    .attr("min", d3.min(data, d => d.Date).getTime())
    .attr("max", d3.max(data, d => d.Date).getTime())
    .attr("step", 24 * 60 * 60 * 1000) // Step is one day
    .on("input", function () {
      selectedDate = new Date(+this.value); // Update selected date
      updatePlot(); // Trigger plot update
    });

  // Set initial slider value to the latest date
  slider.attr("value", selectedDate.getTime());

  // Function to update the scatter plot
  function updatePlot() {
    // Filter data based on the selected date
    const filteredData = data.filter(d => d.Date <= selectedDate);

    // Create trace for the scatter plot
    const trace = {
      x: filteredData.map(d => d[xKey]),
      y: filteredData.map(d => d[yKey]),
      text: filteredData.map(d => d.Company),
      mode: "markers",
      type: "scatter",
      marker: { size: 10 }
    };

    // Define layout for the scatter plot
    const layout = {
      title: `Scatter Plot: ${axisLabels[xKey]} vs ${axisLabels[yKey]} (Up to ${selectedDate.toDateString()})`,
      xaxis: { title: axisLabels[xKey] },
      yaxis: { title: axisLabels[yKey] }
    };

    // Render the scatter plot
    Plotly.newPlot("scatter-plot", [trace], layout);
  }

  // Initial plot with the full dataset
  updatePlot();

  // Event listener for X-axis dropdown
  document.getElementById("x-axis").addEventListener("change", function () {
    xKey = this.value; // Update xKey
    updatePlot(); // Trigger plot update
  });

  // Event listener for Y-axis dropdown
  document.getElementById("y-axis").addEventListener("change", function () {
    yKey = this.value; // Update yKey
    updatePlot(); // Trigger plot update
  });
});
