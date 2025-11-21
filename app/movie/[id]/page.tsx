import MovieDetailPage from "@/components/MovieDetailPage";
import { requestMovieDetail } from "@/app/api";

export default async function MovieDetail(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const movie = await requestMovieDetail(Number(params.id));

  return <MovieDetailPage {...movie} />;
}
