document.addEventListener("DOMContentLoaded", () => {
  const toc = document.getElementById("legal-toc");
  const article = document.getElementById("legal-article");
  if (!toc || !article) return;

  // Smooth scroll
  toc.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.getAttribute("href");
      const el = id ? document.querySelector(id) : null;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Highlight active section
  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const targets = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  };

  const obs = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) setActive(visible.target.id);
  }, { rootMargin: "-20% 0px -70% 0px", threshold: [0.08, 0.15, 0.25] });

  targets.forEach(t => obs.observe(t));
});