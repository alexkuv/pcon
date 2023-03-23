/**
 * @param {HTMLElement} select
 */
function selectBehavior(select) {
  if (select) {
    const selectTitle = select.querySelector(".select__title");
    const selectTitleText = select.querySelector("span") ?? selectTitle;
    const selectLabels = select.querySelectorAll(".select__label");
    const originalSelect = select.querySelector("select");
    /* Toggle select */
    selectTitle.addEventListener("click", (event) => {
      if (select.getAttribute("data-state") === "active") {
        select.setAttribute("data-state", "");
        document.removeEventListener("click", hideSelectHandler, true);
      } else {
        hideAllSelects();
        select.setAttribute("data-state", "active");
        document.addEventListener("click", hideSelectHandler, true);
      }
    });

    selectLabels.forEach((label) => {
      label.addEventListener("click", (e) => {
        selectLabels.forEach((item) =>
          item.setAttribute("data-selected", "false")
        );
        selectTitleText.textContent = label.textContent;
        label.setAttribute("data-selected", "true");
        select.setAttribute("data-state", "");
        originalSelect.querySelector(
          `[value="${label.getAttribute("data-value")}"]`
        ).selected = "selected";
      });
    });
  }
}

function hideSelectHandler(event) {
  if (!event.target.closest(".select")) {
    hideAllSelects();
    document.removeEventListener("click", hideSelectHandler);
  }
}

function hideAllSelects() {
  const selects = document.querySelectorAll(".select");
  selects.forEach((item) => item.setAttribute("data-state", ""));
}

export function SelectsCastToDefault(form) {
  const selects = form.querySelectorAll(".select_view_default");
  if (selects) {
    selects.forEach((select) => {
      const selectTitle = select.querySelector(".select__title");
      const selectTitleText = select.querySelector("span") ?? selectTitle;
      const originalSelect = select.querySelector("select");

      const selectsLabel = select.querySelectorAll(".select__label");
      selectsLabel.forEach((item) =>
        item.setAttribute("data-selected", "false")
      );

      const currentLabel = select.querySelector(
        `.select__label[data-value="${originalSelect.value}"]`
      );
      selectTitleText.textContent = currentLabel.textContent;
    });
  }
}

const selects = document.querySelectorAll(".select_view_default");
selects.forEach((item) => {
  selectBehavior(item);
});
