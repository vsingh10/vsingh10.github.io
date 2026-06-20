    'use strict';

    /* ═════════ Mount illustrations ═════════ */
    function mountIllus(id, key) {
      const el = document.getElementById(id);
      if (el && window.ILLUS && window.ILLUS[key]) {
        // For panels with corners + meta, insert SVG before existing children
        el.insertAdjacentHTML('afterbegin', window.ILLUS[key]());
      }
    }
    mountIllus('illus-hero', 'hero');
    mountIllus('illus-about', 'about');
    mountIllus('illus-about-pinn', 'aboutPinn');
    mountIllus('illus-education', 'education');
    mountIllus('illus-research', 'research');
    mountIllus('illus-achievements', 'achievements');
    mountIllus('illus-certifications', 'certifications');
    mountIllus('illus-contact', 'contact');

    /* ═════════ Page router ═════════ */
    const pageOrder = ['hero', 'about', 'education', 'experience', 'research', 'projects', 'achievements', 'certifications', 'contact'];
    const pages = {};
    document.querySelectorAll('.page').forEach(p => pages[p.id.replace('pg-', '')] = p);
    let current = 'hero';

    function updateProgress(i) {
      document.getElementById('tb-fill').style.width = ((i + 1) / pageOrder.length * 100) + '%';
      document.getElementById('tb-pct').textContent = String(i + 1).padStart(2, '0') + ' / ' + String(pageOrder.length).padStart(2, '0');
    }

    function goTo(name) {
      if (!pages[name] || name === current) return;
      pages[current].classList.remove('active');
      pages[name].classList.add('active');
      pages[name].scrollTop = 0;

      // retrigger fade-in
      pages[name].querySelectorAll('.fade').forEach(el => {
        el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
      });

      current = name;
      document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === name));
      updateProgress(pageOrder.indexOf(name));

      if (document.getElementById('sidebar').classList.contains('open')) toggleSB();
    }
    document.querySelectorAll('[data-page]').forEach(el =>
      el.addEventListener('click', () => goTo(el.dataset.page))
    );

    /* ═════════ Typed role ═════════ */
    const roles = [
      "ML & Scientific Computing Researcher",
      "Data Scientist @ DIX Systems Labs",
      "SciML Intern @ AIMS Lab, IIITDM Kancheepuram",
      "AI for Science · AI for Health · Generative AI"
    ];
    const roleEl = document.getElementById('typedRole');
    let ri = 0, ci = 0, del = false;
    function type() {
      const c = roles[ri];
      if (!del) { roleEl.textContent = c.slice(0, ci + 1); ci++; if (ci === c.length) { del = true; setTimeout(type, 1900); return; } }
      else { roleEl.textContent = c.slice(0, ci - 1); ci--; if (ci === 0) { del = false; ri = (ri + 1) % roles.length; } }
      setTimeout(type, del ? 28 : 60);
    }
    type();

    /* ═════════ Tabs ═════════ */
    document.querySelectorAll('.exp-tab').forEach(t => t.addEventListener('click', () => {
      document.querySelectorAll('.exp-tab').forEach(x => x.classList.remove('on'));
      document.querySelectorAll('.exp-detail').forEach(x => x.classList.remove('on'));
      t.classList.add('on');
      document.getElementById(t.dataset.exp).classList.add('on');
    }));
    document.querySelectorAll('.etab').forEach(t => t.addEventListener('click', () => {
      document.querySelectorAll('.etab').forEach(x => x.classList.remove('on'));
      document.querySelectorAll('.etab-c').forEach(x => x.classList.remove('on'));
      t.classList.add('on');
      document.getElementById('etab-' + t.dataset.etab).classList.add('on');
    }));
    document.querySelectorAll('.rtab').forEach(t => t.addEventListener('click', () => {
      document.querySelectorAll('.rtab').forEach(x => x.classList.remove('on'));
      document.querySelectorAll('.rtab-c').forEach(x => x.classList.remove('on'));
      t.classList.add('on');
      document.getElementById(t.dataset.rtab).classList.add('on');
    }));

    /* ═════════ Sidebar mobile ═════════ */
    const hbg = document.getElementById('hbg'),
      sidebar = document.getElementById('sidebar'),
      ovl = document.getElementById('ovl');
    function toggleSB() { hbg.classList.toggle('open'); sidebar.classList.toggle('open'); ovl.classList.toggle('on'); }
    hbg.addEventListener('click', toggleSB);
    ovl.addEventListener('click', toggleSB);

    /* ═════════ TWEAKS ═════════ */
    const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
      "layout": "right",
      "accent": "gn",
      "bio": "rule",
      "tags": true,
      "hlStyle": "minimal",
      "hlTitle": "Recent Highlights"
    }/*EDITMODE-END*/;

    const tweaks = { ...TWEAK_DEFAULTS };

    const ACCENTS = {
      cy: 'oklch(0.78 0.13 200)',
      mg: 'oklch(0.72 0.16 350)',
      vt: 'oklch(0.7 0.14 290)',
      gn: 'oklch(0.78 0.16 155)'
    };

    function applyTweaks() {
      const split = document.getElementById('aboutSplit');
      const bio = document.getElementById('aboutBio');
      const tags = document.getElementById('focusTags');
      const stack = document.getElementById('hlStack');
      const title = document.getElementById('hlTitle');
      const titleInput = document.getElementById('twHlTitle');
      if (!split) return;

      // Layout
      split.classList.toggle('flip', tweaks.layout === 'left');

      // Accent
      document.documentElement.style.setProperty('--bio-accent', ACCENTS[tweaks.accent] || ACCENTS.cy);

      // Bio treatment
      bio.classList.remove('bio-plain', 'bio-quote');
      if (tweaks.bio === 'plain') bio.classList.add('bio-plain');
      if (tweaks.bio === 'quote') bio.classList.add('bio-quote');

      // Tags visibility
      tags.classList.toggle('hidden', !tweaks.tags);

      // Highlights style
      stack.classList.remove('hl-minimal', 'hl-numbered');
      if (tweaks.hlStyle === 'minimal') stack.classList.add('hl-minimal');
      if (tweaks.hlStyle === 'numbered') stack.classList.add('hl-numbered');

      // Highlights title
      title.textContent = tweaks.hlTitle || 'Recent Highlights';
      if (titleInput && titleInput.value !== tweaks.hlTitle) titleInput.value = tweaks.hlTitle;

      // Sync UI
      document.querySelectorAll('.tw-seg[data-tw]').forEach(seg => {
        const key = seg.dataset.tw;
        seg.querySelectorAll('button').forEach(b => {
          b.classList.toggle('on', b.dataset.v === tweaks[key]);
        });
      });
      document.querySelectorAll('.tw-swatches[data-tw]').forEach(seg => {
        const key = seg.dataset.tw;
        seg.querySelectorAll('.tw-sw').forEach(b => {
          b.classList.toggle('on', b.dataset.v === tweaks[key]);
        });
      });
      document.querySelectorAll('.tw-toggle[data-tw]').forEach(t => {
        t.classList.toggle('on', !!tweaks[t.dataset.tw]);
      });
    }

    function setTweak(key, value) {
      tweaks[key] = value;
      applyTweaks();
      try {
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
      } catch (_) { }
    }

    // Wire controls
    document.querySelectorAll('.tw-seg[data-tw]').forEach(seg => {
      const key = seg.dataset.tw;
      seg.querySelectorAll('button').forEach(b => {
        b.addEventListener('click', () => setTweak(key, b.dataset.v));
      });
    });
    document.querySelectorAll('.tw-swatches[data-tw]').forEach(seg => {
      const key = seg.dataset.tw;
      seg.querySelectorAll('.tw-sw').forEach(b => {
        b.addEventListener('click', () => setTweak(key, b.dataset.v));
      });
    });
    document.querySelectorAll('.tw-toggle[data-tw]').forEach(t => {
      const key = t.dataset.tw;
      const flip = () => setTweak(key, !tweaks[key]);
      t.addEventListener('click', flip);
      t.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
    });
    const twHlTitleInput = document.getElementById('twHlTitle');
    twHlTitleInput.addEventListener('input', e => setTweak('hlTitle', e.target.value));

    // Panel show/hide via host protocol
    const twPanel = document.getElementById('twPanel');
    const twClose = document.getElementById('twClose');
    function showTweaks() {
      twPanel.classList.add('on');
      // jump to about page so the user sees the effect
      if (typeof goTo === 'function' && current !== 'about') goTo('about');
    }
    function hideTweaks() {
      twPanel.classList.remove('on');
      try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (_) { }
    }
    window.addEventListener('message', e => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') showTweaks();
      if (d.type === '__deactivate_edit_mode') hideTweaks();
    });
    twClose.addEventListener('click', hideTweaks);

    // Drag the panel by header
    (function () {
      const hd = document.getElementById('twHd');
      let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0, set = false;
      hd.addEventListener('mousedown', e => {
        if (e.target.closest('.tw-hd-x')) return;
        dragging = true; sx = e.clientX; sy = e.clientY;
        const r = twPanel.getBoundingClientRect();
        ox = r.left; oy = r.top;
        e.preventDefault();
      });
      window.addEventListener('mousemove', e => {
        if (!dragging) return;
        const nx = ox + (e.clientX - sx), ny = oy + (e.clientY - sy);
        twPanel.style.left = nx + 'px';
        twPanel.style.top = ny + 'px';
        twPanel.style.right = 'auto';
        twPanel.style.bottom = 'auto';
        set = true;
      });
      window.addEventListener('mouseup', () => dragging = false);
    })();

    applyTweaks();
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (_) { }

    /* ═════════ Keyboard nav ═════════ */
    document.addEventListener('keydown', e => {
      const i = pageOrder.indexOf(current);
      if (e.key === 'ArrowRight' && i < pageOrder.length - 1) goTo(pageOrder[i + 1]);
      if (e.key === 'ArrowLeft' && i > 0) goTo(pageOrder[i - 1]);
    });
