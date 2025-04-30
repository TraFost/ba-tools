import type { ITrack } from "@/app/type/music-type";

function extractNumberFromId(title: string): number {
  const match = title.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : 0;
}

export function sortTracksById(tracks: ITrack[]): ITrack[] {
  return tracks.slice().sort((a, b) => {
    const numA = extractNumberFromId(a.id);
    const numB = extractNumberFromId(b.id);
    return numA - numB;
  });
}
