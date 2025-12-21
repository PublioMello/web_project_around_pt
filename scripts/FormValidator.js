export function showInputError(inputElement, errorMessage, formElected) {
  const errorElement = formElected.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

export function hideInputError(inputElement, formElected) {
  const errorElement = formElected.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove("form__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
}

export function hasInvalidInput(inputs) {
  return Array.from(inputs).some((input) => !input.validity.valid);
}
