function switchTab(version) {
    const panels = document.querySelectorAll('.tab-panel');
    const buttons = document.querySelectorAll('.tab-btn');

    panels.forEach(panel => {
        if (panel.id === 'panel-' + version) {
           panel.removeAttribute('hidden');
            panel.classList.add('active');
        }
        else {
        panel.setAttribute('hidden', '');
        panel.classList.remove('active');
        }
    });

    buttons.forEach(btn => {
    const isActive = btn.id === 'tab-' + version;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');

    });
}