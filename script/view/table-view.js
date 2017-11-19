export default class TableView {
  constructor(model) {
    this.model = model;
    this.data = this.model.getData();
  }
  // инициализация таблицы
  init() {
    const parentTable = $(`.main-table__data-table`);

    parentTable.find(`.main-table__row`).remove();
    //перебираем массив данных, генерируем на их основе строки и вставляем с таблицу
    this.data.map((item) => {
      const trNode = this.render(item, $(`<tr class="main-table__row"></tr>`));
      // обработчик кликов по строкам
      trNode.click((event) => {
        const tr = $(event.target.parentNode);

        const alreadyCheckedTR = $(`.main-table__row--checked`);
        const prev = alreadyCheckedTR.index();

        $(alreadyCheckedTR).removeClass(`main-table__row--checked`);

        if (tr.index() !== prev) {
          tr.addClass(`main-table__row--checked`);
        } else {
          tr.removeClass(`main-table__row--checked`);
        }

        this.onClick(tr);
      });

      parentTable.append(trNode);
    })
  }
  //заполняем строку данными и возвращаем ее для вставки в таблицу
  render(objData, parentTR) {
    for(let key in objData) {
      const tdNode = $(`<td></td>`);

      tdNode.attr(`data-id`, key);
      tdNode.text(objData[key]);
      parentTR.append(tdNode);
    }
    return parentTR;
  }

  onClick(tr) {
    return tr;
  }

  onUpdate(data) {
    this.data = data;
    this.init();
  }

}
