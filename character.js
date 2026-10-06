/*
 * 角色素材挂载器。
 *
 * 这里不绘制角色，也不在原图上叠加眼睛、嘴巴或装饰。
 * 确认单角色素材后，只需要在 content.js 的 character.src 填入相对路径。
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

    const character = window.SITE_CONTENT?.character || {};
    const source = typeof character.src === "string" ? character.src.trim() : "";
    const alt = character.alt || "黎婷的猫耳女生角色";

    mount.replaceChildren();

    if (!source) {
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
    image.className = "character-image";
    image.src = source;
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
  }

  window.mountCharacter = mountCharacter;
})();
