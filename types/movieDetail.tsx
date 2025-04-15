export interface Genre {
    id: number;
    name: string;
  }
  
  export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }
  
  export interface IMovieDetail {
    id: number;
    title: string;
    original_title: string;
    original_language: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    vote_count: number;
    popularity: number;
    adult: boolean;
    video: boolean;
    genres: Genre[];
    runtime: number;
    status: string;
    tagline: string;
    homepage: string;
    budget: number;
    revenue: number;
    imdb_id: string;
    production_companies: ProductionCompany[];
  }
  