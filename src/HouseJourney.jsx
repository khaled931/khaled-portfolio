import React, { useEffect, useRef, useState } from "react";
import { houseContent } from "./houseContent.js";
import {
  chapterAtProgress,
  progressFromScroll,
  tourRooms,
  tourStops,
} from "./houseJourney.js";
import { isPlainNavigation } from "./navigation.js";

function RoomLink({ id, onNavigate, children, ...props }) {
  return (
    <a
      href={`#${id}`}
      onClick={(event) => {
        if (isPlainNavigation(event)) {
          event.preventDefault();
          onNavigate(id, event);
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}

export default function HouseJourney({
  language,
  theme,
  t,
  onNavigate,
  visited,
  rtl,
}) {
  const h = houseContent[language];
  const journey = useRef(null);
  const stage = useRef(null);
  const mount = useRef(null);
  const engine = useRef(null);
  const latestLabels = useRef(t.rooms);
  latestLabels.current = t.rooms;
  const progress = useRef(0);
  const bounds = useRef({ top: 0, height: 1, stage: 1 });
  const [chapter, setChapter] = useState("entrance");
  const [status, setStatus] = useState("loading");
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const saveData = Boolean(
    navigator.connection?.saveData ||
    /(^|-)2g$/.test(navigator.connection?.effectiveType || ""),
  );
  const animated = !reducedMotion && !saveData && status !== "unavailable";
  const currentRoom = tourRooms.includes(chapter) ? chapter : null;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReducedMotion(query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let unavailable = false;
    let controller;
    if (
      saveData ||
      reducedMotion ||
      typeof window.WebGL2RenderingContext === "undefined"
    ) {
      setStatus("unavailable");
      return;
    }
    setStatus("loading");
    // The rendering runtime belongs only to the home route. Every portfolio
    // chapter remains native HTML and can be opened without WebGL.
    import("./houseScene.js")
      .then(async ({ createHouseScene }) => {
        if (cancelled) return;
        controller = createHouseScene(mount.current, {
          theme,
          labels: t.rooms,
          onUnavailable: () => {
            unavailable = true;
            controller?.dispose();
            engine.current = null;
            if (!cancelled) setStatus("unavailable");
          },
        });
        await controller?.ready;
        if (cancelled) {
          controller?.dispose();
          return;
        }
        if (!controller || unavailable) {
          controller?.dispose();
          setStatus("unavailable");
          return;
        }
        engine.current = controller;
        controller.setProgress(progress.current, true);
        setStatus("ready");
        await document.fonts?.ready;
        if (!cancelled && !unavailable)
          controller.setLabels(latestLabels.current);
      })
      .catch(() => {
        if (!cancelled) setStatus("unavailable");
      });
    return () => {
      cancelled = true;
      controller?.dispose();
      engine.current = null;
    };
  }, [reducedMotion, saveData]);

  useEffect(() => {
    engine.current?.setTheme(theme);
  }, [theme, status]);
  useEffect(() => {
    engine.current?.setLabels(t.rooms);
  }, [language, t, status]);

  useEffect(() => {
    const header = document.querySelector(".site-header");
    const measure = () => {
      const headerHeight = header?.getBoundingClientRect().height || 72;
      journey.current.style.setProperty(
        "--house-header-height",
        `${headerHeight}px`,
      );
      const box = journey.current.getBoundingClientRect();
      bounds.current = {
        top: box.top + window.scrollY - headerHeight,
        height: journey.current.offsetHeight,
        stage: stage.current.offsetHeight,
      };
      update();
    };
    const update = () => {
      const b = bounds.current;
      const next = animated
        ? progressFromScroll(window.scrollY, b.top, b.height, b.stage)
        : 0;
      progress.current = next;
      stage.current.style.setProperty("--tour-progress", next);
      stage.current.dataset.progress = next.toFixed(3);
      setChapter((old) => {
        const nextChapter = chapterAtProgress(next);
        return old === nextChapter ? old : nextChapter;
      });
      engine.current?.setProgress(next);
    };
    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(journey.current);
    observer.observe(stage.current);
    if (header) observer.observe(header);
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
    };
  }, [animated]);

  function moveTo(stop) {
    const b = bounds.current;
    window.scrollTo({
      top: Math.max(0, b.top + stop * Math.max(0, b.height - b.stage)),
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }
  function showDirectory(event) {
    if (!isPlainNavigation(event)) return;
    event.preventDefault();
    const heading = document.getElementById("house-directory-title");
    heading?.scrollIntoView({ behavior: "instant", block: "start" });
    heading?.focus({ preventScroll: true });
  }

  return (
    <div className="house-home">
      <section
        ref={journey}
        className="house-journey"
        data-animated={animated}
        aria-labelledby="page-title"
      >
        <div
          ref={stage}
          className="house-stage"
          data-chapter={chapter}
          data-status={status}
        >
          <div className="house-art" aria-label={h.scene} role="img">
            <img
              className="house-still"
              src="/media/house/entrance-900.webp"
              srcSet="/media/house/entrance-480.webp 480w, /media/house/entrance-900.webp 900w, /media/house/entrance-1440.webp 1440w"
              sizes="100vw"
              width="1536"
              height="1024"
              alt=""
              fetchPriority="high"
              draggable={false}
            />
            <div ref={mount} className="house-canvas" aria-hidden="true" />
          </div>
          <div className="house-tone" aria-hidden="true" />
          <div className="house-topline">
            <span>{h.eyebrow}</span>
            <a
              className="house-direct"
              href="#house-directory-title"
              onClick={showDirectory}
            >
              {h.direct}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div
            className="house-welcome"
            aria-hidden={chapter !== "entrance" ? true : undefined}
            inert={chapter !== "entrance" ? true : undefined}
          >
            <h1 id="page-title" tabIndex={-1}>
              {h.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p>{h.intro}</p>
          </div>
          {currentRoom && (
            <div className="house-chapter" key={currentRoom}>
              <p className="house-chapter-number">
                <span dir="ltr">0{tourRooms.indexOf(currentRoom) + 1}</span>{" "}
                {h.room}
              </p>
              <h2>{t.rooms[currentRoom]}</h2>
              <p>{t.descriptions[currentRoom]}</p>
              <RoomLink
                id={currentRoom}
                onNavigate={onNavigate}
                className="house-read"
              >
                {h.read}
                <span aria-hidden="true">↗</span>
              </RoomLink>
            </div>
          )}
          {chapter === "terrace" && (
            <div className="house-chapter house-closing">
              <p className="house-chapter-number">{t.more}</p>
              <h2>{h.terrace}</h2>
              <p>{h.closing}</p>
              <RoomLink
                id="story"
                onNavigate={onNavigate}
                className="house-read"
              >
                {t.story}
                <span aria-hidden="true">↗</span>
              </RoomLink>
            </div>
          )}
          {animated && status === "ready" && (
            <nav className="house-chapters" aria-label={h.chapters}>
              {tourRooms.map((id, index) => (
                <button
                  key={id}
                  type="button"
                  aria-label={`${t.enter} · ${t.rooms[id]}`}
                  aria-current={currentRoom === id ? "step" : undefined}
                  onClick={() => moveTo(tourStops[id])}
                >
                  <span aria-hidden="true">0{index + 1}</span>
                  <span className="house-chapter-tooltip">{t.rooms[id]}</span>
                </button>
              ))}
            </nav>
          )}
          <div className="house-bottomline">
            {animated && status === "ready" ? (
              <button
                type="button"
                className="house-scroll-cue"
                onClick={() =>
                  moveTo(
                    chapter === "entrance"
                      ? tourStops.education
                      : chapter === "terrace"
                        ? 0
                        : (tourStops[
                            tourRooms[tourRooms.indexOf(currentRoom) + 1]
                          ] ?? 1),
                  )
                }
                aria-describedby="house-keyboard-help"
              >
                <span className="scroll-symbol" aria-hidden="true">
                  <span />
                </span>
                <span>
                  {chapter === "entrance"
                    ? h.scroll
                    : chapter === "terrace"
                      ? h.restart
                      : h.continue}
                </span>
              </button>
            ) : (
              <span className="house-load-message" role="status">
                {status === "loading" ? h.loading : h.flat}
              </span>
            )}
            {animated && status === "ready" && (
              <span className="house-look-hint">{h.look}</span>
            )}
          </div>
          <div className="house-progress" aria-hidden="true">
            <span />
          </div>
          <p className="sr-only" id="house-keyboard-help">
            {h.keyboard}
          </p>
          <p className="sr-only" role="status" aria-live="polite">
            {currentRoom
              ? t.rooms[currentRoom]
              : chapter === "terrace"
                ? h.terrace
                : h.entrance}
          </p>
        </div>
      </section>
      <section
        className="house-directory"
        aria-labelledby="house-directory-title"
      >
        <div className="house-directory-heading">
          <p className="eyebrow">{t.footer}</p>
          <h2 id="house-directory-title" tabIndex={-1}>
            {h.directoryTitle}
          </h2>
          <p>{h.directoryIntro}</p>
        </div>
        <nav className="house-directory-list" aria-label={t.allRooms}>
          {tourRooms.map((id, index) => (
            <RoomLink
              key={id}
              id={id}
              onNavigate={onNavigate}
              aria-label={t.shortRooms[id]}
            >
              <span className="house-directory-index" dir="ltr">
                0{index + 1}
              </span>
              <div>
                <h3>{t.rooms[id]}</h3>
                <p>{t.descriptions[id]}</p>
              </div>
              <span className="house-directory-arrow" aria-hidden="true">
                {visited.has(id) ? "✓" : "↗"}
              </span>
            </RoomLink>
          ))}
        </nav>
        <nav className="house-beyond" aria-label={t.more}>
          {["story", "digital", "visuals", "contact"].map((id) => (
            <RoomLink id={id} onNavigate={onNavigate} key={id}>
              {t[id]}
              <span aria-hidden="true">↗</span>
            </RoomLink>
          ))}
        </nav>
      </section>
    </div>
  );
}
