import { Grid } from "@mui/material";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import { requestDetails } from "./api";

export default async function Home() {
 const movies  =  await requestDetails()


  return (
    <div className="p-5 flex flex-col gap-4"> 
            <Navbar/>

      <Grid container spacing={3} >
         {
          movies.results.map( movie => 
<MovieCard {...movie} key={movie.id}/>
          )
         }
      </Grid>
      
      
    </div>
  );
}

