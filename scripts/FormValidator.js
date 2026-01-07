export default class FormValidator {
  constructor(formElement) {
    this._formElement = formElement;
  }

  showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-input-error`
    );

    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
  }

  hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-input-error`
    );

    inputElement.classList.remove("form__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("form__input-error_active");
  }

  hasInvalidInput(inputs) {
    return Array.from(inputs).some((input) => !input.validity.valid);
  }
}
