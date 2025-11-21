import { PropsWithChildren } from "react";

interface MovieCardContainerProps{
    onClick: () => void;
}
export const TEST_ID = "movie-card-container"
export default function MovieCardContainer({onClick, children} : PropsWithChildren<MovieCardContainerProps>){
    return  <div
        className="w-full h-full  shadow-lg p-2 flex-col align-middle justify-around rounded-lg hover:shadow-xl transform hover:scale-105 hover:cursor-pointer"
        onClick={onClick}
        data-testid={TEST_ID}
      >
        {children}
      </div>
}