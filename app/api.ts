"use server"

import { PaginatedResponse, TMDB } from '@lorenzopant/tmdb';

import { MovieDetail } from '@/models/MovieDetail';

const API_KEY = process.env.API_KEY ?? "";
const BASE_URL = "http://api.themoviedb.org/";
const tmdb = new TMDB(API_KEY);



export async function request<T>(path: string, params: Record<string, string | number> = {}) : Promise<T> {
    console.log(' run', path, params)
  const url = new URL(path , BASE_URL )
  console.log('url', url.toString())
  


  // always include API key
  url.searchParams.set("api_key", API_KEY)

  // append all given params
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }



  const res = await fetch(url);

  if (!res.ok) {
    // log the error
    console.error('API ERROR: ' , res.status, res.statusText);

    // NOTE: instead of status we can add further generic handler based on status.
    throw res.status;
  }
  return res.json();
}

export async function requestDetails(){
    return await  request<PaginatedResponse<MovieDetail>>("/3/discover/movie", {
  "primary_release_date.lte": "2016-12-31",
  "sort_by": "release_date.desc",
  page: 1,
});
}

export async function getLogoFullPath(path: string){
    return tmdb.images.logo(path).toString()
}