// rafale-game.js — retour au portfolio : portail cliquable / activable au clavier.
// Ancienne version : le curseur devenait un avion jouable (chasse aux F35, missiles, fumée) ;
// remplacé par un curseur natif classique, le portail reste le seul mécanisme de sortie.
document.querySelectorAll('.portal[data-href]').forEach(p => {
    p.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        location.href = p.dataset.href;
    });
    p.addEventListener('click', () => {
        const f = document.createElement('div');
        f.style.cssText = 'position:fixed;inset:0;background:#fff;opacity:0;z-index:9999;transition:opacity 0.25s ease;pointer-events:none;';
        document.body.appendChild(f);
        requestAnimationFrame(() => { f.style.opacity = '1'; });
        setTimeout(() => { location.href = p.dataset.href; }, 280);
    });
});
