export function capitalizeFirstLetter(word: string): string {
  if (word?.length === 0) {
    return word; // Return empty string if word is empty
  }
  return word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase();
}

export function capitalizeFirstLetterOfEachWord(str: string) {
  if (str?.length === 0) {
    return str; // Return empty string if word is empty
  }
  return str
    ?.split(' ')
    ?.map((word: string) => word?.charAt(0).toUpperCase() + word?.slice(1))
    ?.join(' ');
}

export const getInitials = (word: string) => {
  if (!word) return '';
  return capitalizeFirstLetter(word[0]);
};

export const generateRandomBackgroundColor = (): string => {
  // Generate random RGB values
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Calculate luminance to determine contrast
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // If luminance is too high, regenerate to ensure white text visibility
  if (luminance > 0.5) {
    return generateRandomBackgroundColor();
  }

  // Return RGB color as a string for use in inline styles
  return `rgb(${r}, ${g}, ${b})`;
};
