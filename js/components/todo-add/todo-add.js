import { LitElement, html, css } from 'lit-element';

export default class TodoAdd extends LitElement {
  constructor() {
    super();
    this.label = '';
    this.placeholder = '';
    this.buttonValue = '';
  }

  static get properties() {
    return {
      label: { type: String },
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
        padding: 20px;
      }
      .add-new label {
        font-size: 12px;
        color: #3BA1AE;
      }
      .add-new input {
        width: 70%;
        background: #fff;
        color: #3BA1AE;
        font: inherit;
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
        border: 0;
        outline: 0;
        padding: 12px 36px;
        margin: 10px 0 10px 0;
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

  initTodoAdd(label, placeholder, buttonValue) {
    this.label = label;
    this.placeholder = placeholder;
    this.buttonValue = buttonValue;
  }

  render() {
    return html`
        <div class="add-new">
            <label for="new-todo">
            <h2>${this.label}</h2>
            <input type="text" placeholder="${this.placeholder}" id="new-todo" name="new-todo">
           </label>
           
           <button>${this.buttonValue}</button>
        </div>   
    `
  }
}

customElements.define('todo-add', TodoAdd);