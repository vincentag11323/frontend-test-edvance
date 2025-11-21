"use client";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EventIcon from "@mui/icons-material/Event";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import SortIcon from "@mui/icons-material/Sort";
import StarIcon from "@mui/icons-material/Star";

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

export default function MovieSortDropdown({
  sortValue,
  onSortChange
}: {
  sortValue: string;
  onSortChange : (v: string) => void;
}) {
  return (
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
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {option.icon}
                  <Typography>{option.label}</Typography>
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
    
  );
}
