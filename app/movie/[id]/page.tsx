import MovieDetailPage from "@/components/MovieDetailPage";
import { requestMovieDetail } from "@/app/api";

export default async function MovieDetail(props: {params: {id: string}}) {
  const params = await props.params; 
  const movie = await requestMovieDetail(params.id);

  return (
   <MovieDetailPage {...movie}/>
  );
}