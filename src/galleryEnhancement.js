import "./gallery-enhancement.css";
import { media } from "./mediaGallery.js";

const galleryCopy = {
  en: {
    eyebrow: "Selected visual work",
    title: "Photography & drone gallery",
    description: "A selection of aerial landscapes, nature photography, night work and a featured drone video.",
    playVideo: "Load the featured drone video",
  },
  ar: {
    eyebrow: "أعمال بصرية مختارة",
    title: "معرض التصوير والدرون",
    description: "مجموعة مختارة من المشاهد الجوية وتصوير الطبيعة والتصوير الليلي، إضافة إلى فيديو درون مميز.",
    playVideo: "تحميل فيديو الدرون المختار",
  },
  no: {
    eyebrow: "Utvalgt visuelt arbeid",
    title: "Foto- og dronegalleri",
    description: "Et utvalg av luftlandskap, naturfotografi, nattbilder og en utvalgt dronevideo.",
    playVideo: "Last inn den utvalgte dronevideoen",
  },
  fr: {
    eyebrow: "Travaux visuels sélectionnés",
    title: "Galerie photo et drone",
    description: "Une sélection de paysages aériens, de photographies de nature, de prises de vue nocturnes et une vidéo drone mise en avant.",
    playVideo: "Charger la vidéo drone sélectionnée",
  },
};

function getActiveLanguage() {
  const languageSelect = document.querySelector(".language-select select");
  const language = languageSelect?.value;
  return galleryCopy[language] ? language : "en";
}

function createImage(item, language) {
  const image = document.createElement("img");
  image.src = item.src;
  image.alt = item.alt?.[language] || "";
  image.loading = "lazy";
  image.decoding = "async";
  image.width = item.width;
  image.height = item.height;
  return image;
}

function createYouTubePlayer(item, language, frame) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${item.youtubeId}?rel=0`;
  iframe.title = item.caption?.[language] || galleryCopy[language].playVideo;
  iframe.width = item.width;
  iframe.height = item.height;
  iframe.loading = "lazy";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;
  frame.replaceChildren(iframe);
}

function createGalleryCard(item, language) {
  const figure = document.createElement("figure");
  figure.className = "media-gallery-card";
  figure.dataset.galleryId = item.id;

  if (item.wide) figure.classList.add("media-gallery-card--wide");
  if (item.portrait) figure.classList.add("media-gallery-card--portrait");
  if (item.type === "youtube") figure.classList.add("media-gallery-card--video");

  const frame = document.createElement("div");
  frame.className = "media-gallery-frame";

  if (item.type === "youtube") {
    const loader = document.createElement("button");
    loader.type = "button";
    loader.className = "media-youtube-loader";
    loader.setAttribute("aria-label", galleryCopy[language].playVideo);
    loader.append(createImage({ ...item, src: item.poster }, language));

    const playIcon = document.createElement("span");
    playIcon.setAttribute("aria-hidden", "true");
    playIcon.textContent = "▶";
    loader.append(playIcon);
    loader.addEventListener("click", () => createYouTubePlayer(item, language, frame), { once: true });
    frame.append(loader);
  } else {
    frame.append(createImage(item, language));
  }

  const caption = document.createElement("figcaption");
  caption.textContent = item.caption?.[language] || "";

  figure.append(frame, caption);
  return figure;
}

function buildGallery(language) {
  const copy = galleryCopy[language];
  const section = document.createElement("section");
  section.id = "photography-gallery";
  section.className = "media-gallery-enhancement";
  section.dataset.galleryLanguage = language;
  section.setAttribute("aria-labelledby", "photography-gallery-title");

  const heading = document.createElement("header");
  heading.className = "media-gallery-heading";

  const eyebrow = document.createElement("p");
  eyebrow.textContent = copy.eyebrow;

  const title = document.createElement("h2");
  title.id = "photography-gallery-title";
  title.textContent = copy.title;

  const description = document.createElement("span");
  description.textContent = copy.description;

  heading.append(eyebrow, title, description);

  const grid = document.createElement("div");
  grid.className = "media-gallery-grid";
  media.gallery.forEach((item) => grid.append(createGalleryCard(item, language)));

  section.append(heading, grid);
  return section;
}

function renderGallery() {
  const mediaPage = document.querySelector(".energy-page#media");
  const existingGallery = document.querySelector("#photography-gallery");

  if (!mediaPage) {
    existingGallery?.remove();
    return;
  }

  const language = getActiveLanguage();
  if (existingGallery?.dataset.galleryLanguage === language && existingGallery.parentElement === mediaPage) return;

  existingGallery?.remove();
  mediaPage.append(buildGallery(language));
}

let renderQueued = false;
function queueGalleryRender() {
  if (renderQueued) return;
  renderQueued = true;
  window.requestAnimationFrame(() => {
    renderQueued = false;
    renderGallery();
  });
}

const observer = new MutationObserver(queueGalleryRender);
observer.observe(document.documentElement, { childList: true, subtree: true });

document.addEventListener("change", (event) => {
  if (event.target.matches?.(".language-select select")) queueGalleryRender();
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", queueGalleryRender, { once: true });
} else {
  queueGalleryRender();
}
