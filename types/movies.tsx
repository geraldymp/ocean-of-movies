import { Movie } from "./movie";

export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
  

export const TYPE_TITLES: Record<string, string> = {
  popular: 'Featured Movies',
  top_rated: 'Top Rated',
  now_playing: 'Now Playing',
  upcoming: 'Upcoming',
};