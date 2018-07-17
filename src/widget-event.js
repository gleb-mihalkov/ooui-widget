/**
 * Событие, генерируемое виджетом.
 */
export default class WidgetEvent {

  /**
   * Создает экземпляр класса.
   * @param {Widget} widget Экземпляр виджета.
   * @param {String} type   Тип события.
   * @param {Object} params Параметры события.
   */
  constructor(widget, type, params = {}) {

    /**
     * Тип события.
     * @type {String}
     */
    this._type = type;

    /**
     * Параметры события.
     * @type {Object}
     */
    this._params = params;

    /**
     * Экземпляр виджета, вызвавшего событие.
     * @type {Widget}
     */
    this.widget = widget;
  }

  /**
   * Создает экземпляр события.
   * @return {Event} Событие.
   */
  _createEvent() {
    let e = new Event(this._type, this._params);

    for (let key in this) {
      if (key[0] !== '_') {
        e[key] = this[key];
      }
    }

    return e;
  }

  /**
   * Запускает событие и возвращает результат его обработки.
   * @return {Boolean} True, если ни один из обработчиков не вызвал метод
   *                   preventDefault(), иначе false.
   */
  dispatch() {
    let e = this._createEvent();
    return this.widget.element.dispatchEvent(e);
  }
}
