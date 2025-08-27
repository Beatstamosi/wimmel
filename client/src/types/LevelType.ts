export type LevelType = {
  id: number;
  name: string;
  difficulty: string;
  image:string,
  source_url: string;
  artist: string;
  characters: Character[];
};

type Character = {
  name: string;
  image: string;
  coordinates: { x1: number; y1: number; x2: number; y2: number };
};
