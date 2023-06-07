class LocalizationForm extends HTMLElement {
    constructor() {
      super();
      // ? selector dom
      this.elements = {
        input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
        button: this.querySelector('button'),
        panel: this.querySelector('.disclosure__list-wrapper'),
      };
      this.elements.button.addEventListener('click', event => this.openSelector());
      this.elements.button.addEventListener(
        'focusout',
        event => this.closeSelector(event),
      );
      this.addEventListener('keyup', event => this.onContainerKeyUp(event));
  
      this.querySelectorAll('a').forEach(
        (item) => item.addEventListener('click', event => this.onItemClick(event))
      );
    }
  
    // ? event focusout now closed panel
    hidePanel() {
      this.elements.button.setAttribute('aria-expanded', 'false');
      this.elements.panel.setAttribute('hidden', true);
    }
  
    // ? press key space close panel control and focus button current
    onContainerKeyUp(event) {
      if (event.code.toUpperCase() !== 'ESCAPE') return;
      this.hidePanel();
      this.elements.button.focus();
    }
  
    // ? selected item on panel and send form with selection
    onItemClick(event) {
      event.preventDefault();
      const form = this.querySelector('form');
      this.elements.input.value = event.currentTarget.dataset.value;
      if (form) form.submit();
    }
  
    // ? open select list country and language
    openSelector() {
      this.elements.button.focus();
      this.elements.panel.toggleAttribute('hidden');
      this.elements.button.setAttribute(
        'aria-expanded',
        (
          this.elements.button.getAttribute('aria-expanded') === 'false'
        ).toString(),
      );
    }
  
    // ? closed list if is open
    closeSelector(event) {
      const shouldClose =
        event.relatedTarget && event.relatedTarget.nodeName === 'BUTTON';
      if (event.relatedTarget === null || shouldClose) {
        this.hidePanel();
      }
    }
  }
  
  customElements.define('localization-form', LocalizationForm);