import { Chip, Grid, Typography } from "@mui/material";

import Diversity1Icon from '@mui/icons-material/Diversity1';
import EighteenUpRatingIcon from '@mui/icons-material/EighteenUpRating';
import Image from 'next/image'
import LanguageIcon from '@mui/icons-material/Language';
import { MovieDetail } from "@/models/MovieDetail";
import StarIcon from '@mui/icons-material/Star';
import { getPosterFullPath } from "@/app/api";

export default async function MovieCard({ title, original_title, backdrop_path, adult, original_language, popularity, poster_path}: MovieDetail){
    // use either poster_path or to backdrop_path or empty string.
    const imgPartialPath = poster_path || backdrop_path || '';
    const imgSrc =  imgPartialPath.length > 0 ? await getPosterFullPath(imgPartialPath) : ''     // TODO: inspect if you should get backdrop from diferent way.
    

    //TODO: check responsiveness later
    // TODO: add tooltip for title ellipsis

    return <Grid size={{ xs: 6, md: 4 }} className=' flex flex-col  ' > 
  
    <div className="w-full h-full  shadow-lg p-2 flex-col align-middle justify-around rounded-lg hover:shadow-xl transform hover:scale-105"> 
       
    
        
  <div className=" w-[80%] mx-auto flex justify-center mb-1 my-auto min-h-[300px]">
    {/* EITHER DISPLAY IMAGE OR FALLBACK TO GREY BACKGROUND */}
    {
        imgSrc ? 
        <Image
       src={imgSrc}
       
       width={200}
       preload

    height={200}
    alt={title}
    objectFit="contain"

    
       /> 
       : 
       <div className="w-[80%] h-[300px] bg-gray-600 mx-auto text-transparent"> a </div>
    }
   
    </div>
    <div className="mx-auto mb-5">
        {/* TITLE */}
  <Typography noWrap   variant="body1" component="div" textAlign={'center'}>
         {title}
        </Typography>
       {/* ALTERNATIVE TITLE */}
       <Typography noWrap  variant="body2" color="text.secondary" textAlign={'center'}>
          {original_title}
        </Typography>
       
    </div>
    <div className="mx-auto flex justify-evenly align-baseline">
        {/* TAGS */}
        {
            adult ? <EighteenUpRatingIcon fontSize="small"/> :  <Diversity1Icon fontSize="small"/>
        }
         
         <Chip icon={<LanguageIcon />} label={original_language} size="small" />
         <Chip icon={<StarIcon />} label={popularity}  size="small" />

        


  
    </div>
            
       
        </div>
        </Grid>
   
}