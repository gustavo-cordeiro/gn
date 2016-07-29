'use strict';
import $ from 'jquery';
require('babel-polyfill');

function _getRequiredInputName($elements) {
  const allNames = $elements.map( (index,el) => el.getAttribute('name'));

  return [... new Set(allNames)];
}

function _validate($element, names) {
  const values = names.map(name => {
    const $el = $element.find(`[name='${name}']`);
    let val = undefined;

    if($el.get(1)) {
      val = $el.filter(':checked').val() || '';
    }
    else {
      val = $el.val();
    }

    return val;
  });

  return values.find(val => val === '') === undefined;
}

function _setCurrentBreadcrumb($elemnt, index) {
  const $current = $($elemnt.find('.breadcrumb__item').get(index));

  $elemnt.find('.is-active').removeClass('is-active');

  $current.addClass('is-active');

  return $current.addClass('is-active');
}

class NinjaForm {
  constructor($form) {
    this.$form = $form;
    this.currentStep = undefined;
    this.$user = $form.find('#user');
    this.$request = $form.find('#request');
    this.$breadcrumb = $form.find('.breadcrumb');

    this.requiredUserInputsNames = _getRequiredInputName(this.$user.find('[data-required]'));
    this.requiredRequestInputsNames = _getRequiredInputName(this.$request.find('[data-required]'));

    this.init();
  }

  init() {
    this.setStep(0);

    this.$request
      .find('.submit')
      .on('click', event => this.submitRequest());

    this.$user
      .find('.submit')
      .on('click', event => {
        event.preventDefault();
        this.submitUser();

        return false;
      });
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
    this.currentStep = $currentBreadcrumb.data('refer');

    if(this.currentStep === '#request') {
      this.$user.addClass('is-hide');
      this.$request.removeClass('is-hide');
    }
    else {
      this.$request.addClass('is-hide');
      this.$user.removeClass('is-hide');
    }
  }

  validateRequiredRequestInputs() {
    return _validate(this.$request, this.requiredRequestInputsNames);
  }

  validateUserRequestInputs() {
    return _validate(this.$user, this.requiredUserInputsNames);
  }

}

$(() => {
  new NinjaForm($('.form'));
});


