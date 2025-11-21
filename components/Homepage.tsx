"use client";

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EventIcon from "@mui/icons-material/Event";
import MovieCard from "@/components/MovieCard";
import { MovieDetail } from "@/models/MovieDetail";
import { PaginatedResponse } from "@/models/PaginatedResponse";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import SortIcon from "@mui/icons-material/Sort";
import StarIcon from "@mui/icons-material/Star";
import { requestDetails } from "@/app/api";
import useScrollListener from "@/hooks/useScrollListener";

const sortOptions = [
  {
    value: "release_date.desc",
    label: "Release Date (Newest)",
    icon: <EventIcon fontSize="small" />,
  },
  {
    value: "original_title.asc",
    label: "Alphabetical (A-Z)",
    icon: <SortByAlphaIcon fontSize="small" />,
  },
  {
    value: "popularity.desc",
    label: "Popularity (Highest)",
    icon: <StarIcon fontSize="small" />,
  },
];

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
    setData(movies.results)
    setPage(movies.page)
    setTotalPages(movies.total_pages)
  } , [movies])

  return (
    <>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="sort-select-label">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SortIcon sx={{ mr: 1 }} />
              Sort By
            </Box>
          </InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortValue}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SortIcon sx={{ mr: 1 }} />
                Sort By
              </Box>
            }
            onChange={(event) => {
              setSortValue(event.target.value);
              router.replace("/?sort=" + event.target.value);
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {option.icon}
                  <Typography>{option.label}</Typography>
                  {/* Add a default direction icon for visual cue */}
                  {option.value === "releaseDate" && (
                    <ArrowDownwardIcon fontSize="inherit" color="action" />
                  )}
                  {option.value === "rating" && (
                    <ArrowDownwardIcon fontSize="inherit" color="action" />
                  )}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {data.map((movie) => (
          <MovieCard {...movie} key={movie.id} />
        ))}
      </Grid>
      
    </>
  );
}
