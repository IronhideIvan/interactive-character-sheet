export function upsert<T>(item: T, arr: T[], isItem: (item: T) => boolean): T[] {
  const index = arr.findIndex(t => isItem(t));

  if (index >= 0) {
    const newArr = [...arr.slice(0, index), item, ...arr.slice(index + 1, arr.length - index)];
    return newArr;
  }
  else {
    return [...arr, item];
  }
}
