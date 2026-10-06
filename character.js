/*
 * 角色素材挂载器。
 *
 * 这里不绘制角色，也不在原图上叠加眼睛、嘴巴或装饰。
 * 动画通过几张透明 PNG 帧切换完成；没有帧或用户偏好减少动态时，只显示 fallback 原图。
 */
(function () {
  "use strict";

  function textNode(tagName, className, value) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = value;
    return element;
  }

  function mountCharacter(mount) {
    if (!mount) return;

    if (typeof mount.__characterCleanup === "function") {
      mount.__characterCleanup();
      mount.__characterCleanup = null;
    }

    const character = window.SITE_CONTENT?.character || {};
    const source = typeof character.src === "string" ? character.src.trim() : "";
    const alt = character.alt || "黎婷的猫耳女生角色";
    const configuredFrames = Array.isArray(character.frames) ? character.frames : [];
    const frames = configuredFrames
      .map((frame) => ({
        src: typeof frame?.src === "string" ? frame.src.trim() : "",
        duration: Number.isFinite(Number(frame?.duration)) ? Math.max(450, Number(frame.duration)) : 1200
      }))
      .filter((frame) => frame.src);
    const playableFrames = frames.length ? frames : (source ? [{ src: source, duration: 2400 }] : []);

    mount.replaceChildren();

    if (!playableFrames.length) {
      mount.classList.add("is-pending");
      mount.setAttribute("aria-label", "角色素材待确认");
      const placeholder = textNode("p", "character-placeholder", "角色素材待确认");
      placeholder.appendChild(textNode("small", "", "请提供一张独立的单角色原图"));
      mount.appendChild(placeholder);
      return;
    }

    mount.classList.remove("is-pending");
    mount.setAttribute("aria-label", alt);
    const image = document.createElement("img");
    image.className = "character-image character-image--animated";
    image.src = playableFrames[0].src;
    image.alt = alt;
    image.decoding = "async";
    image.addEventListener("error", () => {
      mount.replaceChildren();
      mount.classList.add("is-pending");
      mount.setAttribute("aria-label", "角色素材暂时无法加载");
      const placeholder = textNode("p", "character-placeholder", "角色素材暂时无法加载");
      placeholder.appendChild(textNode("small", "", "请检查 content.js 中的相对路径"));
      mount.appendChild(placeholder);
    }, { once: true });
    mount.appendChild(image);

    if (playableFrames.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const preloaded = playableFrames.map((frame) => {
      const preloadedImage = new Image();
      preloadedImage.src = frame.src;
      return preloadedImage;
    });
    let frameIndex = 0;
    let timerId = 0;
    let stopped = false;

    const scheduleNext = () => {
      if (stopped) return;
      timerId = window.setTimeout(() => {
        frameIndex = (frameIndex + 1) % playableFrames.length;
        if (preloaded[frameIndex].complete) {
          image.src = playableFrames[frameIndex].src;
        }
        scheduleNext();
      }, playableFrames[frameIndex].duration);
    };

    scheduleNext();
    mount.__characterCleanup = () => {
      stopped = true;
      window.clearTimeout(timerId);
    };
  }

  window.mountCharacter = mountCharacter;
})();
