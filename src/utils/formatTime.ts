export default function formatTime(dataString: string | undefined) {
  if (dataString !== undefined) {
    return new Date(dataString);
  }
}
