import "../inputMask/index.js";
import { showNotify, hideModal } from "../modal/modal.js";
import { SelectsCastToDefault } from "../select/select.js";

function sendForm(form) {
  if (form) {
    multipleFieldsHandler(form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const err = fieldValidation(form);

      if (err.length === 0) {
        const formData = new FormData(form);
        let xhr = new XMLHttpRequest();
        xhr.open(
          form.getAttribute("method") || "POST",
          form.getAttribute("action")
        );
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send(formData);
        xhr.onload = () => {
          xhr.status == 200 ? _onSuccess(xhr, form) : _onError(form);
        };
      }
    });
  }
}

function _onSuccess(xhr, form) {
  let response = JSON.parse(xhr.responseText);
  form.reset();
  removeFilesText(form);
  SelectsCastToDefault(form);
  showNotify(response.title, response.text);
  hideModal(null, form.closest(".modal"));
}

function _onError(form) {
  form.reset();
  removeFilesText(form);
  SelectsCastToDefault(form);
  showNotify("Произошла ошибка", "Пожалуйста, повторите запрос позже");
  hideModal(null, form.closest(".modal"));
}

function multipleFieldsHandler(form) {
  const multipleFields = form.querySelectorAll(".form-field_multiple");
  multipleFields.forEach((field) => {
    if (field.type === "text") {
      field.addEventListener("input", () => {
        multipleFields.forEach((item) => {
          if (item.type === "radio") {
            item.checked = false;
          }
        });
      });
    } else if (field.type === "radio") {
      field.addEventListener("click", () => {
        multipleFields.forEach((item) => {
          if (item.type === "text") {
            item.value = "";
          }
        });
      });
    }
  });
}

function fieldValidation(form) {
  let err = [];
  _getFields(form).forEach((field) => {
    if (field.className.match("form-field_required")) {
      let classNames = field.className.split(" ");
      let validateValue = classNames
        .find((el) => el.match("form-field_required"))
        .split("form-field_required")[1];
      switch (validateValue) {
        case "_checkbox":
          if (field.checked === false) {
            field.classList.add("invalid");
            addErrMessage(field, "Подтвердите согласие");
            err.push(field.name);
          } else {
            removeErrMessage(field);
            field.classList.remove("invalid");
          }
          break;
        case "_email":
          if (field.value.trim() === "") {
            field.classList.add("invalid");
            addErrMessage(field, "Введите корретный email");
            err.push(field.name);
          } else {
            removeErrMessage(field);
            field.classList.remove("invalid");
          }
          break;
        default:
          if (field.value.trim() === "") {
            field.classList.add("invalid");
            addErrMessage(field);
            err.push(field.name);
          } else {
            removeErrMessage(field);
            field.classList.remove("invalid");
          }
          break;
      }
    }
  });
  return err;
}

function removeErrMessage(field) {
  const parrent = field.closest(".form__field");
  if (parrent) {
    let errMessage = parrent.querySelector(".err-message");
    errMessage ? (errMessage.textContent = "") : false;
  }
}

function addErrMessage(field, message = "Заполните поле") {
  const parrent = field.closest(".form__field");
  if (parrent) {
    let errMessage = parrent.querySelector(".err-message");
    errMessage ? (errMessage.textContent = message) : false;
  }
}

function _getFields(form) {
  return form.querySelectorAll(".form-field");
}

function removeFilesText(form) {
  const fieldFiles = form.querySelectorAll(".form-field_file");
  if (fieldFiles) {
    fieldFiles.forEach((el) => {
      el.nextElementSibling.textContent = "Прикрепить файл";
    });
  }
}

(function () {
  const fieldFiles = document.querySelectorAll(".form-field_file");
  if (fieldFiles) {
    fieldFiles.forEach((fieldFile) => {
      fieldFile.addEventListener("input", (e) => {
        const fieldText = fieldFile.nextElementSibling;
        if (e.target.files[0] && e.target.files[0].size / 1024 >= 20480) {
          addErrMessage(fieldFile, "Файл не должен превышать 20 мб");
          fieldFile.value = "";
          fieldText.textContent = "Прикрепить файл";
        } else {
          fieldText.textContent = e.target.files[0]
            ? e.target.files[0].name
            : "Прикрепить файл";
          removeErrMessage(fieldFile);
        }
      });
    });
  }
})();

document.querySelectorAll(".form").forEach((el) => sendForm(el));
