import { Link } from "wasp/client/router";
import "./Main.css";

export const MainPage = () => {
  const handleRoutechange = () => {
    console.log("Route change");
  };
  return (
    <>
      <div className='container'>
        <div>Hello World!</div>
        <div className='Button'>
          <Link to='/todo'>Click here to view Todos!</Link>
        </div>
      </div>
    </>
  );
};
