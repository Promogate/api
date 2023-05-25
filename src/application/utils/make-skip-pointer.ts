export const makeSkipPointer = (page: number, per_page: number): number => {
  if (page === 1) {
    return 0
  }

  return (page - 1) * per_page
}