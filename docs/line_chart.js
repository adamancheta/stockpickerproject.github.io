// Line Chart Code
const margin = { top: 20, right: 30, bottom: 30, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select("#line-chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("line_chart_data.csv").then(data => {
  data.forEach(d => {
    d.Date = new Date(d.Date);
    d["Adj Close"] = +d["Adj Close"];
  });

  const companies = [...new Set(data.map(d => d.Company))];
  const selector = d3.select("#company-selector");
  companies.forEach(company => {
    selector.append("option").attr("value", company).text(company);
  });

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const xAxis = svg.append("g").attr("transform", `translate(0,${height})`);
  const yAxis = svg.append("g");

  const line = d3.line()
    .x(d => x(d.Date))
    .y(d => y(d["Adj Close"]));
  const path = svg.append("path").attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 1.5);

  function updateChart(company) {
    const filteredData = data.filter(d => d.Company === company);

    x.domain(d3.extent(filteredData, d => d.Date));
    y.domain([0, d3.max(filteredData, d => d["Adj Close"])]);

    xAxis.call(d3.axisBottom(x));
    yAxis.call(d3.axisLeft(y));

    path.datum(filteredData).attr("d", line);
  }

  updateChart(companies[0]);
  selector.on("change", function () {
    updateChart(this.value);
  });
});
