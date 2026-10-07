export const roomIds = ["experience", "projects", "volunteering", "education"];
export const pageIds = [
  "gallery",
  ...roomIds,
  "story",
  "visuals",
  "digital",
  "contact",
];
export const languageIds = ["en", "ar", "no", "fr"];

const aliases = {
  home: "gallery",
  top: "gallery",
  energy: "education",
  volunteer: "volunteering",
  media: "visuals",
  work: "projects",
  journey: "story",
  about: "story",
};

export function pageFromHash(hash) {
  const value = hash.replace(/^#\/?/, "").split(/[?&/]/)[0];
  return pageIds.includes(value) ? value : aliases[value] || "gallery";
}

export function readPreference(storage, key, allowed, fallback) {
  try {
    const value = (typeof storage === "function" ? storage() : storage).getItem(
      key,
    );
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function savePreference(storage, key, value) {
  try {
    (typeof storage === "function" ? storage() : storage).setItem(key, value);
  } catch {
    /* Private browsing may restrict storage. */
  }
}

// Real anchors remain useful with modifier keys, keyboard and browser history.
export function isPlainNavigation(event) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

export function nextRoom(page) {
  const index = roomIds.indexOf(page);
  return roomIds[(index + 1) % roomIds.length];
}
