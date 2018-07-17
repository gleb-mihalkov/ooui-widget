/**
 * Базовый класс виджета.
 */
export default class Widget {

  /**
   * Создает экземпляр виджета для указанного элемента.
   * @param {HTMLElement} element Элемент.
   */
  constructor(element) {

    /**
     * Элемент, которым управляет виджет.
     * @type {HTMLElement}
     */
    this.element = element;
  }

  /**
   * Вызывает повторную инициализацию виджета. Обычно вызвается при изменении
   * DOM модели.
   * @return {void}
   */
  refresh() {}

  /**
   * Вынуждает виджет открепить все обработчики событий и очистить
   * занятую память. Обычно вызывается перед удалением экземпляра.
   * @return {void}
   */
  destroy() {}



  /**
   * Возвращает название виджета.
   * @return {String} Название виджета.
   */
  static _getWidgetName() {
    if (this._widgetName) {
      return this._widgetName;
    }

    let code = Function.prototype.toString.call(this);
    let match = code.match(/^function\s+([a-zA-Z0-9_]+)/);
    let name = match[1];

    this._widgetName = name;
    return name;
  }

  /**
   * Создает экземпляр виджета для указанного элемента.
   * @param  {HTMLElement} element Элемент.
   * @return {Widget}              Экземпляр виджета.
   */
  static createInstance(element) {
    return new this(element);
  }

  /**
   * Возвращает все элементы, лежащие внутри указанного, к которым может быть
   * привязан экземпляр виджета данного класса.
   * @param  {HTMLElement} rootElement Элемент, внутри которого производится
   *                                   поиск.
   * @return {Array}                   Массив элементов.
   */
  static findAll(rootElement) {
    throw new Error(`Method 'findAll' is not implemented`);
  }



  /**
   * Возвращает уникальную временную метку для названий свойств, содержащих
   * экземпляры виджета.
   * @return {String} Временная метка.
   */
  static getInstanceKeyTimestamp() {
    return this._instanceKeyTimestamp
      || (this._instanceKeyTimestamp = Date.now() + '');
  }

  /**
   * Возвращает название свойства элемента, в котором должен храниться
   * экземпляр виджета данного класса.
   * @return {String} Название свойства.
   */
  static getInstanceKey() {
    let timestamp = this.getInstanceKeyTimestamp();
    let name = this._getWidgetName();
    let key = `_${name}${timestamp}`;

    return key;
  }

  /**
   * Возвращает экземпляр виджета, созданный для указанного элемента.
   * @param  {HTMLElement} element Элемент.
   * @return {Widget}              Экземпляр виджета.
   */
  static getInstance(element) {
    let key = this.getInstanceKey();
    return element[key] || null;
  }

  /**
   * Задает указанному элементу экземпляр виджета.
   * @param {HTMLElement} element  Элемент.
   * @param {Widget}      instance Экземпляр виджета.
   */
  static setInstance(element, instance) {
    let key = this.getInstanceKey();
    element[key] = instance;
  }

  /**
   * Удаляет экземпляр виджета из указанного элемента.
   * @param  {HTMLElement} element Элемент.
   * @return {void}
   */
  static deleteInstance(element) {
    let key = this.getInstanceKey();
    delete(element[key]);
  }



  /**
   * Инициализирует все экземпляры виджета данного класса, привязанные к
   * элементам внутри указанного.
   * @param  {HTMLElement} rootElement Элемент, внутри которого происходит
   *                                   поиск.
   * @return {void}
   */
  static initAll(rootElement) {
    let elements = this.findAll(rootElement);

    for (let element of elements) {
      let instance = this.getInstance(element);

      if (instance) {
        instance.refresh();
        continue;
      }

      instance = this.createInstance(element);
      this.setInstance(element, instance);
    }
  }

  /**
   * Удаляет все экземпляры виджета данного класса, привязанные к элементам
   * внутри указанного.
   * @param  {HTMLElement} rootElement Элемент, внутри которого происходит
   *                                   поиск.
   * @return {void}
   */
  static deleteAll(rootElement) {
    let elements = this.findAll(rootElement);

    for (let element of elements) {
      let instance = this.getInstance(element);

      if (instance == null) {
        continue;
      }

      instance.destroy();
      this.deleteInstance(element);
    }
  }
}
