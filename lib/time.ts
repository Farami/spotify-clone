export function convertMillisecondsToMinutesAndSeconds(milliseconds: number) {
  const d = new Date(1000 * Math.round(milliseconds / 1000)); // round to nearest second

  function pad(i: number) {
    return ('0' + i).slice(-2);
  }

  const hours = d.getUTCHours();
  const minutes = d.getUTCMinutes();
  const seconds = d.getUTCSeconds();

  if (hours === 0) {
    return `${minutes}:${pad(seconds)}`;
  }
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
