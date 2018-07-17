import Widget from './widget.js';

/**
 * Элемент управления другим виджетом.
 */
export default class WidgetControl extends Widget {

  /**
   * Создает экземпляр класса.
   * @param {Widget}      widget         Виджет, которым управляет данный
   *                                     экземпляр.
   * @param {HTMLElement} [element=null] Элемент DOM, к которому привязан
   *                                     экземпляр.
   */
  constructor(widget, element = null) {
    super(element);

    /**
     * Виджет, которым управляет данный экземпляр.
     * @type {void}
     */
    this.widget = widget;
  }
}
