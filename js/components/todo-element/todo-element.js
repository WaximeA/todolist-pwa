import { LitElement, html, css } from 'lit-element';

export default class TodoElement extends LitElement {
  constructor() {
    super();
    this.label = '';
    this.id = '';
  }

  static get properties() {
    return {
      label: { type: String },
      id: { type: String }
    }
  }

  firstUpdated() {
    let checkbox = this.shadowRoot.querySelector('#'+this.id);
    checkbox.addEventListener('click', () => {
      let label = this.shadowRoot.querySelector('#label-'+this.id+'> span');
      let labelClassList = label.classList;
      if (labelClassList.contains('strikethrough')) {
        labelClassList.remove('strikethrough');
      } else {
        labelClassList.add('strikethrough');
      }
    });
  }

  static get styles() {
    return css`
      .listbox {
          margin-top: 20px;
      }
      .listbox.hide_archived .todo.archived {
          display: none;
      }
      .listbox .todo {
          padding: 15px 10px;
      }
      .listbox .todo:hover {
          background: #eaeaea;
      }
      .listbox .todo label {
          float: left;
          cursor: pointer;
          position: relative;
          width: 90%;
          -webkit-transition: opacity 0.3s;
          transition: opacity 0.3s;
      }
      .listbox .todo label:before {
          content: '';
          border: 2px solid #51E3A4;
          -webkit-transition: opacity 0.3s;
          transition: opacity 0.3s;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          top: 50%;
          right: 0;
          margin-top: -12px;
          position: absolute;
          cursor: pointer;
      }
      .listbox .todo input {
          -webkit-appearance: none;
          outline: none;
      }
      .listbox .todo input.status:checked + label:before {
          opacity: 0.8;
          background: #3BA1AE;
          -webkit-transition: all 750ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .listbox .todo.done label span {
          opacity: 0.5;
      }
      .strikethrough {
          display: inline-block;
          position: relative;
      }
      
      .strikethrough:after {
          content: '';
          position: absolute;
          display: block;
          width: 100%;
          height: 2px;
          margin-top: -0.6em;
          background: black;
          transform-origin: center left;
          animation: strikethrough 0.5s 0.5s cubic-bezier(0.55, 0, 0.1, 1) 1 forwards;
          transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
          transform: scaleX(0);
      }
      
      /* Keyframes for initial animation */
      @keyframes strikethrough {
          from {
              transform: scaleX(0);
          }
          to {
              transform: scaleX(1);
          }
      }

    `;
  }

  initTodoElement(label, id) {
    this.label = label;
    this.id = id;
  }

  render() {
    return html`
        <div class="todo-element listbox">
          <div id="todo-${this.id}" class="todo clearfix archived done">
              <input type="checkbox" class="status" id="${this.id}">
              <label for="${this.id}" id="label-${this.id}">
                <span>${this.label}</span>
              </label>
          </div>  
        </div>
    `
  }
}

customElements.define('todo-element', TodoElement);