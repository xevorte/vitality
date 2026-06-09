export const formatListWithAnd = (arr: any[]) => {
  if (!arr || arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} dan ${arr[1]}`;
  
  const lastItem = arr[arr.length - 1];
  const otherItems = arr.slice(0, -1).join(', ');
  return `${otherItems}, dan ${lastItem}`;
}