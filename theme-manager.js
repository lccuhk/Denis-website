class ThemeManager {
    constructor() {
        this.themes = [];
        this.currentThemeId = null;
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        
        try {
            await this.loadThemes();
            this.setupUI();
            this.loadSavedTheme();
            this.initialized = true;
        } catch (error) {
            console.error('Failed to initialize theme manager:', error);
            this.fallbackToDefault();
        }
    }

    async loadThemes() {
        try {
            const response = await fetch('themes.json');
            this.themes = await response.json();
        } catch (error) {
            console.error('Failed to load themes.json, using embedded themes:', error);
            this.themes = this.getEmbeddedThemes();
        }
    }

    getEmbeddedThemes() {
        return [
            {
                id: "ink-black",
                name: "墨韵黑",
                emoji: "⚫",
                colors: {
                    primary: "#c4a35a",
                    primaryDark: "#8b6914",
                    primaryLight: "#d4b36a",
                    bgPrimary: "#1a0f0a",
                    bgSecondary: "#2d1810",
                    bgTertiary: "#4a281a",
                    textPrimary: "#f5e6d3",
                    textSecondary: "#d4c4a8",
                    textMuted: "#9a8a6a",
                    borderColor: "rgba(196, 163, 90, 0.3)",
                    bgOverlay: "rgba(0, 0, 0, 0.3)",
                    bgCard: "rgba(196, 163, 90, 0.08)",
                    bgNav: "linear-gradient(180deg, rgba(26, 15, 10, 0.98) 0%, rgba(26, 15, 10, 0.85) 100%)",
                    bgFooter: "rgba(0, 0, 0, 0.4)",
                    bgPattern: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M10 40 Q20 20 40 40 Q60 60 70 40' stroke='%23c4a35a' stroke-width='0.3' fill='none' opacity='0.08'/%3E%3C/svg%3E\")"
                }
            },
            {
                id: "heroic-red",
                name: "侠义红",
                emoji: "🔴",
                colors: {
                    primary: "#c41e3a",
                    primaryDark: "#8b1529",
                    primaryLight: "#d42a44",
                    bgPrimary: "#1a0a0c",
                    bgSecondary: "#2d1014",
                    bgTertiary: "#4a1a1f",
                    textPrimary: "#f5d3d6",
                    textSecondary: "#d4a8ac",
                    textMuted: "#9a6a6e",
                    borderColor: "rgba(196, 30, 58, 0.3)",
                    bgOverlay: "rgba(0, 0, 0, 0.4)",
                    bgCard: "rgba(196, 30, 58, 0.08)",
                    bgNav: "linear-gradient(180deg, rgba(26, 10, 12, 0.98) 0%, rgba(26, 10, 12, 0.85) 100%)",
                    bgFooter: "rgba(0, 0, 0, 0.4)",
                    bgPattern: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M10 40 Q20 20 40 40 Q60 60 70 40' stroke='%23c41e3a' stroke-width='0.3' fill='none' opacity='0.08'/%3E%3C/svg%3E\")"
                }
            },
            {
                id: "river-blue",
                name: "江湖蓝",
                emoji: "🔵",
                colors: {
                    primary: "#1e88c4",
                    primaryDark: "#15658b",
                    primaryLight: "#2a94d4",
                    bgPrimary: "#0a121a",
                    bgSecondary: "#10202d",
                    bgTertiary: "#1a304a",
                    textPrimary: "#d3e6f5",
                    textSecondary: "#a8c4d4",
                    textMuted: "#6a8a9a",
                    borderColor: "rgba(30, 136, 196, 0.3)",
                    bgOverlay: "rgba(0, 0, 0, 0.4)",
                    bgCard: "rgba(30, 136, 196, 0.08)",
                    bgNav: "linear-gradient(180deg, rgba(10, 18, 26, 0.98) 0%, rgba(10, 18, 26, 0.85) 100%)",
                    bgFooter: "rgba(0, 0, 0, 0.4)",
                    bgPattern: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M10 40 Q20 20 40 40 Q60 60 70 40' stroke='%231e88c4' stroke-width='0.3' fill='none' opacity='0.08'/%3E%3C/svg%3E\")"
                }
            },
            {
                id: "light",
                name: "侠客浅",
                emoji: "⚪",
                colors: {
                    primary: "#8b6914",
                    primaryDark: "#6b5010",
                    primaryLight: "#a57a18",
                    bgPrimary: "#faf6f0",
                    bgSecondary: "#f0e6d6",
                    bgTertiary: "#e6dcc6",
                    textPrimary: "#2d1810",
                    textSecondary: "#4a281a",
                    textMuted: "#7a5a3a",
                    borderColor: "rgba(139, 105, 20, 0.3)",
                    bgOverlay: "rgba(240, 230, 214, 0.8)",
                    bgCard: "rgba(139, 105, 20, 0.08)",
                    bgNav: "linear-gradient(180deg, rgba(250, 246, 240, 0.98) 0%, rgba(250, 246, 240, 0.85) 100%)",
                    bgFooter: "rgba(240, 230, 214, 0.8)",
                    bgPattern: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M10 40 Q20 20 40 40 Q60 60 70 40' stroke='%238b6914' stroke-width='0.3' fill='none' opacity='0.08'/%3E%3C/svg%3E\")"
                }
            }
        ];
    }

    setupUI() {
        this.createThemePanel();
        this.setupEventListeners();
    }

    createThemePanel() {
        let panel = document.getElementById('theme-panel');
        let label = document.getElementById('theme-label');
        let toggle = document.getElementById('theme-toggle');

        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'theme-panel';
            panel.className = 'theme-panel';
            document.body.appendChild(panel);
        }

        panel.innerHTML = `
            <div class="theme-panel-title">选择主题</div>
            <div class="theme-options">
                ${this.themes.map(theme => `
                    <div class="theme-option" data-theme="${theme.id}">
                        <div class="theme-color" style="background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);"></div>
                        <div class="theme-name">${theme.name}</div>
                    </div>
                `).join('')}
            </div>
        `;

        if (!label) {
            label = document.createElement('div');
            label.id = 'theme-label';
            label.className = 'theme-label';
            document.body.appendChild(label);
        }

        if (!toggle) {
            toggle = document.createElement('button');
            toggle.id = 'theme-toggle';
            toggle.className = 'theme-toggle';
            toggle.setAttribute('aria-label', '切换主题');
            document.body.appendChild(toggle);
        }
    }

    setupEventListeners() {
        const toggle = document.getElementById('theme-toggle');
        const panel = document.getElementById('theme-panel');

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            panel.classList.remove('active');
        });

        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                this.applyTheme(option.dataset.theme);
                panel.classList.remove('active');
            });
        });
    }

    applyTheme(themeId) {
        const theme = this.themes.find(t => t.id === themeId);
        if (!theme) {
            console.error(`Theme ${themeId} not found`);
            return;
        }

        this.currentThemeId = themeId;
        
        document.documentElement.removeAttribute('data-theme');
        
        this.applyThemeColors(theme.colors);
        
        const label = document.getElementById('theme-label');
        const toggle = document.getElementById('theme-toggle');
        
        if (label) label.textContent = theme.name;
        if (toggle) toggle.textContent = theme.emoji;
        
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.theme === themeId) {
                option.classList.add('active');
            }
        });
        
        localStorage.setItem('theme', themeId);
    }

    applyThemeColors(colors) {
        const root = document.documentElement.style;
        root.setProperty('--primary', colors.primary);
        root.setProperty('--primary-dark', colors.primaryDark);
        root.setProperty('--primary-light', colors.primaryLight);
        root.setProperty('--bg-primary', colors.bgPrimary);
        root.setProperty('--bg-secondary', colors.bgSecondary);
        root.setProperty('--bg-tertiary', colors.bgTertiary);
        root.setProperty('--text-primary', colors.textPrimary);
        root.setProperty('--text-secondary', colors.textSecondary);
        root.setProperty('--text-muted', colors.textMuted);
        root.setProperty('--border-color', colors.borderColor);
        root.setProperty('--bg-overlay', colors.bgOverlay);
        root.setProperty('--bg-card', colors.bgCard);
        root.setProperty('--bg-nav', colors.bgNav);
        root.setProperty('--bg-footer', colors.bgFooter);
        root.setProperty('--bg-pattern', colors.bgPattern);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && this.themes.find(t => t.id === savedTheme)) {
            this.applyTheme(savedTheme);
        } else if (this.themes.length > 0) {
            this.applyTheme(this.themes[0].id);
        }
    }

    fallbackToDefault() {
        this.themes = this.getEmbeddedThemes();
        this.setupUI();
        this.applyTheme(this.themes[0].id);
    }
}

const themeManager = new ThemeManager();
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
});
