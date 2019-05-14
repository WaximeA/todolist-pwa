import { LitElement, html, css } from 'lit-element';

export default class TodoAdd extends LitElement {
  constructor() {
    super();
    this.placeholder = '';
    this.buttonValue = '';
  }

  static get properties() {
    return {
      placeholder: { type: String },
      buttonValue: { type: String }
    }
  }

  static get styles() {
    return css`
      .add-new {
            left: 0;
            right: 0;
            position: absolute;
            text-align: center;
          }
          .add-new input {
            width: 70%;
            background: #fff;
            color: #a3a3a3;
            font: inherit;
            box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
            border: 0;
            outline: 0;
            padding: 12px 36px;
            margin: 30px 0 10px 0;
          }
          .add-new button {
            width: 30%;
            background: #3BA1AE;
            color: #fff;
            box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
            border-radius: 2px;
            padding: 12px 36px;
            margin: 10px 0 30px 0;
          }
    `;
  }

  initTodoAdd(placeholder, buttonValue) {
    this.placeholder = placeholder;
    this.buttonValue = buttonValue;
  }

  render() {
    return html`
        <div class="add-new">
           <input type="text" placeholder="${this.placeholder}">
           <button>${this.buttonValue}</button>
        </div>   
    `
  }
}

customElements.define('todo-add', TodoAdd);