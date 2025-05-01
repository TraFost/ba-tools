import type { ITrack } from "@/app/type/music-type";

function extractNumberFromId(title: string): number {
  const getNumber = title.split(" ")[1];
  return getNumber ? Number.parseInt(getNumber, 10) : 0;
}

export function sortTracksById(tracks: ITrack[]): ITrack[] {
  return tracks.slice().sort((a, b) => {
    const numA = extractNumberFromId(a.id);
    const numB = extractNumberFromId(b.id);
    return numA - numB;
  });
}
