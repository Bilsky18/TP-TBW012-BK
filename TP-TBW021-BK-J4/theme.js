// Dark mode theme management with error handling
const THEME_VARS = {
    dark: {
        '--bg-primary': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        '--bg-secondary': '#2d2d2d',
        '--text-primary': '#f0f0f0',
        '--text-secondary': '#b0b0b0',
        '--border-color': '#444',
        '--shadow-color': 'rgba(0, 0, 0, 0.3)',
        '--logo-color': '#66b3ff'
    },
    light: {
        '--bg-primary': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        '--bg-secondary': '#fff',
        '--text-primary': '#333',
        '--text-secondary': '#555',
        '--border-color': '#ddd',
        '--shadow-color': 'rgba(0, 0, 0, 0.1)',
        '--logo-color': '#007bff'
    }
};

function applyTheme(isDark) {
    try {
        const theme = isDark ? THEME_VARS.dark : THEME_VARS.light;
        Object.entries(theme).forEach(([key, val]) => {
            document.body.style.setProperty(key, val);
        });
    } catch (e) {
        console.warn('Failed to apply theme:', e);
    }
}

function toggleTheme() {
    try {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage?.setItem('theme', isDark ? 'dark' : 'light');
        applyTheme(isDark);
        updateThemeButton();
    } catch (e) {
        console.warn('Theme toggle failed:', e);
    }
}

function updateThemeButton() {
    try {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;

        const isDark = document.body.classList.contains('dark-mode');
        btn.textContent = isDark ? '☀️' : '🌙';
        btn.title = isDark ? 'Passer en mode clair' : 'Passer en mode sombre';
    } catch (e) {
        console.warn('Update theme button failed:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const theme = localStorage?.getItem('theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            applyTheme(true);
        }
        updateThemeButton();
        document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    } catch (e) {
        console.warn('DOMContentLoaded theme init failed:', e);
    }
});
