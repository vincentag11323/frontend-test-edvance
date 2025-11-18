import { Grid } from "@mui/material";
import MovieCard from "@/components/MovieCard";
import { requestDetails } from "./api";

export default async function Home() {
 const movies  =  await requestDetails()


  return (
    <div className="p-5"> 
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
