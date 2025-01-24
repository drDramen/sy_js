export const getThemeButtonText = (value) => `Set ${value === 'dark' ? 'light' : 'dark'}`;

export const getLoggedInButtonText = (value) => (value ? 'Log-out' : 'Log-in');

export const updateTheme = (theme) => {
  document.querySelector('html').setAttribute('data-theme', theme);
};
