// eslint-disable-next-line @typescript-eslint/ban-types
export const createWorkerBuilder = (worker: Function): Worker => {
  const code = worker.toString();
  const blob = new Blob([`(${code})()`]);
  return new Worker(URL.createObjectURL(blob));
};
