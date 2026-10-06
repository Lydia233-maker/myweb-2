(function () {
  "use strict";

  const content = window.SITE_CONTENT || {
    person: {
      name: "黎婷",
      greeting: "嗨，我是黎婷。",
      subtitle: "把想法，做成有用的小产品。",
      intro: "探索 AI，记录实践，也给生活留一点好奇心。"
    },
    character: { src: "", alt: "黎婷的猫耳女生角色" },
    projects: [],
    contact: { email: "", github: "" }
  };

  const projectLinkSlots = ["Demo", "项目详情", "GitHub"];

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element && value) element.textContent = value;
  }

  function setHeroTitle(value) {
    const element = document.getElementById("hero-title");
    if (!element || !value) return;

    const text = String(value).trim();
    const splitAt = text.indexOf("我是");
    if (splitAt === -1) {
      element.textContent = text;
      return;
    }

    element.replaceChildren();
    const firstLine = document.createElement("span");
    firstLine.className = "hero-title-line";
    firstLine.textContent = text.slice(0, splitAt + 2);
    const secondLine = document.createElement("span");
    secondLine.className = "hero-title-line";
    secondLine.textContent = text.slice(splitAt + 2);
    element.append(firstLine, secondLine);
  }

  function projectArt(type) {
    if (type === "feature") {
      return `
        <svg viewBox="0 0 250 180" aria-hidden="true">
          <rect x="26" y="27" width="190" height="126" rx="4" fill="#FFFDF8" stroke="currentColor" stroke-width="2"/>
          <path d="M45 54h79M45 69h51" fill="none" stroke="#B58A43" stroke-linecap="round" stroke-width="3"/>
          <path d="M47 111c16-22 28 8 44-13 15-20 24 8 39-9 17-19 27 1 43-11" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"/>
          <path d="M48 130h140" fill="none" stroke="#DDD0BE" stroke-linecap="round" stroke-width="2"/>
          <circle cx="181" cy="64" r="11" fill="#EFE5D8" stroke="#B58A43" stroke-width="2"/>
          <path d="m176 64 4 4 7-8" fill="none" stroke="#44362B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>`;
    }

    if (type === "notes") {
      return `
        <svg viewBox="0 0 250 180" aria-hidden="true">
          <path d="M61 29h115a8 8 0 0 1 8 8v108H53V37a8 8 0 0 1 8-8Z" fill="#EFE5D8" stroke="currentColor" stroke-width="2"/>
          <path d="M77 53h76M77 70h96M77 87h78M77 116h56" fill="none" stroke="#78695B" stroke-linecap="round" stroke-width="3"/>
          <path d="m157 110 18 18-27 10-1-28Z" fill="#FFFDF8" stroke="#B58A43" stroke-linejoin="round" stroke-width="2"/>
          <path d="m154 137 4-9 9 1" fill="none" stroke="#44362B" stroke-linecap="round" stroke-width="2"/>
        </svg>`;
    }

    return `
      <svg viewBox="0 0 250 180" aria-hidden="true">
        <path d="M125 31c17 0 30 13 30 30 0 12-7 20-14 27-5 5-7 9-7 16h-18c0-7-2-11-7-16-7-7-14-15-14-27 0-17 13-30 30-30Z" fill="#FFFDF8" stroke="currentColor" stroke-linejoin="round" stroke-width="2"/>
        <path d="M116 113h18M115 122h20M117 139h16" fill="none" stroke="#B58A43" stroke-linecap="round" stroke-width="3"/>
        <path d="M125 20v-8M81 37l-6-6M169 37l6-6" fill="none" stroke="#B58A43" stroke-linecap="round" stroke-width="2"/>
        <circle cx="125" cy="61" r="9" fill="#EFE5D8" stroke="#B58A43" stroke-width="2"/>
      </svg>`;
  }

  function isUsableUrl(url) {
    if (!url || typeof url !== "string") return false;
    return /^(https?:\/\/|mailto:)/i.test(url.trim());
  }

  function renderProjectLinks(project) {
    const links = Array.isArray(project.links) ? project.links : [];
    return projectLinkSlots.map((label) => {
      const match = links.find((link) => link && link.label === label && isUsableUrl(link.url));
      if (match) {
        return `<a class="project-link" href="${match.url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
      }
      return `<span class="project-link is-placeholder">${label} 即将补充</span>`;
    }).join("");
  }

  function renderProjects() {
    const list = document.getElementById("projectList");
    if (!list) return;

    const projects = Array.isArray(content.projects) ? content.projects : [];
    if (!projects.length) {
      list.innerHTML = `<p class="project-empty">项目内容正在整理中，稍后回来看看。</p>`;
      return;
    }

    list.innerHTML = projects.map((project, index) => {
      const type = project.type || "placeholder";
      const modifier = type === "feature" ? "project-card--feature" : type === "notes" ? "project-card--notes" : "project-card--placeholder";
      return `
        <article class="project-card ${modifier} reveal">
          <div class="project-card-inner">
            <div class="project-copy">
              <div class="project-meta">
                <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
                <span class="project-status">${project.status || "待补充"}</span>
              </div>
              <h3>${project.title || "未命名项目"}</h3>
              <p>${project.summary || "项目介绍待补充。"}</p>
              <div class="project-links" aria-label="${project.title || "项目"}的入口">
                ${renderProjectLinks(project)}
              </div>
            </div>
            <div class="project-art project-art--${type}" aria-hidden="true">
              ${projectArt(type)}
            </div>
          </div>
        </article>`;
    }).join("");
  }

  function setContactValue(id, value, kind) {
    const element = document.getElementById(id);
    if (!element) return;

    const usable = kind === "email" ? /^mailto:/i.test(value || "") || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "") : isUsableUrl(value);
    if (!usable) return;

    const href = kind === "email" && !/^mailto:/i.test(value) ? `mailto:${value}` : value;
    const label = kind === "email" ? value.replace(/^mailto:/i, "") : value.replace(/^https?:\/\//i, "").replace(/\/$/, "");
    element.classList.remove("is-placeholder");
    element.innerHTML = `<a href="${href}"${kind === "github" ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`;
  }

  function setupReveal() {
    const revealItems = Array.from(document.querySelectorAll(".reveal"));
    if (!revealItems.length) return;

    document.body.classList.add("js-ready");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealItems.forEach((item) => observer.observe(item));
  }

  function initialize() {
    setHeroTitle(content.person?.greeting);
    setText("hero-lead", content.person?.subtitle);
    setText("hero-intro", content.person?.intro);
    document.title = `${content.person?.name || "个人"} · 个人小天地`;
    renderProjects();
    setContactValue("emailContact", content.contact?.email, "email");
    setContactValue("githubContact", content.contact?.github, "github");

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    if (typeof window.mountCharacter === "function") {
      window.mountCharacter(document.getElementById("characterMount"));
    }
    setupReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
