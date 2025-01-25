export const generateQueryParams = (params: Record<string, any>): string => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([_, value]) => value !== '')
    );
    return `?${query.toString()}`;
};