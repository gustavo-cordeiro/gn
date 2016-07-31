import $ from 'jquery';
import PubSub from './PubSub';

require('babel-polyfill');

function _getRequiredInputName($elements) {
  const allNames = $elements.map( (index,el) => el.getAttribute('name'));

  return [... new Set(allNames)];
}

function _setCurrentBreadcrumb($elemnt, index) {
  const $current = $($elemnt.find('.breadcrumb__item').get(index));

  $elemnt.find('.is-active').removeClass('is-active');

  $current.addClass('is-active');

  return $current.addClass('is-active');
}

export default class extends PubSub {
  constructor($form) {
    super();

    this.$form = $form;
    this.$user = $form.find('#user');
    this.$request = $form.find('#request');
    this.$breadcrumb = $form.find('.breadcrumb');

    this.requiredUserInputsNames = _getRequiredInputName(this.$user.find('[data-required]'));
    this.requiredRequestInputsNames = _getRequiredInputName(this.$request.find('[data-required]'));

    this.init();
  }

  init() {
    this.sub('submit-user', () => this.submitUser());
    this.sub('submit-request', () => this.submitRequest());
    this.sub('start-validation', () => this.clearError());

    this.sub('update-step', step => this.setStep(step));
    this.sub('set-error', error => this.renderError(error));
    this.sub('before-breadcrumb', step => this.renderStep(step));

    this.$request
      .find('.submit')
      .on('click', () => this.pub('submit-request'));

    this.$user
      .find('.submit')
      .on('click', event => {
        event.preventDefault();
        this.pub('submit-user');

        return false;
      });

    this.pub('update-step', 0);
  }

  submitRequest() {
    if(this.validateRequiredRequestInputs()) {
      this.setStep(1);
    }
  }

  submitUser() {
    if(this.validateUserRequestInputs()) {
      window.location = `${window.location.href}images/quem-e-esse-pokemon.jpg`;
    }
  }

  setStep(index) {
    const $currentBreadcrumb = _setCurrentBreadcrumb(this.$breadcrumb, index);
    const refer = $currentBreadcrumb.data('refer');

    this.pub('before-breadcrumb', refer);
  }

  renderStep(step) {
    if(step === '#request') {
      this.$user.addClass('is-hide');
      this.$request.removeClass('is-hide');
    }
    else {
      this.$request.addClass('is-hide');
      this.$user.removeClass('is-hide');
    }
  }

  clearError() {
    this.$form.find('.error').remove();
  }

  renderError({ $el, info }) {
    const $errorTag = $('<span>')
                        .addClass('error')
                        .text(info);

    const $closestLabel = $el
                            .closest('.input')
                            .find('.label');

    return $closestLabel.after($errorTag);
  }

  validateRequiredRequestInputs() {
    return this.validate(this.$request, this.requiredRequestInputsNames);
  }

  validateUserRequestInputs() {
    return this.validate(this.$user, this.requiredUserInputsNames);
  }

  validate($element, names) {
    this.pub('start-validation');

    const values = names.map(name => {
      const $el = $element.find(`[name='${name}']`);
      let val = undefined;

      if($el.get(1)) {
        val = $el.filter(':checked').val() || '';
        if(val === '') {
          this.pub('set-error', { $el, info:'Marque pelo menos uma opção' });
        }
      }
      else {
        val = $el.val();
        if(val === '') {
          this.pub('set-error', { $el, info: 'Este campo é requerido' });
        }
      }

      return val;
    });

    return values.find(val => val === '') === undefined;
  }
}
