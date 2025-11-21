"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Grid,
} from "@mui/material";
import MovieCard from "@/components/MovieCard";
import { MovieDetail } from "@/models/MovieDetail";
import MovieSortDropdown from "./MovieSortDropdown";
import { PaginatedResponse } from "@/models/PaginatedResponse";
import { requestDetails } from "@/app/api";
import useScrollListener from "@/hooks/useScrollListener";

export default function Homepage({
  movies,
}: {
  movies: PaginatedResponse<MovieDetail>;
}) {
  const [data, setData] = useState(movies.results);
  const [page, setPage] = useState(movies.page);
  const [totalPages, setTotalPages] = useState(movies.total_pages);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortValue, setSortValue] = useState(
    searchParams.get("sort") || "release_date.desc",
  );

  // Get the current sort value from the URL, or use a default

  const fetchMore = useCallback(() => {
    if (page < totalPages && !isPending) {
      startTransition(async () => {
        const response = await requestDetails(page + 1, sortValue);
        setPage(page + 1);
        setData((prev) => [...prev, ...response.results]);
        setTotalPages(response.total_pages);
      });
    }
  }, [
    page,
    sortValue,
    totalPages,
    isPending,
    data,
    setPage,
    startTransition,
    setData,
    setTotalPages,
  ]);

  useScrollListener({ onFetch: fetchMore });

  useEffect(() => {
    setData(movies.results);
    setPage(movies.page);
    setTotalPages(movies.total_pages);
  }, [movies]);

  return (
    <>
      <MovieSortDropdown sortValue={sortValue} onSortChange={(v) => {
              setSortValue(v);
              router.replace("/?sort=" + v);
            }}/>
      <Grid container spacing={3}>
        {data.map((movie) => (
          <MovieCard {...movie} key={movie.id} />
        ))}
      </Grid>
    </>
  );
}
