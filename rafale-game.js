// rafale-game.js — Rafale jouable ZQSD / ESPACE / A (post-combustion)
// Config optionnelle : window.RAFALE_OPTS = { spawnFromPortal: true }
(function () {
    const cfg = window.RAFALE_OPTS || {};

    // ── Canvas fumée ──
    const cvs = document.createElement('canvas');
    cvs.style.cssText = 'position:fixed;inset:0;z-index:9;pointer-events:none;';
    document.body.appendChild(cvs);
    const ctx = cvs.getContext('2d');

    // ── Avion ──
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:fixed;z-index:10;pointer-events:none;width:120px;height:96px;';
    const img = document.createElement('img');
    img.src = 'Rafale.png';
    img.style.cssText = 'width:120px;display:block;filter:brightness(0) invert(1);opacity:0.80;transform-origin:center center;';
    wrap.appendChild(img);
    document.body.appendChild(wrap);

    // ── Hint ──
    const hint = document.createElement('div');
    hint.textContent = 'ZQSD · ESPACE tirer · A post-combustion';
    hint.style.cssText = 'position:fixed;bottom:1.4rem;right:1.5rem;font-size:0.63rem;font-family:Inter,sans-serif;text-transform:uppercase;letter-spacing:0.09em;color:rgba(255,255,255,0.42);z-index:20;pointer-events:none;transition:opacity 1.2s;';
    document.body.appendChild(hint);
    setTimeout(() => { hint.style.opacity = '0'; }, 5000);

    // ── HUD kills ──
    const hud = document.createElement('div');
    hud.style.cssText = `position:fixed;top:1.2rem;${cfg.spawnFromPortal ? 'left' : 'right'}:1.5rem;font-family:"Bebas Neue",sans-serif;font-size:1.6rem;letter-spacing:0.07em;color:rgba(255,255,255,0.85);z-index:50;pointer-events:none;opacity:0;transition:opacity 0.4s;`;
    document.body.appendChild(hud);

    // ── Taille ──
    let W, H;
    function resize() { W = cvs.width = innerWidth; H = cvs.height = innerHeight; }
    resize();
    addEventListener('resize', resize);

    // ── État ──
    const HALF_W = 60, HALF_H = 48;
    let px, py, vx, vy, angle;
    let portalCooldown = 0, portalNavigating = false;

    function initSpawn() {
        if (cfg.spawnFromPortal) {
            const pel = document.querySelector('.portal[data-href]');
            if (pel) {
                const r = pel.getBoundingClientRect();
                px = r.left + r.width / 2;
                py = r.top  + r.height / 2;
                angle = Math.atan2(H * 0.5 - py, W * 0.42 - px);
                vx = Math.cos(angle) * 5;
                vy = Math.sin(angle) * 5;
                portalCooldown = 150; // évite re-trigger immédiat
                return;
            }
        }
        px = W * 0.5; py = H * 0.55;
        vx = 0.4; vy = 0;
        angle = Math.PI;
    }
    initSpawn();

    // ── Physique ──
    const ACC_N = 0.30, ACC_AB = 1.0;
    const SPD_N = 6.5,  SPD_AB = 20;
    const FRICTION = 0.925;

    const keys = {};
    let ab = false;

    addEventListener('keydown', e => {
        const k = e.key.toLowerCase();
        if (['z','q','s','d'].includes(k)) { e.preventDefault(); keys[k] = true; }
        if (e.code === 'Space') { e.preventDefault(); fireMica(); }
        if (k === 'a') { e.preventDefault(); ab = true; }
    });
    addEventListener('keyup', e => {
        const k = e.key.toLowerCase();
        keys[k] = false;
        if (k === 'a') ab = false;
    });

    // ── Fumée ──
    const parts = [];
    function spawnSmoke() {
        const ra = angle + Math.PI;
        const pa = angle + Math.PI / 2;
        const rx = px + Math.cos(ra) * 44;
        const ry = py + Math.sin(ra) * 44;
        const perpX = Math.cos(pa), perpY = Math.sin(pa);
        const fcx = perpX * 4.6, fcy = perpY * 4.6;
        for (let s = -1; s <= 1; s += 2) {
            for (let i = 0; i < (ab ? 2 : 1); i++) {
                parts.push({
                    x: rx + fcx + perpX * 6 * s + (Math.random() - 0.5) * 2,
                    y: ry + fcy + perpY * 6 * s + (Math.random() - 0.5) * 2,
                    vx: Math.cos(ra) * (1.5 + Math.random() * 1.5),
                    vy: Math.sin(ra) * (1.5 + Math.random() * 1.5),
                    life: 1.0,
                    size: ab ? 5 + Math.random() * 4 : 2.5 + Math.random() * 1.5,
                    decay: ab ? 0.018 + Math.random() * 0.012 : 0.014 + Math.random() * 0.008,
                    ab,
                });
            }
        }
    }

    // ── MICA ──
    const MICA_W = 68, HALF_MW = 34, HALF_MH = 17;
    const missiles = [];
    let lastFire = 0;

    function fireMica() {
        const now = Date.now();
        if (now - lastFire < 650) return;
        lastFire = now;
        const pa = angle + Math.PI / 2;
        const perpX = Math.cos(pa), perpY = Math.sin(pa);
        const wX = px + Math.cos(angle) * 8;
        const wY = py + Math.sin(angle) * 8;
        const fcx = perpX * 4.6, fcy = perpY * 4.6;
        for (let s = -1; s <= 1; s += 2) {
            const el = document.createElement('div');
            el.style.cssText = 'position:fixed;z-index:11;pointer-events:none;';
            const mi = document.createElement('img');
            mi.src = 'mica.png';
            mi.style.cssText = `width:${MICA_W}px;display:block;filter:brightness(0) invert(1);opacity:0.9;transform-origin:center center;`;
            el.appendChild(mi); document.body.appendChild(el);
            missiles.push({ x: wX + fcx + perpX*34*s, y: wY + fcy + perpY*34*s,
                vx: Math.cos(angle)*13, vy: Math.sin(angle)*13,
                angle, life: 200, el, img: mi });
        }
    }

    // ── F35 ──
    const F35_W = 95, HALF_FW = 47, HALF_FH = 47;
    const f35s = [], expl = [];
    let kills = 0, f35Timer = 0;

    function spawnF35() {
        const side = Math.random()*4|0;
        let fx = 0, fy = 0;
        if      (side===0) { fx = Math.random()*W; fy = -70; }
        else if (side===1) { fx = W+70; fy = Math.random()*H; }
        else if (side===2) { fx = Math.random()*W; fy = H+70; }
        else               { fx = -70; fy = Math.random()*H; }
        const el = document.createElement('div');
        el.style.cssText = 'position:fixed;z-index:10;pointer-events:none;';
        const fi = document.createElement('img');
        fi.src = 'F35.png';
        fi.style.cssText = `width:${F35_W}px;display:block;filter:brightness(0) invert(1);opacity:0.70;transform-origin:center center;`;
        el.appendChild(fi); document.body.appendChild(el);
        f35s.push({ x: fx, y: fy, vx: 0, vy: 0, angle: -Math.PI/2, el, img: fi });
    }

    function explode(ex, ey) {
        for (let i = 0; i < 26; i++) {
            const a = Math.random()*Math.PI*2, spd = 2+Math.random()*7;
            expl.push({ x: ex, y: ey, vx: Math.cos(a)*spd, vy: Math.sin(a)*spd,
                life: 1.0, size: 4+Math.random()*10,
                decay: 0.022+Math.random()*0.02, g: 80+Math.random()*140|0 });
        }
    }

    // ── Portails ──
    const portalEls = Array.from(document.querySelectorAll('.portal[data-href]'));

    function updateGame() {
        // Spawn F35
        f35Timer++;
        if (f35Timer > 300 && f35s.length < 5) { f35Timer = 0; spawnF35(); }

        // Missiles
        for (let i = missiles.length-1; i >= 0; i--) {
            const m = missiles[i];
            m.x += m.vx; m.y += m.vy; m.life--;
            if (m.life<=0 || m.x<-120 || m.x>W+120 || m.y<-120 || m.y>H+120) {
                m.el.remove(); missiles.splice(i,1); continue;
            }
            m.el.style.left = (m.x - HALF_MW) + 'px';
            m.el.style.top  = (m.y - HALF_MH) + 'px';
            m.img.style.transform = `rotate(${m.angle * 180 / Math.PI}deg)`;

            for (let j = f35s.length-1; j >= 0; j--) {
                const f = f35s[j];
                const dx = m.x-f.x, dy = m.y-f.y;
                if (dx*dx+dy*dy < 45*45) {
                    explode(f.x, f.y);
                    f.el.remove(); f35s.splice(j,1);
                    m.el.remove(); missiles.splice(i,1);
                    kills++;
                    hud.textContent = kills + (kills>1 ? ' ABATTUS' : ' ABATTU');
                    hud.style.opacity = '1';
                    break;
                }
            }
        }

        // F35 IA
        for (const f of f35s) {
            const ta = Math.atan2(py-f.y, px-f.x);
            let diff = ta-f.angle;
            while (diff>Math.PI) diff-=2*Math.PI;
            while (diff<-Math.PI) diff+=2*Math.PI;
            f.angle += diff*0.03;
            f.vx += Math.cos(f.angle)*0.07; f.vy += Math.sin(f.angle)*0.07;
            const spd = Math.sqrt(f.vx*f.vx+f.vy*f.vy);
            if (spd>2.2) { f.vx=f.vx/spd*2.2; f.vy=f.vy/spd*2.2; }
            f.x += f.vx; f.y += f.vy;
            f.el.style.left = (f.x - HALF_FW) + 'px';
            f.el.style.top  = (f.y - HALF_FH) + 'px';
            f.img.style.transform = `rotate(${(f.angle + Math.PI/2) * 180 / Math.PI}deg)`;
        }

        // Explosions
        for (let i = expl.length-1; i >= 0; i--) {
            const e = expl[i];
            e.x+=e.vx; e.y+=e.vy; e.life-=e.decay; e.size+=0.35;
            if (e.life<=0) { expl.splice(i,1); continue; }
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.size, 0, Math.PI*2);
            ctx.fillStyle = `rgba(255,${e.g},0,${e.life*0.85})`;
            ctx.fill();
        }

        // Portails
        if (!portalNavigating) {
            if (portalCooldown > 0) { portalCooldown--; }
            else {
                for (const pel of portalEls) {
                    const r = pel.getBoundingClientRect();
                    const cx = r.left + r.width / 2;
                    const cy = r.top  + r.height / 2;
                    const rad = r.width * 0.65;
                    const dx = px - cx, dy = py - cy;
                    if (dx*dx + dy*dy < rad*rad) {
                        portalNavigating = true;
                        const flash = document.createElement('div');
                        flash.style.cssText = 'position:fixed;inset:0;background:#fff;opacity:0;z-index:9999;transition:opacity 0.25s ease;pointer-events:none;';
                        document.body.appendChild(flash);
                        requestAnimationFrame(() => { flash.style.opacity = '1'; });
                        setTimeout(() => { window.location.href = pel.dataset.href; }, 280);
                        break;
                    }
                }
            }
        }
    }

    let frame = 0;

    function tick() {
        const acc    = ab ? ACC_AB : ACC_N;
        const maxSpd = ab ? SPD_AB : SPD_N;

        if (keys['z']) vy -= acc;
        if (keys['s']) vy += acc;
        if (keys['q']) vx -= acc;
        if (keys['d']) vx += acc;

        const spd = Math.sqrt(vx*vx + vy*vy);
        if (spd > maxSpd) { vx = vx/spd*maxSpd; vy = vy/spd*maxSpd; }

        vx *= FRICTION; vy *= FRICTION;
        px += vx; py += vy;

        if (px < -HALF_W) px = W + HALF_W;
        else if (px > W + HALF_W) px = -HALF_W;
        if (py < -HALF_H) py = H + HALF_H;

        const sf = ab ? 60 : 18;
        const scrollZone = H * 0.85;
        if (py > scrollZone) {
            window.scrollBy({ top: sf, behavior: 'instant' });
            if (py > H * 0.95) py = H * 0.95;
        }
        const scrollUpZone = H * 0.15;
        if (py < scrollUpZone) {
            window.scrollBy({ top: -sf, behavior: 'instant' });
            if (py < 0) py = 0;
        }

        const curSpd = Math.sqrt(vx*vx + vy*vy);
        if (curSpd > 0.25) {
            const target = Math.atan2(vy, vx);
            let diff = target - angle;
            while (diff >  Math.PI) diff -= 2*Math.PI;
            while (diff < -Math.PI) diff += 2*Math.PI;
            angle += diff * 0.12;
        }

        wrap.style.left = (px - HALF_W) + 'px';
        wrap.style.top  = (py - HALF_H) + 'px';
        img.style.transform = `rotate(${(angle - Math.PI) * 180 / Math.PI}deg)`;

        frame++;
        if (curSpd > 0.4 && frame % (ab ? 1 : 2) === 0) spawnSmoke();

        ctx.clearRect(0, 0, W, H);
        for (let i = parts.length-1; i >= 0; i--) {
            const p = parts[i];
            p.x += p.vx; p.y += p.vy;
            p.vx *= 0.97; p.vy *= 0.97;
            p.life -= p.decay;
            p.size += p.ab ? 0.6 : 0.32;
            if (p.life <= 0) { parts.splice(i, 1); continue; }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.fillStyle = p.ab
                ? `rgba(255,${80 + Math.floor(p.life * 80)},0,${p.life * 0.6})`
                : `rgba(255,255,255,${p.life * 0.28})`;
            ctx.fill();
        }
        updateGame();
        requestAnimationFrame(tick);
    }
    tick();
})();
