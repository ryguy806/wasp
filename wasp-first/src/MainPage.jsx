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
          <button onClick={handleRoutechange}>Click Here to go to Todos</button>
        </div>
      </div>
    </>
  );
};
