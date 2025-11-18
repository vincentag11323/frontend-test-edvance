import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

import Image from 'next/image'
import { getLogoFullPath } from "@/app/api";

export default async function MovieCard(){

    const src = await getLogoFullPath('/6qwuHrNHhArZqcFmgXCuKwSYstZ.jpg')
    const title = ''
    const adult = false
    const rating = 0.123
    const language = 'jp'
    

    return <Grid size={{ xs: 6, md: 4 }} className='min-h-[300px] flex-col  ' > 
  
    <div className="w-full h-full  shadow-lg p-2 flex-col align-middle justify-around rounded-lg hover:shadow-xl transform hover:scale-105"> 
       
    
        
  <div className=" w-[80%] mx-auto h-auto ">
    {/* IMAGE */}
   <Image
       src={src}
       
       width={200}
       preload
    //    fill/
    //    height={'auto'}
    height={200}
    alt={title}
    objectFit="contain"

    
       />
    </div>
    <div className="mx-auto ">
        {/* TITLE */}
  <Typography gutterBottom variant="body1" component="div" textAlign={'center'}>
          How to Make a Ken Loach Film
        </Typography>
       
    </div>
    <div className="mx-auto">
        {/* TAGS */}


  
    </div>
            
       
        </div>
        </Grid>
   
}