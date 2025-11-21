"use client";

import { Button, Chip, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Diversity1Icon from "@mui/icons-material/Diversity1";
import EighteenUpRatingIcon from "@mui/icons-material/EighteenUpRating";
import Image from "next/image";
import LanguageIcon from "@mui/icons-material/Language";
import { MovieDetail } from "@/models/MovieDetail";
import StarIcon from "@mui/icons-material/Star";
import { getPosterFullPath } from "@/app/api";
import { requestMovieDetail } from "@/app/api";
import { useRouter } from "next/navigation";

export default function MovieDetailPage({
  title,
  original_title,
  adult,
  original_language,
  popularity,
  overview,
  poster_path,
  backdrop_path,
  genres,
}: MovieDetail) {
  const [imgSrc, setImgSrc] = useState("");
  const [, setIsLoading] = useState(true);

  // use either poster_path or to backdrop_path or empty string.
  const imgPartialPath = poster_path || backdrop_path || "";
  const router = useRouter();

  useEffect(() => {
    const fetchFullPath = async () => {
      if (imgPartialPath && imgPartialPath.length > 0) {
        setIsLoading(true);
        try {
          // 2. Await the asynchronous function call
          const fullPath = await getPosterFullPath(imgPartialPath);
          setImgSrc(fullPath);
        } catch (error) {
          console.error("Failed to get full poster path:", error);
          setImgSrc("");
        } finally {
          setIsLoading(false);
        }
      } else {
        setImgSrc("");
        setIsLoading(false);
      }
    };

    fetchFullPath();
  }, [imgPartialPath]);

  return (
    <div className="w-full h-full flex flex-col gap-2 justify-start items-start p-2">
      <Button onClick={() => router.push("/")}> BACK </Button>

      <div className=" w-full h-full flex justify-center p-5">
        {" "}
        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg h-full  shadow-lg p-2 flex-col align-middle justify-around rounded-lg hover:shadow-xl transform hover:cursor-pointer">
          <div className=" w-[80%] mx-auto flex justify-center mb-1 my-auto min-h-[300px]">
            {" "}
            {imgSrc ? (
              <Image
                src={imgSrc}
                width={200}
                preload
                height={200}
                alt={title}
                objectFit="contain"
              />
            ) : (
              <div className="w-[80%] h-[300px] bg-gray-600 mx-auto text-transparent">
                {" "}
                a{" "}
              </div>
            )}
          </div>
          <div className="mx-auto mb-5">
            {/* TITLE */}
            <Typography
              noWrap
              variant="body1"
              component="div"
              textAlign={"center"}
            >
              {title}
            </Typography>
            {/* ALTERNATIVE TITLE */}
            <Typography
              noWrap
              variant="body2"
              color="text.secondary"
              textAlign={"center"}
            >
              {original_title}
            </Typography>
          </div>
          <div className="mx-auto mb-5">
            <Typography
              // noWrap
              variant="body1"
              component="div"
              textAlign={"center"}
            >
              {overview}
            </Typography>
          </div>
          <div className="mx-auto mb-5 flex justify-center gap-5 ">
            {/* <Typography
            noWrap
            variant="body1"
            component="div"
            textAlign={"center"}
            className=""
          > */}
            {genres
              .map((v) => v.name)
              .map((v) => (
                <Chip label={v} size="small" />
              ))}
            {/* </Typography> */}
          </div>
          <div className="mx-auto flex justify-evenly align-baseline">
            {/* TAGS */}
            {adult ? (
              <EighteenUpRatingIcon fontSize="small" />
            ) : (
              <Diversity1Icon fontSize="small" />
            )}

            <Chip
              icon={<LanguageIcon />}
              label={original_language}
              size="small"
            />
            <Chip icon={<StarIcon />} label={popularity} size="small" />
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
