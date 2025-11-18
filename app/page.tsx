import { requestDetails } from "./api";

const getDetails = async () => {
  const a = await requestDetails()

  return a;
}
export default async function Home() {
 const a = await getDetails()
 console.log('a', a)

  return (
    <div> 
      Hello world
    </div>
  );
}
