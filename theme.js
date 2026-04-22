(function(){
  const storageKey = "dnd-theme";
  const root = document.documentElement;

  function getTheme(){
    const saved = localStorage.getItem(storageKey);
    return saved === "light" || saved === "dark" ? saved : "dark";
  }

  function setTheme(theme){
    root.dataset.theme = theme;
    localStorage.setItem(storageKey, theme);
    const button = document.querySelector("[data-theme-toggle]");
    if (button) {
      button.textContent = theme === "light" ? "Dunkel" : "Hell";
      button.title = theme === "light" ? "Dunklen Modus aktivieren" : "Hellen Modus aktivieren";
      button.setAttribute("aria-label", button.title);
    }
  }

  setTheme(getTheme());

  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".topbar");
    if (!header) return;

    let actions = header.querySelector(".top-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "top-actions";
      header.appendChild(actions);
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.dataset.themeToggle = "";
    button.addEventListener("click", () => {
      setTheme(root.dataset.theme === "light" ? "dark" : "light");
    });
    actions.appendChild(button);
    setTheme(root.dataset.theme || getTheme());
  });
})();
