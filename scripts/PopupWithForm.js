import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popupElement.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__button");
  }

  _getInputValues() {
    // Criar objeto com os valores dos inputs
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();

      this.renderLoading(true);

      if (!this._form.checkValidity()) {
        this.close();
        return;
      }
      const inputValues = this._getInputValues();

      this._handleFormSubmit(inputValues);
    });
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Salvando...";
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }
  close() {
    super.close();

    this._form.reset();
  }
}
