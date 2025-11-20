import Homepage from "@/components/Homepage";
import Navbar from "@/components/Navbar";
import ScrollListener from "@/components/ScrollListener";
import { requestDetails } from "./api";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const movies = await requestDetails(1, searchParams?.sort);

  return (
    <div className="p-5 flex flex-col gap-4">
      <Navbar />
      <Homepage movies={movies} />
    </div>
  );
}
