// sandbox-game.js — Rafale vs F-35, vagues progressives, vie, game over
(function () {

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
    hint.textContent = 'ZQSD · Entrée/Clic tirer · ESPACE post-combustion';
    hint.style.cssText = 'position:fixed;bottom:1.4rem;right:1.5rem;font-size:0.63rem;font-family:Inter,sans-serif;text-transform:uppercase;letter-spacing:0.09em;color:rgba(255,255,255,0.42);z-index:20;pointer-events:none;transition:opacity 1.2s;';
    document.body.appendChild(hint);
    setTimeout(() => { hint.style.opacity = '0'; }, 5000);

    // ── Taille ──
    let W, H;
    function resize() { W = cvs.width = innerWidth; H = cvs.height = innerHeight; }
    resize();
    addEventListener('resize', resize);

    // ── Physique ──
    const HALF_W = 60, HALF_H = 48;
    let px, py, vx, vy, angle;
    const ACC_N = 0.30, ACC_AB = 1.0;
    const SPD_N = 6.5, SPD_AB = 20;
    const FRICTION = 0.925;
    const keys = {};
    let ab = false;

    function initSpawn() {
        px = W * 0.5; py = H * 0.5;
        vx = 0.4; vy = 0; angle = 0;
        portalCooldown = 90;
    }

    addEventListener('keydown', e => {
        if (e.target instanceof Element && e.target.closest('a, button, input, select, textarea')) return;
        const k = e.key.toLowerCase();
        if (['z','q','s','d'].includes(k)) { e.preventDefault(); keys[k] = true; }
        if (e.code === 'Space') { e.preventDefault(); ab = true; }
        if (k === 'enter') { e.preventDefault(); if (gameState === 'fighting') fireMica(); }
    });
    addEventListener('keyup', e => {
        const k = e.key.toLowerCase();
        keys[k] = false;
        if (e.code === 'Space') ab = false;
    });
    addEventListener('mousedown', e => { if (e.button === 0 && gameState === 'fighting') fireMica(); });

    // ── Fumée ──
    const parts = [];
    function spawnSmoke() {
        const ra = angle + Math.PI, pa = angle + Math.PI / 2;
        const rx = px + Math.cos(ra) * 44, ry = py + Math.sin(ra) * 44;
        const perpX = Math.cos(pa), perpY = Math.sin(pa);
        const fcx = perpX * 4.6, fcy = perpY * 4.6;
        for (let s = -1; s <= 1; s += 2) {
            for (let i = 0; i < (ab ? 2 : 1); i++) {
                parts.push({
                    x: rx + fcx + perpX*6*s + (Math.random()-0.5)*2,
                    y: ry + fcy + perpY*6*s + (Math.random()-0.5)*2,
                    vx: Math.cos(ra)*(1.5+Math.random()*1.5),
                    vy: Math.sin(ra)*(1.5+Math.random()*1.5),
                    life: 1.0,
                    size: ab ? 5+Math.random()*4 : 2.5+Math.random()*1.5,
                    decay: ab ? 0.018+Math.random()*0.012 : 0.014+Math.random()*0.008,
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
        const wX = px + Math.cos(angle)*8, wY = py + Math.sin(angle)*8;
        const fcx = perpX*4.6, fcy = perpY*4.6;
        for (let s = -1; s <= 1; s += 2) {
            const el = document.createElement('div');
            el.style.cssText = 'position:fixed;z-index:11;pointer-events:none;';
            const mi = document.createElement('img');
            mi.src = 'mica.png';
            mi.style.cssText = `width:${MICA_W}px;display:block;filter:brightness(0) invert(1);opacity:0.9;transform-origin:center center;`;
            el.appendChild(mi); document.body.appendChild(el);
            missiles.push({ x: wX+fcx+perpX*34*s, y: wY+fcy+perpY*34*s,
                vx: Math.cos(angle)*13, vy: Math.sin(angle)*13,
                angle, life: 200, el, img: mi });
        }
    }

    // ── F35 ──
    const F35_W = 95, HALF_FW = 47, HALF_FH = 47;
    const f35s = [], expl = [];

    function f35MaxSpd(w) { return Math.min(1.8 + w * 0.3, 5.5); }
    function waveCount(w) { return 2 + (w - 1) * 2; } // 2,4,6,8…

    function spawnOneF35(w) {
        const side = Math.random()*4|0;
        let fx, fy;
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
        f35s.push({ x: fx, y: fy, vx: 0, vy: 0, angle: -Math.PI/2, el, img: fi, maxSpd: f35MaxSpd(w) });
    }

    function explode(ex, ey) {
        for (let i = 0; i < 26; i++) {
            const a = Math.random()*Math.PI*2, spd = 2+Math.random()*7;
            expl.push({ x: ex, y: ey, vx: Math.cos(a)*spd, vy: Math.sin(a)*spd,
                life: 1.0, size: 4+Math.random()*10,
                decay: 0.022+Math.random()*0.02, g: 80+Math.random()*140|0 });
        }
    }

    // ── Portail sortie ──
    const portalEls = Array.from(document.querySelectorAll('.portal[data-href]'));
    let portalCooldown = 90, portalNavigating = false;

    // ── HP ──
    let hp = 3;
    const MAX_HP = 3;
    let invincible = 0;

    // ── Wave state machine ──
    // 'start' → 'wave-intro' → 'fighting' → 'wave-clear' → 'wave-intro' → … | 'gameover'
    let gameState = 'start';
    let wave = 0, waveTotal = 0, waveSpawned = 0;
    let spawnTimer = 0, stateTimer = 0;
    let kills = 0;

    // ── Overlay vagues ──
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:500;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.7rem;pointer-events:none;transition:opacity 0.5s;opacity:0;';
    const ovTitle = document.createElement('div');
    ovTitle.style.cssText = "font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,9vw,6.5rem);letter-spacing:0.1em;color:rgba(255,255,255,0.95);";
    const ovSub = document.createElement('div');
    ovSub.style.cssText = 'font-size:0.8rem;text-transform:uppercase;letter-spacing:0.13em;color:rgba(255,255,255,0.42);';
    overlay.appendChild(ovTitle); overlay.appendChild(ovSub);
    document.body.appendChild(overlay);

    function showOverlay(title, sub) {
        ovTitle.textContent = title; ovSub.textContent = sub;
        overlay.style.opacity = '1';
    }
    function hideOverlay() { overlay.style.opacity = '0'; }

    // ── HUD ──
    const hud = document.createElement('div');
    hud.style.cssText = 'position:fixed;top:1.2rem;left:1.5rem;z-index:50;pointer-events:none;display:flex;flex-direction:column;gap:0.35rem;';
    document.body.appendChild(hud);
    const hudWave  = document.createElement('div');
    hudWave.style.cssText  = "font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:0.07em;color:rgba(255,255,255,0.85);";
    const hudKills = document.createElement('div');
    hudKills.style.cssText = "font-family:'Bebas Neue',sans-serif;font-size:0.95rem;letter-spacing:0.07em;color:rgba(255,255,255,0.50);";
    const hudHp = document.createElement('div');
    hudHp.style.cssText = 'display:flex;gap:0.35rem;margin-top:0.15rem;align-items:center;';
    hud.appendChild(hudWave); hud.appendChild(hudKills); hud.appendChild(hudHp);

    function updateHUD() {
        hudWave.textContent  = wave > 0 ? `VAGUE ${wave}` : '';
        hudKills.textContent = kills > 0 ? `${kills} ABATTU${kills > 1 ? 'S' : ''}` : '';
        hudHp.innerHTML = '';
        for (let i = 0; i < MAX_HP; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `width:13px;height:13px;border-radius:50%;background:${i < hp ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.12)'};border:1.5px solid rgba(255,255,255,0.45);transition:background 0.2s;`;
            hudHp.appendChild(dot);
        }
    }

    // ── Flash dégât ──
    const dmgFlash = document.createElement('div');
    dmgFlash.style.cssText = 'position:fixed;inset:0;z-index:400;background:rgba(200,30,30,0);pointer-events:none;transition:background 0.12s;';
    document.body.appendChild(dmgFlash);
    function flashDamage() {
        dmgFlash.style.background = 'rgba(200,30,30,0.4)';
        setTimeout(() => { dmgFlash.style.background = 'rgba(200,30,30,0)'; }, 160);
    }

    // ── Game Over ──
    const goScreen = document.createElement('div');
    goScreen.style.cssText = 'position:fixed;inset:0;z-index:600;display:none;flex-direction:column;align-items:center;justify-content:center;gap:1.4rem;background:rgba(6,9,15,0.88);backdrop-filter:blur(6px);';
    const goTitle = document.createElement('div');
    goTitle.textContent = 'GAME OVER';
    goTitle.style.cssText = "font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,8rem);letter-spacing:0.08em;color:rgba(255,255,255,0.95);";
    const goScore = document.createElement('div');
    goScore.style.cssText = 'font-size:0.85rem;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.42);';
    const goBtns = document.createElement('div');
    goBtns.style.cssText = 'display:flex;gap:1rem;margin-top:0.5rem;';

    function mkBtn(label, primary, onclick) {
        const b = document.createElement('button');
        b.textContent = label;
        b.style.cssText = `font-family:'Bebas Neue',sans-serif;font-size:1.1rem;letter-spacing:0.1em;padding:0.6rem 2.2rem;background:transparent;border:2px solid ${primary ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.25)'};color:${primary ? '#fff' : 'rgba(255,255,255,0.5)'};cursor:pointer;transition:border-color 0.2s,color 0.2s;`;
        b.onmouseenter = () => { b.style.borderColor='rgba(255,255,255,0.95)'; b.style.color='#fff'; };
        b.onmouseleave = () => { b.style.borderColor=primary?'rgba(255,255,255,0.75)':'rgba(255,255,255,0.25)'; b.style.color=primary?'#fff':'rgba(255,255,255,0.5)'; };
        b.onclick = onclick;
        return b;
    }

    goBtns.appendChild(mkBtn('REJOUER', true, resetGame));
    goBtns.appendChild(mkBtn('QUITTER', false, () => { window.location.href = 'index.html#sandbox'; }));
    goScreen.appendChild(goTitle); goScreen.appendChild(goScore); goScreen.appendChild(goBtns);
    document.body.appendChild(goScreen);

    function showGameOver() {
        goScore.textContent = `Vague ${wave}  ·  ${kills} F-35 abattu${kills > 1 ? 's' : ''}`;
        goScreen.style.display = 'flex';
        hideOverlay();
    }

    function clearEnemies() {
        for (const f of f35s) f.el.remove(); f35s.length = 0;
        for (const m of missiles) m.el.remove(); missiles.length = 0;
        parts.length = 0; expl.length = 0;
    }

    function resetGame() {
        clearEnemies();
        kills = 0; hp = MAX_HP; invincible = 0;
        wave = 0; waveTotal = 0; waveSpawned = 0;
        gameState = 'start'; stateTimer = 0; spawnTimer = 0;
        goScreen.style.display = 'none';
        initSpawn();
        updateHUD();
    }

    // ── Wave transitions ──
    function startWaveIntro() {
        wave++;
        waveTotal = waveCount(wave);
        waveSpawned = 0; spawnTimer = 0;
        gameState = 'wave-intro';
        stateTimer = 180; // 3s
        updateHUD();
        showOverlay(`VAGUE ${wave}`, `${waveTotal} ennemi${waveTotal > 1 ? 's' : ''}`);
    }

    function startFighting() {
        gameState = 'fighting';
        hideOverlay();
    }

    function waveClear() {
        gameState = 'wave-clear';
        stateTimer = 180; // 3s
        showOverlay('VAGUE TERMINÉE', `${kills} abattu${kills > 1 ? 's' : ''} au total`);
    }

    function triggerGameOver() {
        gameState = 'gameover';
        showGameOver();
    }

    // ── Init ──
    initSpawn();
    updateHUD();

    let frame = 0;

    function tick() {
        requestAnimationFrame(tick);

        // ── Mouvement Rafale ──
        if (gameState !== 'gameover') {
            const acc = ab ? ACC_AB : ACC_N;
            const maxSpd = ab ? SPD_AB : SPD_N;
            if (keys['z']) vy -= acc;
            if (keys['s']) vy += acc;
            if (keys['q']) vx -= acc;
            if (keys['d']) vx += acc;
            const spd = Math.sqrt(vx*vx + vy*vy);
            if (spd > maxSpd) { vx = vx/spd*maxSpd; vy = vy/spd*maxSpd; }
            vx *= FRICTION; vy *= FRICTION;
            px += vx; py += vy;
            if (px < -HALF_W) px = W+HALF_W; else if (px > W+HALF_W) px = -HALF_W;
            if (py < -HALF_H) py = H+HALF_H; else if (py > H+HALF_H) py = -HALF_H;

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
            // Clignotement invincibilité
            img.style.opacity = invincible > 0 ? (Math.floor(invincible/5) % 2 === 0 ? '0.25' : '0.80') : '0.80';
            img.style.transform = `rotate(${(angle - Math.PI) * 180 / Math.PI}deg)`;
            frame++;
            if (curSpd > 0.4 && frame % (ab ? 1 : 2) === 0) spawnSmoke();
        }

        // ── Rendu fumée & explosions ──
        ctx.clearRect(0, 0, W, H);
        for (let i = parts.length-1; i >= 0; i--) {
            const p = parts[i];
            p.x += p.vx; p.y += p.vy; p.vx *= 0.97; p.vy *= 0.97;
            p.life -= p.decay; p.size += p.ab ? 0.6 : 0.32;
            if (p.life <= 0) { parts.splice(i,1); continue; }
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.fillStyle = p.ab
                ? `rgba(255,${80+Math.floor(p.life*80)},0,${p.life*0.6})`
                : `rgba(255,255,255,${p.life*0.28})`;
            ctx.fill();
        }
        for (let i = expl.length-1; i >= 0; i--) {
            const e = expl[i];
            e.x+=e.vx; e.y+=e.vy; e.life-=e.decay; e.size+=0.35;
            if (e.life<=0) { expl.splice(i,1); continue; }
            ctx.beginPath(); ctx.arc(e.x, e.y, e.size, 0, Math.PI*2);
            ctx.fillStyle = `rgba(255,${e.g},0,${e.life*0.85})`;
            ctx.fill();
        }

        if (gameState === 'gameover') return;

        // ── Missiles ──
        for (let i = missiles.length-1; i >= 0; i--) {
            const m = missiles[i];
            m.x += m.vx; m.y += m.vy; m.life--;
            if (m.life<=0 || m.x<-120 || m.x>W+120 || m.y<-120 || m.y>H+120) {
                m.el.remove(); missiles.splice(i,1); continue;
            }
            m.el.style.left = (m.x - HALF_MW) + 'px';
            m.el.style.top  = (m.y - HALF_MH) + 'px';
            m.img.style.transform = `rotate(${m.angle * 180 / Math.PI}deg)`;
            let hit = false;
            for (let j = f35s.length-1; j >= 0; j--) {
                const f = f35s[j];
                const dx = m.x-f.x, dy = m.y-f.y;
                if (dx*dx+dy*dy < 45*45) {
                    explode(f.x, f.y); f.el.remove(); f35s.splice(j,1);
                    m.el.remove(); missiles.splice(i,1);
                    kills++; updateHUD(); hit = true; break;
                }
            }
            if (hit) continue;
        }

        // ── F35 IA ──
        for (const f of f35s) {
            const ta = Math.atan2(py-f.y, px-f.x);
            let diff = ta-f.angle;
            while (diff > Math.PI) diff -= 2*Math.PI;
            while (diff < -Math.PI) diff += 2*Math.PI;
            f.angle += diff*0.03;
            f.vx += Math.cos(f.angle)*0.07; f.vy += Math.sin(f.angle)*0.07;
            const s2 = Math.sqrt(f.vx*f.vx+f.vy*f.vy);
            if (s2 > f.maxSpd) { f.vx=f.vx/s2*f.maxSpd; f.vy=f.vy/s2*f.maxSpd; }
            f.x += f.vx; f.y += f.vy;
            f.el.style.left = (f.x-HALF_FW) + 'px';
            f.el.style.top  = (f.y-HALF_FH) + 'px';
            f.img.style.transform = `rotate(${(f.angle+Math.PI/2)*180/Math.PI}deg)`;
        }

        // ── Collision F35 → Rafale ──
        if (invincible > 0) {
            invincible--;
        } else {
            for (const f of f35s) {
                const dx = px-f.x, dy = py-f.y;
                if (dx*dx+dy*dy < 52*52) {
                    hp--; invincible = 150; flashDamage(); updateHUD();
                    if (hp <= 0) { triggerGameOver(); return; }
                    break;
                }
            }
        }

        // ── Portail sortie ──
        if (!portalNavigating) {
            if (portalCooldown > 0) { portalCooldown--; }
            else {
                for (const pel of portalEls) {
                    const r = pel.getBoundingClientRect();
                    const cx = r.left+r.width/2, cy = r.top+r.height/2;
                    const dx = px-cx, dy = py-cy;
                    if (dx*dx+dy*dy < (r.width*0.65)*(r.width*0.65)) {
                        portalNavigating = true;
                        const fl = document.createElement('div');
                        fl.style.cssText = 'position:fixed;inset:0;background:#fff;opacity:0;z-index:9999;transition:opacity 0.25s;pointer-events:none;';
                        document.body.appendChild(fl);
                        requestAnimationFrame(() => { fl.style.opacity = '1'; });
                        setTimeout(() => { window.location.href = pel.dataset.href; }, 280);
                        break;
                    }
                }
            }
        }

        // ── Machine à états vagues ──
        if (gameState === 'start') {
            stateTimer++;
            if (stateTimer > 60) startWaveIntro();
        } else if (gameState === 'wave-intro') {
            stateTimer--;
            if (stateTimer <= 0) startFighting();
        } else if (gameState === 'fighting') {
            // Spawn progressif : un F35 toutes les ~80 frames
            if (waveSpawned < waveTotal) {
                spawnTimer++;
                if (spawnTimer >= 80) { spawnOneF35(wave); waveSpawned++; spawnTimer = 0; }
            }
            // Vague terminée quand tous spawned et tous tués
            if (waveSpawned === waveTotal && f35s.length === 0) waveClear();
        } else if (gameState === 'wave-clear') {
            stateTimer--;
            if (stateTimer <= 0) startWaveIntro();
        }
    }

    tick();
})();
