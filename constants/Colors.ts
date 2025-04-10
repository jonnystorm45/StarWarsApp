const tintColorLight = '#FFD700'; // Star Wars Gold for light mode
const tintColorDark = '#DC143C';  // Crimson Red for dark mode to reflect a darker theme

export const Colors = {
  light: {
    text: '#ECEDEE', // Light text for high contrast
    background: '#000000', // Deep space black for light mode background
    tint: tintColorLight, // Gold color for active tint
    icon: '#FFD700', // Star Wars Gold for icons
    tabIconDefault: '#9BA1A6', // Default color for icons
    tabIconSelected: tintColorLight, // Gold for selected tab
  },
  dark: {
    text: '#ECEDEE', // Light text for dark mode
    background: '#151718', // Dark, space-like background
    tint: tintColorDark, // Crimson Red for active tint
    icon: '#FFD700', // Star Wars Gold for icons
    tabIconDefault: '#9BA1A6', // Default color for icons
    tabIconSelected: tintColorDark, // Crimson Red for selected tab in dark mode
  },
};
