export const removeDuplicates = (data, key) => {
  return [...new Map(data.map(x => [x[key], x])).values()]
}
