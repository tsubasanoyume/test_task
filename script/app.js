import dataArray from './data';
import DataModel from './model';
import TableView from './view/table-view';
import MapView from './view/map-view';
import ChartView from './view/chart-view';

const getChar = (event) => {
  if (event.which == null) {
    if (event.keyCode < 32) return null;
    return String.fromCharCode(event.keyCode);
  }

  if (event.which != 0 && event.charCode != 0) {
    if (event.which < 32) return null;
    return String.fromCharCode(event.which);
  }

  return null;
};

export default class Application {
  static init(data) {
    const model = new DataModel(data);
    const table = new TableView(model);
    const map = new MapView(model);
    const chart = new ChartView(model);

    table.init();
    map.init();
    chart.init();

    table.onClick = (trNode) => {
      const tdNode = trNode.find(`td`);
      const dataObj = {};

      if (trNode.hasClass(`main-table__row--checked`)) {
        tdNode.each((i, td) => {
          dataObj[$(td).attr(`data-id`)] = $(td).text();
        });
      }

      map.highLightMarker(dataObj);
      chart.highlightBar(dataObj);
    };

    const filterInput = $(`.main-filter__field`);

    filterInput.keypress((e) => {
      e = e || event;

      if (e.ctrlKey || e.altKey || e.metaKey) return;

      const chr = getChar(e);
      if (chr == null) return;

      if (chr < '0' || chr > '9') {
        return false;
      }
    });

    filterInput.keyup((event) => {
      const value = $(event.target).val();

      const filterByY = (obj) => {
        return obj.y >= +value;
      };

      const filteredArray = model.getData().filter(filterByY);

      table.onUpdate(filteredArray);
      map.setMarkers(filteredArray);
      chart.init(filteredArray);
    });

    const clearBtn = $(`.main-filter__clear`);

    clearBtn.click((e) => {
      e.preventDefault();
      filterInput.val(``);

      table.onUpdate(model.getData());
      map.setMarkers(model.getData());
      chart.init(model.getData());
    })
  }
}

Application.init(dataArray);