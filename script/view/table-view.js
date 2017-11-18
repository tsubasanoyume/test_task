export default class TableView {
  constructor(model) {
    this.model = model;
    this.data = this.model.getData();
  }
  // инициализация таблицы
  init() {
    const parentTable = $(`.main-table__data-table`);
    //перебираем массив данных, генерируем на их основе строки и вставляем с таблицу
    this.data.map((item) => {
      const trNode = this.render(item, $(`<tr class="main-table__row"></tr>`));
      // обработчик кликов по строкам
      trNode.click((tr) => {
        this.onClick(tr);
      });

      parentTable.append(trNode);
    })
  }
  //заполняем строку данными и возвращаем ее для вставки в таблицу
  render(objData, parentTR) {
    for(let key in objData) {
      const tdNode = $(`<td></td>`);

      tdNode.text(objData[key]);
      parentTR.append(tdNode);
    }
    return parentTR;
  }

  onClick(target) {
    console.log(target);
  }

}
