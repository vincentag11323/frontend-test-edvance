export interface MovieDetail {
  title: string;
  original_title: string;
  backdrop_path: string | null;
  adult: boolean;
  original_language: string;
  popularity: number;
  poster_path: string | null;
  id: number;
  genres: string[];
  overview: string;
}
