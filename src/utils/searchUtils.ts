export type SearchOptions<T> = {
  searchTerm: string;
  source: T[];
  getString: (item: T) => string;
  resultLimit?: number;
};

export const filterResultsBySearchTerm = <T>(options: SearchOptions<T>) => {
  const lowercaseTerm = options.searchTerm.toLowerCase();
  const results: T[] = [];
  for (let i = 0; i < options.source.length; i++) {
    if (options.resultLimit != undefined && results.length >= options.resultLimit) {
      break;
    }

    const item = options.source[i];
    const key = options.getString(item);
    if (key.toLowerCase().includes(lowercaseTerm)) {
      results.push(item);
    }
  }

  return results;
};
