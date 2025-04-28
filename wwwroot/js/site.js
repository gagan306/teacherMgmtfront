///**
// * Toggles dark theme on the given element (by id or any selector).
// * @param {string} selector  — an element ID (without ‘#’) or any valid querySelector.
// */
//function toggleDarkTheme(selector) {
//    let el;
//    // if it's just an ID (no selector chars) try getElementById
//    if (!/[.#\[\]>]/.test(selector)) {
//        el = document.getElementById(selector);
//    }
//    // fallback to querySelector
//    if (!el) {
//        el = document.querySelector(selector);
//    }
//    if (!el) return console.warn(`No element found for selector “${selector}”`);

//    el.classList.toggle('dark-theme');
//}
