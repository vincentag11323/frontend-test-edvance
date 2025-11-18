import MovieCard from "@/components/MovieCard";
import { requestDetails } from "./api";
import { Grid } from "@mui/material";

const getDetails = async () => {
  const a = await requestDetails()

  return a;
}
export default async function Home() {
 const a = await getDetails()
 console.log('a', a)

  return (
    <div className="p-5"> 
      <Grid container spacing={2} >
         
<MovieCard/>
  
<MovieCard/>  
<MovieCard/> 
      </Grid>
      
      
    </div>
  );
}
