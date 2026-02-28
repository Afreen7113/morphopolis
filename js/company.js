document.addEventListener("DOMContentLoaded", () => {
  const loadJSON = (k, fallback) => {
    try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fallback; }
    catch { return fallback; }
  };
  const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  /* ---------------- Careers ---------------- */
  if (document.body.classList.contains("careers-page")) {
    const KEY = "morph_jobs";
    const APPLY_KEY = "morph_job_applications";

    const defaults = [
      { id:"j1", title:"Frontend Engineer", location:"Remote", type:"Full-time", team:"Platform", level:"Mid", tag:"Engineering" },
      { id:"j2", title:"Product Designer", location:"Hybrid", type:"Full-time", team:"Design", level:"Senior", tag:"Design" },
      { id:"j3", title:"AI Infrastructure Engineer", location:"Remote", type:"Full-time", team:"AI", level:"Senior", tag:"AI" },
      { id:"j4", title:"Customer Support Specialist", location:"Onsite", type:"Contract", team:"Support", level:"Mid", tag:"Support" }
    ];

    if (!Array.isArray(loadJSON(KEY, null))) saveJSON(KEY, defaults);

    const jobs = () => loadJSON(KEY, []);

    const list = document.getElementById("jobs-list");
    const q = document.getElementById("jobs-search");
    const loc = document.getElementById("jobs-location");
    const typ = document.getElementById("jobs-type");

    // modal
    const bd = document.getElementById("apply-backdrop");
    const close = document.getElementById("apply-close");
    const cancel = document.getElementById("apply-cancel");
    const send = document.getElementById("apply-send");
    const t = document.getElementById("apply-title");
    const sub = document.getElementById("apply-sub");
    const name = document.getElementById("apply-name");
    const email = document.getElementById("apply-email");
    const msg = document.getElementById("apply-msg");
    const status = document.getElementById("apply-status");

    let activeJob = null;

    const open = (job) => {
      activeJob = job;
      t.textContent = `Apply — ${job.title}`;
      sub.textContent = `${job.location} • ${job.type} • ${job.team}`;
      status.textContent = "";
      name.value = "";
      email.value = "";
      msg.value = "";
      bd.classList.add("active");
    };
    const closeModal = () => bd.classList.remove("active");

    close.addEventListener("click", closeModal);
    cancel.addEventListener("click", closeModal);
    bd.addEventListener("click", (e) => { if (e.target === bd) closeModal(); });

    // fill filters
    const fillSelect = (el, values) => {
      const curr = el.value;
      el.innerHTML = `<option value="all">All</option>` + values.map(v => `<option value="${v}">${v}</option>`).join("");
      el.value = values.includes(curr) ? curr : "all";
    };

    const render = () => {
      const all = jobs();
      fillSelect(loc, [...new Set(all.map(x=>x.location))]);
      fillSelect(typ, [...new Set(all.map(x=>x.type))]);

      const query = (q.value || "").trim().toLowerCase();
      const l = loc.value;
      const ty = typ.value;

      const filtered = all.filter(j => {
        const okQ = !query || `${j.title} ${j.team} ${j.tag}`.toLowerCase().includes(query);
        const okL = l === "all" || j.location === l;
        const okT = ty === "all" || j.type === ty;
        return okQ && okL && okT;
      });

      list.innerHTML = "";

      if (!filtered.length) {
        list.innerHTML = `<div class="company-card"><div class="title">No roles found</div><div class="sub">Try changing filters.</div></div>`;
        return;
      }

      filtered.forEach(job => {
        const el = document.createElement("div");
        el.className = "item";
        el.innerHTML = `
          <div class="item-left">
            <div class="item-title">${job.title}</div>
            <div class="item-meta">
              <span class="pill yellow">${job.tag}</span>
              <span class="pill">${job.location}</span>
              <span class="pill blue">${job.type}</span>
              <span class="pill">${job.team}</span>
              <span class="pill green">${job.level}</span>
            </div>
          </div>
          <div class="item-right">
            <button class="company-btn primary" type="button">Apply</button>
          </div>
        `;
        el.querySelector("button").addEventListener("click", () => open(job));
        list.appendChild(el);
      });
    };

    q.addEventListener("input", render);
    loc.addEventListener("change", render);
    typ.addEventListener("change", render);

    send.addEventListener("click", () => {
      if (!activeJob) return;
      const n = (name.value || "").trim();
      const e = (email.value || "").trim();
      const m = (msg.value || "").trim();
      if (!n || !/^\S+@\S+\.\S+$/.test(e)) {
        status.textContent = "Enter a valid name and email.";
        return;
      }

      const apps = loadJSON(APPLY_KEY, []);
      apps.unshift({
        id: (crypto?.randomUUID ? crypto.randomUUID() : String(Date.now())),
        jobId: activeJob.id,
        jobTitle: activeJob.title,
        name: n,
        email: e,
        message: m,
        createdAt: new Date().toISOString()
      });
      saveJSON(APPLY_KEY, apps);

      status.textContent = "Application submitted. We’ll reach out if there’s a match.";
      setTimeout(closeModal, 900);
    });

    render();
  }

  /* ---------------- Blog ---------------- */
  if (document.body.classList.contains("blog-page")) {
    const KEY = "morph_blog_posts";

    const defaults = [
      {
        id:"p1",
        title:"Exporting to IFC: Best Practices",
        tag:"BIM",
        date:"2026-02-10",
        body:"IFC exports work best when your rooms and circulation are clearly defined. In this guide, we cover naming conventions, layer mapping, and validation before handoff.\n\nRecommended workflow:\n• Generate floor plan\n• Validate dimensions\n• Export to IFC\n• Review in BIM tool"
      },
      {
        id:"p2",
        title:"Prompt Engineering for Architecture",
        tag:"AI",
        date:"2026-01-22",
        body:"Great prompts provide constraints: site context, footprint, style, and adjacency rules. Start with core program (rooms) then add materiality and lighting cues."
      },
      {
        id:"p3",
        title:"Lighting & Material Consistency in Renders",
        tag:"Rendering",
        date:"2026-01-05",
        body:"Consistency comes from describing the lighting model, time of day, and materials in the prompt, and keeping iterations controlled."
      }
    ];

    if (!Array.isArray(loadJSON(KEY, null))) saveJSON(KEY, defaults);

    const list = document.getElementById("blog-list");
    const search = document.getElementById("blog-search");
    const tagSel = document.getElementById("blog-tag");

    // modal
    const bd = document.getElementById("post-backdrop");
    const close = document.getElementById("post-close");
    const close2 = document.getElementById("post-close-2");
    const title = document.getElementById("post-title");
    const meta = document.getElementById("post-meta");
    const body = document.getElementById("post-body");

    const open = (post) => {
      title.textContent = post.title;
      meta.textContent = `${post.tag} • ${post.date}`;
      body.textContent = post.body;
      bd.classList.add("active");
    };
    const closeModal = () => bd.classList.remove("active");

    close.addEventListener("click", closeModal);
    close2.addEventListener("click", closeModal);
    bd.addEventListener("click", (e) => { if (e.target === bd) closeModal(); });

    const posts = () => loadJSON(KEY, []);

    const render = () => {
      const all = posts();
      const tags = [...new Set(all.map(p => p.tag))];

      // fill tag select once
      const curr = tagSel.value || "all";
      tagSel.innerHTML = `<option value="all">All tags</option>` + tags.map(t => `<option value="${t}">${t}</option>`).join("");
      tagSel.value = tags.includes(curr) ? curr : "all";

      const q = (search.value || "").trim().toLowerCase();
      const t = tagSel.value;

      const filtered = all.filter(p => {
        const okQ = !q || `${p.title} ${p.body}`.toLowerCase().includes(q);
        const okT = t === "all" || p.tag === t;
        return okQ && okT;
      });

      list.innerHTML = "";
      if (!filtered.length) {
        list.innerHTML = `<div class="company-card"><div class="title">No posts found</div><div class="sub">Try another search or tag.</div></div>`;
        return;
      }

      filtered.forEach(p => {
        const el = document.createElement("div");
        el.className = "item";
        el.innerHTML = `
          <div class="item-left">
            <div class="item-title">${p.title}</div>
            <div class="item-meta">
              <span class="pill yellow">${p.tag}</span>
              <span class="pill">${p.date}</span>
            </div>
          </div>
          <div class="item-right">
            <button class="company-btn primary" type="button">Read</button>
          </div>
        `;
        el.querySelector("button").addEventListener("click", () => open(p));
        list.appendChild(el);
      });
    };

    search.addEventListener("input", render);
    tagSel.addEventListener("change", render);

    render();
  }
});