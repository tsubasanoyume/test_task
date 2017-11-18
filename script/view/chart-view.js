export default class ChartView {
  constructor(model) {
    this.model = model;
    this.data = this.model.getData();
  }
  // инициализация графика
  init() {
    const margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = $(`.main-chart`).width() - margin.left - margin.right,
      height = $(`.main-chart`).height() - margin.top - margin.bottom,
      x = d3.scaleBand().range([0, width]).padding(0.1),
      y = d3.scaleLinear().range([height, 0]);
    // вставка svg элемента
    const svg = d3.select(`.main-chart`).append(`svg`)
      .attr(`width`, width + margin.left + margin.right)
      .attr(`height`, height + margin.top + margin.bottom)
      .append(`g`)
      .attr(`transform`,
        `translate(` + margin.left + `,` + margin.top + `)`);

    // отрисовка осей x и у
    x.domain(this.data.map(function(d) { return d.x; }));
    y.domain([0, d3.max(this.data, function(d) { return d.y; })]);

    svg.append(`g`)
      .attr(`transform`, `translate(0,` + height + `)`)
      .call(d3.axisBottom(x));

    svg.append(`g`)
      .call(d3.axisLeft(y));

    // отрисовка баров
    svg.selectAll(`.bar`)
      .data(this.data)
      .enter().append(`rect`)
      .attr(`class`, `bar`)
      .attr(`x`, function(d) { return x(d.x); })
      .attr(`y`, function(d) { return y(d.y); })
      .attr(`width`, x.bandwidth())
      .attr(`height`, function(d) { return height - y(d.y); });
  }

}