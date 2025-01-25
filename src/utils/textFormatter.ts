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
