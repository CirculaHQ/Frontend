export const generateQueryParams = (params: Record<string, any>): string => {
  const query = new URLSearchParams(Object.entries(params).filter(([_, value]) => value !== ''));
  return `?${query.toString()}`;
};

export function removeEmptyStrings<T extends Record<string, any>>(obj: T): T {
  return Object.entries(obj)
    .filter(([_, value]) => value !== "")
    .reduce((acc, [key, value]) => {
      acc[key as keyof T] = value;
      return acc;
    }, {} as T);
}