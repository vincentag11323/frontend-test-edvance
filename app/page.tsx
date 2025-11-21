import Homepage from "@/components/Homepage";
import Navbar from "@/components/Navbar";
import { requestDetails } from "./api";

export default async function Home(props: {
  searchParams?: Promise<{
    sort?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const movies = await requestDetails(
    1,
    searchParams?.sort ?? "release_date.desc",
  );

  return (
    <div className="p-5 flex flex-col gap-4">
      <Navbar />
      <Homepage movies={movies} />
    </div>
  );
}
