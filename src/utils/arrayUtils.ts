export function upsert<T>(item: T, arr: T[], isItem: (item: T) => boolean): T[] {
  const index = arr.findIndex(t => isItem(t));

  if (index >= 0) {
    const newArr = arr.map(t => isItem(t) ? item : t);
    return newArr;
  }
  else {
    return [...arr, item];
  }
}
