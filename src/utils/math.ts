export const randomNumber = (start: number, end: number): number => {
  return Math.floor(Math.random() * (end - start + 1) + start);
};

interface Range {
  start: number;
  end: number;
}

export const randomNumberFromRanges = (ranges: Range[]): number => {
  const randomIndex = Math.floor(Math.random() * ranges.length);

  return Math.floor(
    Math.random() * (ranges[randomIndex].end - ranges[randomIndex].start + 1) +
      ranges[randomIndex].start,
  );
};

export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
