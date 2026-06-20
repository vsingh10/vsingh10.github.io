/* ════════════════════════════════════════════════════════════
   ILLUSTRATIONS — Hand-crafted SVG vector art per page.
   Technical / blueprint diagrams: neural nets, lattices,
   field plots, orbital paths, fourier grids, signal radar.
   Each function returns an SVG string.
   ═══════════════════════════════════════════════════════════ */

const ILLUS = {
  /* HERO — Neural network with input → hidden → output, plus moving signal */
  hero: () => `
<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" class="illus-svg">
  <defs>
    <radialGradient id="hGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="var(--cy)" stop-opacity=".18"/>
      <stop offset="100%" stop-color="var(--cy)" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hLine" x1="0" x2="1">
      <stop offset="0%" stop-color="var(--cy)" stop-opacity=".05"/>
      <stop offset="50%" stop-color="var(--cy)" stop-opacity=".55"/>
      <stop offset="100%" stop-color="var(--mg)" stop-opacity=".05"/>
    </linearGradient>
  </defs>

  <!-- Outer hex frame -->
  <circle cx="240" cy="240" r="225" fill="url(#hGlow)"/>
  <polygon points="240,30 415,140 415,340 240,450 65,340 65,140"
    fill="none" stroke="var(--cy)" stroke-opacity=".18" stroke-width="1"/>
  <polygon points="240,60 390,150 390,330 240,420 90,330 90,150"
    fill="none" stroke="var(--cy)" stroke-opacity=".1" stroke-width="1" stroke-dasharray="3 4"/>

  <!-- Concentric rings -->
  <circle cx="240" cy="240" r="190" fill="none" stroke="var(--cy)" stroke-opacity=".08"/>
  <circle cx="240" cy="240" r="155" fill="none" stroke="var(--mg)" stroke-opacity=".08"/>

  <!-- Crosshair ticks -->
  ${[0,90,180,270].map(a=>{const r1=215,r2=230;const rad=a*Math.PI/180;
    return `<line x1="${240+Math.cos(rad)*r1}" y1="${240+Math.sin(rad)*r1}" x2="${240+Math.cos(rad)*r2}" y2="${240+Math.sin(rad)*r2}" stroke="var(--cy)" stroke-opacity=".4" stroke-width="1.5"/>`;
  }).join('')}

  <!-- Neural net layers: 4 → 5 → 5 → 3 -->
  <g id="hNN">
    <!-- connections drawn first (behind nodes) -->
    ${(()=>{
      const layers=[
        [{x:120,y:170},{x:120,y:215},{x:120,y:265},{x:120,y:310}],
        [{x:200,y:155},{x:200,y:200},{x:200,y:240},{x:200,y:280},{x:200,y:325}],
        [{x:280,y:155},{x:280,y:200},{x:280,y:240},{x:280,y:280},{x:280,y:325}],
        [{x:360,y:200},{x:360,y:240},{x:360,y:280}]
      ];
      let lines='';
      for(let i=0;i<layers.length-1;i++){
        layers[i].forEach(a=>layers[i+1].forEach(b=>{
          lines+=`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="var(--cy)" stroke-opacity=".14" stroke-width=".8"/>`;
        }));
      }
      return lines;
    })()}
    <!-- nodes -->
    ${[
      [120,170],[120,215],[120,265],[120,310],
      [200,155],[200,200],[200,240],[200,280],[200,325],
      [280,155],[280,200],[280,240],[280,280],[280,325],
      [360,200],[360,240],[360,280]
    ].map(([x,y],i)=>`
      <circle cx="${x}" cy="${y}" r="6" fill="var(--bg)" stroke="var(--cy)" stroke-width="1.4"/>
      <circle cx="${x}" cy="${y}" r="2" fill="var(--cy)">
        <animate attributeName="opacity" values="1;.2;1" dur="${2.5+i%4*.4}s" begin="${i*.07}s" repeatCount="indefinite"/>
      </circle>`).join('')}
  </g>

  <!-- Animated signal traveling through path -->
  <path d="M 80,240 Q 160,180 240,240 T 400,240" fill="none" stroke="url(#hLine)" stroke-width="1.2" stroke-dasharray="4 6">
    <animate attributeName="stroke-dashoffset" values="0;-100" dur="4s" repeatCount="indefinite"/>
  </path>

  <!-- Corner labels -->
  <text x="80" y="120" fill="var(--cy)" opacity=".5" font-family="var(--mono)" font-size="9" letter-spacing="1.5">INPUT</text>
  <text x="380" y="120" fill="var(--mg)" opacity=".5" font-family="var(--mono)" font-size="9" letter-spacing="1.5">OUTPUT</text>
  <text x="80" y="380" fill="var(--cy)" opacity=".4" font-family="var(--mono)" font-size="9" letter-spacing="1.5">x ∈ ℝⁿ</text>
  <text x="340" y="380" fill="var(--mg)" opacity=".4" font-family="var(--mono)" font-size="9" letter-spacing="1.5">f(x;θ)</text>
</svg>`,

  /* ABOUT — Lattice / auxetic metamaterial cell */
  about: () => `
<svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" class="illus-svg">
  <defs>
    <pattern id="aGrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 L 0 20" fill="none" stroke="var(--cy)" stroke-opacity=".05" stroke-width=".5"/>
    </pattern>
  </defs>
  <rect width="420" height="420" fill="url(#aGrid)"/>
  <!-- Frame -->
  <rect x="40" y="40" width="340" height="340" fill="none" stroke="var(--cy)" stroke-opacity=".18"/>
  <!-- Corner brackets -->
  ${[[40,40,1,1],[380,40,-1,1],[40,380,1,-1],[380,380,-1,-1]].map(([x,y,sx,sy])=>`
    <path d="M ${x} ${y+12*sy} L ${x} ${y} L ${x+12*sx} ${y}" fill="none" stroke="var(--cy)" stroke-width="1.5"/>
  `).join('')}

  <!-- Auxetic re-entrant lattice (3x3) -->
  ${(()=>{
    let cells='';
    const cellW=90,cellH=90,startX=75,startY=75;
    for(let r=0;r<3;r++)for(let c=0;c<3;c++){
      const x=startX+c*cellW,y=startY+r*cellH;
      const phase=(r+c)%2;
      // re-entrant honeycomb shape
      cells+=`<g opacity=".85">
        <path d="M ${x+15} ${y} L ${x+45} ${y+18} L ${x+75} ${y} 
                 M ${x+15} ${y} L ${x+15} ${y+45} L ${x+45} ${y+27}
                 M ${x+75} ${y} L ${x+75} ${y+45} L ${x+45} ${y+27}
                 M ${x+15} ${y+45} L ${x+45} ${y+63} L ${x+75} ${y+45}
                 M ${x+15} ${y+45} L ${x+15} ${y+90} L ${x+45} ${y+72}
                 M ${x+75} ${y+45} L ${x+75} ${y+90} L ${x+45} ${y+72}"
          fill="none" stroke="var(${phase?'--mg':'--cy'})" stroke-opacity=".55" stroke-width="1.2" stroke-linejoin="round"/>
        <circle cx="${x+45}" cy="${y+18}" r="2" fill="var(--cy)" opacity=".7"/>
        <circle cx="${x+45}" cy="${y+27}" r="1.5" fill="var(--mg)" opacity=".6"/>
        <circle cx="${x+45}" cy="${y+63}" r="2" fill="var(--cy)" opacity=".7"/>
        <circle cx="${x+45}" cy="${y+72}" r="1.5" fill="var(--mg)" opacity=".6"/>
      </g>`;
    }
    return cells;
  })()}

  <!-- Stress arrows -->
  <g stroke="var(--mg)" stroke-opacity=".5" fill="var(--mg)" fill-opacity=".5" stroke-width="1.2">
    <line x1="20" y1="210" x2="38" y2="210"/>
    <polygon points="38,210 32,206 32,214"/>
    <line x1="402" y1="210" x2="384" y2="210"/>
    <polygon points="384,210 390,206 390,214"/>
  </g>

  <!-- Labels -->
  <text x="40" y="30" fill="var(--cy)" opacity=".55" font-family="var(--mono)" font-size="9" letter-spacing="1.5">RE-ENTRANT LATTICE</text>
  <text x="280" y="400" fill="var(--mg)" opacity=".4" font-family="var(--mono)" font-size="8" letter-spacing="1.5">ν &lt; 0</text>
  <text x="40" y="400" fill="var(--cy)" opacity=".4" font-family="var(--mono)" font-size="8" letter-spacing="1.5">UNIT CELL · 3×3</text>
</svg>`,

  /* ABOUT (companion) — PINN field plot: PDE residual contours + tiny NN */
  aboutPinn: () => `
<svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" class="illus-svg">
  <defs>
    <pattern id="apGrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 L 0 20" fill="none" stroke="var(--cy)" stroke-opacity=".05" stroke-width=".5"/>
    </pattern>
    <radialGradient id="apHot" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="var(--mg)" stop-opacity=".55"/>
      <stop offset="60%" stop-color="var(--mg)" stop-opacity=".08"/>
      <stop offset="100%" stop-color="var(--mg)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="apCool" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="var(--cy)" stop-opacity=".5"/>
      <stop offset="60%" stop-color="var(--cy)" stop-opacity=".06"/>
      <stop offset="100%" stop-color="var(--cy)" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="420" height="420" fill="url(#apGrid)"/>

  <!-- Frame + corner brackets -->
  <rect x="40" y="40" width="340" height="340" fill="none" stroke="var(--cy)" stroke-opacity=".18"/>
  ${[[40,40,1,1],[380,40,-1,1],[40,380,1,-1],[380,380,-1,-1]].map(([x,y,sx,sy])=>`
    <path d="M ${x} ${y+12*sy} L ${x} ${y} L ${x+12*sx} ${y}" fill="none" stroke="var(--cy)" stroke-width="1.5"/>
  `).join('')}

  <!-- Axes (x, t) -->
  <g stroke="var(--tx2)" stroke-opacity=".35" stroke-width="1">
    <line x1="70" y1="320" x2="350" y2="320"/>
    <line x1="70" y1="320" x2="70" y2="80"/>
  </g>
  <text x="346" y="335" fill="var(--tx2)" opacity=".6" font-family="var(--mono)" font-size="9">x</text>
  <text x="56"  y="84"  fill="var(--tx2)" opacity=".6" font-family="var(--mono)" font-size="9">t</text>

  <!-- Solution field u(x,t): hot blob + cool blob (Burgers-like shock) -->
  <ellipse cx="160" cy="180" rx="78" ry="55" fill="url(#apHot)"/>
  <ellipse cx="265" cy="245" rx="70" ry="50" fill="url(#apCool)"/>

  <!-- Iso-contours (level sets) -->
  <g fill="none" stroke-width="1" stroke-linecap="round">
    ${[
      [160,180,42,30,'cy',0.55],
      [160,180,62,42,'cy',0.30],
      [160,180,82,55,'cy',0.15],
      [265,245,32,22,'mg',0.55],
      [265,245,50,34,'mg',0.32],
      [265,245,68,46,'mg',0.18],
    ].map(([cx,cy,rx,ry,c,o])=>`
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" stroke="var(--${c})" stroke-opacity="${o}"/>
    `).join('')}
  </g>

  <!-- Shock / characteristic line -->
  <path d="M 95 110 Q 200 200 340 305" fill="none" stroke="var(--mg)" stroke-opacity=".55" stroke-width="1.4" stroke-dasharray="4 3"/>

  <!-- Collocation sample points -->
  <g fill="var(--cy)">
    ${(()=>{
      const pts = [
        [105,295],[130,265],[155,235],[185,215],[215,200],
        [145,140],[180,165],[210,150],[245,180],[280,165],
        [120,200],[175,255],[230,220],[260,290],[300,260],
        [310,200],[200,290],[150,300],[290,130],[330,235]
      ];
      return pts.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6" opacity=".75"/>`).join('');
    })()}
  </g>

  <!-- Boundary points (top/bottom edges) -->
  <g fill="var(--mg)" opacity=".7">
    ${[80,110,140,170,200,230,260,290,320,340].map(x=>`
      <rect x="${x-1.5}" y="318" width="3" height="3"/>
      <rect x="${x-1.5}" y="79"  width="3" height="3"/>
    `).join('')}
  </g>

  <!-- Mini neural net (PINN) inset -->
  <g transform="translate(56,52)">
    <rect x="-4" y="-6" width="100" height="44" rx="4" fill="var(--bg2)" stroke="var(--cy)" stroke-opacity=".35"/>
    ${(()=>{
      const layers = [[8,16,24],[8,8,16,24,32],[8,8,16,24,32],[16,24]];
      // simpler: 3 layers with 2,4,4,2 nodes
      const cols = [
        [{x:6,y:14},{x:6,y:24}],
        [{x:32,y:6},{x:32,y:16},{x:32,y:26},{x:32,y:34}],
        [{x:60,y:6},{x:60,y:16},{x:60,y:26},{x:60,y:34}],
        [{x:86,y:14},{x:86,y:24}],
      ];
      let s = '';
      for (let i=0;i<cols.length-1;i++){
        for (const a of cols[i]) for (const b of cols[i+1]){
          s += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="var(--cy)" stroke-opacity=".18" stroke-width=".5"/>`;
        }
      }
      for (let i=0;i<cols.length;i++){
        for (const n of cols[i]) s += `<circle cx="${n.x}" cy="${n.y}" r="2" fill="var(--cy)" opacity=".75"/>`;
      }
      return s;
    })()}
  </g>
  <text x="56" y="46" fill="var(--cy)" opacity=".55" font-family="var(--mono)" font-size="7" letter-spacing="1">NN(x,t;θ)</text>

  <!-- Loss equation -->
  <g font-family="var(--mono)" font-size="9" letter-spacing=".5">
    <text x="180" y="62" fill="var(--cy)" opacity=".7">ℒ = ‖∂ₜu + N[u]‖² + λ‖u−u_b‖²</text>
  </g>

  <!-- Labels -->
  <text x="40" y="30" fill="var(--cy)" opacity=".55" font-family="var(--mono)" font-size="9" letter-spacing="1.5">PHYSICS-INFORMED NN</text>
  <text x="40"  y="400" fill="var(--cy)" opacity=".4" font-family="var(--mono)" font-size="8" letter-spacing="1.5">RESIDUAL · PDE</text>
  <text x="280" y="400" fill="var(--mg)" opacity=".4" font-family="var(--mono)" font-size="8" letter-spacing="1.5">∇²u → 0</text>
</svg>`,

  /* EDUCATION — Molecule / orbital with knowledge nodes */
  education: () => `
<svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" class="illus-svg">
  <defs>
    <radialGradient id="eCore" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="var(--cy)" stop-opacity=".4"/>
      <stop offset="100%" stop-color="var(--cy)" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Outer dashed frame -->
  <rect x="20" y="20" width="380" height="380" fill="none" stroke="var(--cy)" stroke-opacity=".1" stroke-dasharray="2 6"/>

  <!-- Tilted orbital ellipses -->
  <g transform="translate(210,210)">
    <ellipse cx="0" cy="0" rx="170" ry="60" fill="none" stroke="var(--cy)" stroke-opacity=".22" transform="rotate(0)"/>
    <ellipse cx="0" cy="0" rx="170" ry="60" fill="none" stroke="var(--mg)" stroke-opacity=".22" transform="rotate(60)"/>
    <ellipse cx="0" cy="0" rx="170" ry="60" fill="none" stroke="var(--cy)" stroke-opacity=".22" transform="rotate(120)"/>

    <!-- Orbiting electrons -->
    <g>
      <circle cx="170" cy="0" r="6" fill="var(--cy)">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="9s" repeatCount="indefinite"/>
      </circle>
    </g>
    <g transform="rotate(60)">
      <circle cx="170" cy="0" r="5" fill="var(--mg)">
        <animateTransform attributeName="transform" type="rotate" from="60" to="420" dur="11s" repeatCount="indefinite"/>
      </circle>
    </g>
    <g transform="rotate(120)">
      <circle cx="170" cy="0" r="5" fill="var(--cy)" opacity=".7">
        <animateTransform attributeName="transform" type="rotate" from="120" to="480" dur="13s" repeatCount="indefinite"/>
      </circle>
    </g>

    <!-- Nucleus -->
    <circle r="38" fill="url(#eCore)"/>
    <circle r="14" fill="none" stroke="var(--cy)" stroke-width="1.5"/>
    <circle r="6" fill="var(--cy)"/>
  </g>

  <!-- Outer corner ticks -->
  ${[[20,20],[400,20],[20,400],[400,400]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="none" stroke="var(--cy)" stroke-opacity=".5"/>`).join('')}

  <!-- Labels -->
  <text x="20" y="14" fill="var(--cy)" opacity=".5" font-family="var(--mono)" font-size="9" letter-spacing="1.5">KNOWLEDGE.MODEL</text>
</svg>`,

  /* EXPERIENCE — Timeline / orbit of missions */
  experience: () => `
<svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" class="illus-svg">
  <!-- Concentric mission rings -->
  <g transform="translate(210,210)">
    ${[60,100,140,180].map((r,i)=>`
      <circle r="${r}" fill="none" stroke="var(--mg)" stroke-opacity="${.3-i*.05}" stroke-dasharray="${i%2?'2 6':'4 2'}"/>
    `).join('')}

    <!-- Orbital satellites -->
    ${[
      {r:60,a:30,c:'cy',s:6},{r:100,a:120,c:'mg',s:5},
      {r:140,a:200,c:'cy',s:6},{r:180,a:280,c:'mg',s:7}
    ].map((d,i)=>{
      const x=Math.cos(d.a*Math.PI/180)*d.r,y=Math.sin(d.a*Math.PI/180)*d.r;
      return `<g>
        <line x1="0" y1="0" x2="${x}" y2="${y}" stroke="var(--${d.c})" stroke-opacity=".15" stroke-width=".8"/>
        <rect x="${x-d.s}" y="${y-d.s}" width="${d.s*2}" height="${d.s*2}" fill="var(--bg)" stroke="var(--${d.c})" stroke-width="1.4" transform="rotate(45 ${x} ${y})"/>
        <circle cx="${x}" cy="${y}" r="1.5" fill="var(--${d.c})"/>
      </g>`;
    }).join('')}

    <!-- Center hub -->
    <circle r="22" fill="var(--bg)" stroke="var(--mg)" stroke-width="1.5"/>
    <circle r="8" fill="var(--mg)"/>
    <text x="0" y="3" text-anchor="middle" fill="var(--bg)" font-family="var(--mono)" font-size="6" font-weight="700">VS</text>

    <!-- Sweep arc -->
    <path d="M 0,-180 A 180,180 0 0,1 156,90" fill="none" stroke="var(--mg)" stroke-opacity=".5" stroke-width="1.4"/>
  </g>

  <!-- Frame -->
  <rect x="15" y="15" width="390" height="390" fill="none" stroke="var(--cy)" stroke-opacity=".08"/>
  <text x="20" y="10" fill="var(--mg)" opacity=".55" font-family="var(--mono)" font-size="9" letter-spacing="1.5">MISSION TIMELINE</text>
  <text x="320" y="415" fill="var(--cy)" opacity=".4" font-family="var(--mono)" font-size="8" letter-spacing="1.5">06 ENTRIES</text>
</svg>`,

  /* PROJECTS — Isometric grid of cubes */
  projects: () => `
<svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" class="illus-svg">
  <defs>
    <linearGradient id="pCube" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="var(--cy)" stop-opacity=".4"/>
      <stop offset="100%" stop-color="var(--cy)" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Iso grid floor -->
  <g stroke="var(--cy)" stroke-opacity=".08" stroke-width="1">
    ${(()=>{let l='';for(let i=-6;i<=6;i++){
      l+=`<line x1="${210+i*30}" y1="${210-i*15-90}" x2="${210+i*30+180}" y2="${210-i*15+0}"/>`;
      l+=`<line x1="${210+i*30}" y1="${210+i*15-90}" x2="${210+i*30-180}" y2="${210+i*15+0}"/>`;
    }return l;})()}
  </g>

  <!-- Iso cubes -->
  ${(()=>{
    const cubes=[
      {x:0,y:0,h:60,c:'cy'},
      {x:60,y:30,h:90,c:'mg'},
      {x:-60,y:30,h:45,c:'cy'},
      {x:120,y:0,h:30,c:'cy'},
      {x:0,y:60,h:75,c:'mg'},
      {x:-120,y:0,h:50,c:'cy'},
      {x:60,y:-30,h:40,c:'cy'},
      {x:-60,y:-30,h:65,c:'mg'},
    ];
    cubes.sort((a,b)=>(a.y-a.x)-(b.y-b.x));
    return cubes.map(c=>{
      const cx=210+c.x,cy=240+c.y;
      const top=`${cx},${cy-c.h} ${cx+30},${cy-c.h-15} ${cx+60},${cy-c.h} ${cx+30},${cy-c.h+15}`;
      const left=`${cx},${cy-c.h} ${cx},${cy} ${cx+30},${cy+15} ${cx+30},${cy-c.h+15}`;
      const right=`${cx+60},${cy-c.h} ${cx+60},${cy} ${cx+30},${cy+15} ${cx+30},${cy-c.h+15}`;
      return `<g>
        <polygon points="${top}" fill="var(--bg2)" stroke="var(--${c.c})" stroke-width="1.2"/>
        <polygon points="${left}" fill="var(--bg)" stroke="var(--${c.c})" stroke-width="1" opacity=".75"/>
        <polygon points="${right}" fill="var(--bg2)" stroke="var(--${c.c})" stroke-width="1" opacity=".55"/>
      </g>`;
    }).join('');
  })()}

  <text x="20" y="20" fill="var(--cy)" opacity=".55" font-family="var(--mono)" font-size="9" letter-spacing="1.5">DEPLOYED.STACK</text>
  <text x="20" y="405" fill="var(--mg)" opacity=".4" font-family="var(--mono)" font-size="8" letter-spacing="1.5">/ PROJECTS · ITERATING</text>
</svg>`,

  /* RESEARCH — Field plot / contour map */
  research: () => `
<svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" class="illus-svg">
  <defs>
    <radialGradient id="rField" cx="35%" cy="40%" r="60%">
      <stop offset="0%" stop-color="var(--cy)" stop-opacity=".18"/>
      <stop offset="100%" stop-color="var(--cy)" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect x="30" y="30" width="360" height="360" fill="none" stroke="var(--cy)" stroke-opacity=".15"/>
  <rect x="30" y="30" width="360" height="360" fill="url(#rField)"/>

  <!-- Contour lines (concentric distorted ellipses) -->
  <g fill="none" stroke="var(--cy)" stroke-width="1">
    ${[40,70,100,130,160,190].map((r,i)=>`
      <ellipse cx="${160+i*4}" cy="${180-i*3}" rx="${r}" ry="${r*.75}" stroke-opacity="${.5-i*.06}" transform="rotate(${-15+i*3} ${160+i*4} ${180-i*3})"/>
    `).join('')}
  </g>
  <g fill="none" stroke="var(--mg)" stroke-width="1">
    ${[30,55,80,110].map((r,i)=>`
      <ellipse cx="${290}" cy="${300}" rx="${r}" ry="${r*.6}" stroke-opacity="${.45-i*.08}" transform="rotate(${30+i*5} 290 300)"/>
    `).join('')}
  </g>

  <!-- Vector field arrows -->
  ${(()=>{let g='';for(let r=0;r<8;r++)for(let c=0;c<8;c++){
    const x=50+c*42,y=50+r*42;
    const dx=Math.sin((r+c)*.5)*8,dy=Math.cos((r-c)*.5)*8;
    g+=`<line x1="${x}" y1="${y}" x2="${x+dx}" y2="${y+dy}" stroke="var(--cy)" stroke-opacity=".25" stroke-width=".7"/>
        <circle cx="${x+dx}" cy="${y+dy}" r="1" fill="var(--cy)" opacity=".4"/>`;
  }return g;})()}

  <!-- Sample points -->
  ${[[160,180],[290,300],[100,310],[330,120]].map(([x,y],i)=>`
    <circle cx="${x}" cy="${y}" r="4" fill="var(--bg)" stroke="var(--mg)" stroke-width="1.4"/>
    <circle cx="${x}" cy="${y}" r="1.5" fill="var(--mg)"/>
  `).join('')}

  <text x="34" y="22" fill="var(--cy)" opacity=".55" font-family="var(--mono)" font-size="9" letter-spacing="1.5">∂Ω · BOUNDARY</text>
  <text x="240" y="408" fill="var(--mg)" opacity=".4" font-family="var(--mono)" font-size="8" letter-spacing="1.5">u(x,t) — FIELD SOLUTION</text>
</svg>`,

  /* ACHIEVEMENTS — Trophy constellation */
  achievements: () => `
<svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" class="illus-svg">
  <!-- Background grid dots -->
  <g fill="var(--cy)" fill-opacity=".1">
    ${(()=>{let d='';for(let r=0;r<10;r++)for(let c=0;c<10;c++){
      d+=`<circle cx="${30+c*40}" cy="${30+r*40}" r="1"/>`;
    }return d;})()}
  </g>

  <!-- Constellation lines -->
  <g stroke="var(--cy)" stroke-opacity=".3" stroke-width="1" fill="none">
    <polyline points="80,120 150,80 230,140 290,90 350,150"/>
    <polyline points="150,80 180,200 230,140"/>
    <polyline points="180,200 100,260 60,330"/>
    <polyline points="180,200 260,290 340,310"/>
    <polyline points="290,90 340,310"/>
  </g>

  <!-- Stars (large 4-point stars) -->
  ${[
    [80,120,8,'cy'],[150,80,10,'mg'],[230,140,9,'cy'],
    [290,90,7,'cy'],[350,150,11,'mg'],[180,200,14,'cy'],
    [100,260,8,'mg'],[60,330,7,'cy'],[260,290,9,'cy'],
    [340,310,8,'mg']
  ].map(([x,y,r,c],i)=>`
    <g>
      <polygon points="${x},${y-r} ${x+r/3},${y-r/3} ${x+r},${y} ${x+r/3},${y+r/3} ${x},${y+r} ${x-r/3},${y+r/3} ${x-r},${y} ${x-r/3},${y-r/3}"
        fill="var(--${c})" opacity=".75"/>
      <circle cx="${x}" cy="${y}" r="${r*1.6}" fill="var(--${c})" opacity=".08"/>
      <circle cx="${x}" cy="${y}" r="${r*.4}" fill="#fff" opacity=".7"/>
    </g>
  `).join('')}

  <!-- Frame -->
  <rect x="20" y="20" width="380" height="380" fill="none" stroke="var(--cy)" stroke-opacity=".1"/>
  <text x="22" y="14" fill="var(--cy)" opacity=".55" font-family="var(--mono)" font-size="9" letter-spacing="1.5">CONSTELLATION.MAP</text>
</svg>`,

  /* CERTIFICATIONS — Stamped seal / verified pattern */
  certifications: () => `
<svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" class="illus-svg">
  <g transform="translate(210,210)">
    <!-- outer rotating dashed ring -->
    <circle r="180" fill="none" stroke="var(--cy)" stroke-opacity=".15" stroke-dasharray="3 5">
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite"/>
    </circle>
    <circle r="160" fill="none" stroke="var(--mg)" stroke-opacity=".15" stroke-dasharray="6 3">
      <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="80s" repeatCount="indefinite"/>
    </circle>

    <!-- tick marks around ring -->
    ${(()=>{let ticks='';for(let i=0;i<60;i++){
      const a=i*6*Math.PI/180,r1=140,r2=i%5===0?125:132;
      ticks+=`<line x1="${Math.cos(a)*r1}" y1="${Math.sin(a)*r1}" x2="${Math.cos(a)*r2}" y2="${Math.sin(a)*r2}" stroke="var(--cy)" stroke-opacity="${i%5===0?.6:.25}" stroke-width="${i%5===0?1.2:.6}"/>`;
    }return ticks;})()}

    <!-- inner hex -->
    <polygon points="0,-90 78,-45 78,45 0,90 -78,45 -78,-45" fill="none" stroke="var(--cy)" stroke-width="1.5"/>
    <polygon points="0,-70 60,-35 60,35 0,70 -60,35 -60,-35" fill="none" stroke="var(--mg)" stroke-width="1" stroke-opacity=".7"/>

    <!-- center checkmark -->
    <circle r="40" fill="var(--bg)" stroke="var(--cy)" stroke-width="1.5"/>
    <path d="M -16,0 L -5,12 L 18,-12" fill="none" stroke="var(--cy)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- corner crosses -->
    ${[0,90,180,270].map(a=>{const rad=a*Math.PI/180,r=110;const x=Math.cos(rad)*r,y=Math.sin(rad)*r;
      return `<g transform="translate(${x},${y})">
        <line x1="-5" y1="0" x2="5" y2="0" stroke="var(--mg)" stroke-width="1.5"/>
        <line x1="0" y1="-5" x2="0" y2="5" stroke="var(--mg)" stroke-width="1.5"/>
      </g>`;
    }).join('')}
  </g>

  <text x="40" y="30" fill="var(--cy)" opacity=".55" font-family="var(--mono)" font-size="9" letter-spacing="1.5">VERIFIED · SIGNED</text>
  <text x="280" y="400" fill="var(--mg)" opacity=".4" font-family="var(--mono)" font-size="8" letter-spacing="1.5">SHA · 0×3F2A</text>
</svg>`,

  /* CONTACT — Radar / signal */
  contact: () => `
<svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" class="illus-svg">
  <g transform="translate(210,210)">
    <!-- expanding pulses -->
    ${[0,1,2].map(i=>`
      <circle r="40" fill="none" stroke="var(--cy)" stroke-width="1">
        <animate attributeName="r" values="40;180" dur="3s" begin="${i}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".5;0" dur="3s" begin="${i}s" repeatCount="indefinite"/>
      </circle>
    `).join('')}

    <!-- static rings -->
    ${[40,80,120,160].map(r=>`<circle r="${r}" fill="none" stroke="var(--cy)" stroke-opacity=".12"/>`).join('')}

    <!-- crosshairs -->
    <line x1="-180" y1="0" x2="180" y2="0" stroke="var(--cy)" stroke-opacity=".15"/>
    <line x1="0" y1="-180" x2="0" y2="180" stroke="var(--cy)" stroke-opacity=".15"/>

    <!-- sweep -->
    <g>
      <path d="M 0,0 L 160,0 A 160,160 0 0,0 138,-80 Z" fill="var(--cy)" opacity=".12">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite"/>
      </path>
    </g>

    <!-- blips -->
    <circle cx="80" cy="-40" r="3" fill="var(--mg)"/>
    <circle cx="80" cy="-40" r="6" fill="var(--mg)" opacity=".3"/>
    <circle cx="-100" cy="60" r="3" fill="var(--cy)"/>
    <circle cx="-100" cy="60" r="6" fill="var(--cy)" opacity=".3"/>
    <circle cx="40" cy="120" r="3" fill="var(--mg)"/>

    <!-- center dot -->
    <circle r="6" fill="var(--cy)"/>
    <circle r="14" fill="none" stroke="var(--cy)" stroke-width="1.5"/>
  </g>

  <text x="30" y="30" fill="var(--cy)" opacity=".55" font-family="var(--mono)" font-size="9" letter-spacing="1.5">CHANNEL · OPEN</text>
  <text x="280" y="400" fill="var(--mg)" opacity=".4" font-family="var(--mono)" font-size="8" letter-spacing="1.5">LISTENING ON :443</text>
</svg>`
};

window.ILLUS = ILLUS;
