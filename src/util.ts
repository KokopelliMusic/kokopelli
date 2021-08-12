export const redirect = (to: string): void => {
  window.location.replace(to)
}

/**
 * Split a list into a list of lists where every element contains two elements
 */
export const splitList = (results: any[]): any[] => {
  return results.reduce((res, val, i, arr) => {
    if (i % 2 === 0) res.push(arr.slice(i, i + 2))
    return res
  }, [])
}

/**
 * Returns a random number between min and max 
 */
export const rand = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max + 1)) + min
}

export const getQueryParam = (param: string): string => {
  return new URLSearchParams(window.location.search).get(param)!
}