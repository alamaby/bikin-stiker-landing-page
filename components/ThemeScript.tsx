const THEME_SCRIPT = `(function () {
  try {
    var html = document.documentElement;
    var stored = localStorage.getItem("hs_theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark = stored === "dark" || ((stored === "auto" || !stored) && prefersDark);
    html.classList.toggle("dark", isDark);
  } catch (e) {}
})();`;

/**
 * Inline theme bootstrap placed in <head> so the saved theme applies
 * before first paint (prevents dark-mode flash). The Preline
 * theme-switch plugin persists to the same `hs_theme` localStorage key.
 */
export function ThemeScript() {
  return (
    <script
      id="hs-theme-script"
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
