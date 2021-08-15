import Loader from "react-loader-spinner";
const LoaderComp = ()=>{
      
    return(
        <Loader
        type="TailSpin"
        color="rgb(229, 34, 236)"
        height="100%"
        width="100%"
        timeout={100000} 
        />
          
    );
}
export default LoaderComp;