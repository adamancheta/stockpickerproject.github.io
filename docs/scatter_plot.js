// Scatter Plot Code
d3.csv("scatter_plot_data.csv").then(data => {
    data.forEach(d => {
      d.high_mean = +d.high_mean;
      d.low_mean = +d.low_mean;
      d.volume_mean = +d.volume_mean;
      d.adj_close_mean = +d.adj_close_mean;
    });
  
    let xKey = "high_mean";
    let yKey = "low_mean";
  
    function updatePlot() {
      const trace = {
        x: data.map(d => d[xKey]),
        y: data.map(d => d[yKey]),
        text: data.map(d => d.Company),
        mode: 'markers',
        type: 'scatter',
        marker: { size: 10 }
      };
  
      const layout = {
        title: `Scatter Plot: ${xKey} vs ${yKey}`,
        xaxis: { title: xKey },
        yaxis: { title: yKey }
      };
  
      Plotly.newPlot("scatter-plot", [trace], layout);
    }
  
    updatePlot();
  
    document.getElementById("x-axis").addEventListener("change", function () {
      xKey = this.value;
      updatePlot();
    });
    document.getElementById("y-axis").addEventListener("change", function () {
      yKey = this.value;
      updatePlot();
    });
  });
  