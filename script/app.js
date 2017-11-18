import dataArray from './data';
import DataModel from './model';
import TableView from './view/table-view';
import MapView from './view/map-view';
import ChartView from './view/chart-view';

export default class Application {
  static init(data) {
    const model = new DataModel(data);
    const table = new TableView(model);
    const map = new MapView(model);
    const chart = new ChartView(model);

    table.init();
    map.init();
    chart.init();
  }
}

Application.init(dataArray);