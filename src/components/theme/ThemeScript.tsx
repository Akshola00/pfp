/**
 * Runs before first paint to set the `dark` class from localStorage or the OS
 * preference — without it the page would flash the wrong theme on load.
 * Kept as a raw string so it ships inline in <head> ahead of any React hydration.
 */
const script = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){document.documentElement.classList.add("dark");}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
