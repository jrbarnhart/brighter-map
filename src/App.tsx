import { Link, Outlet } from "react-router";

function App() {
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-1/2 bg-amber-500 flex flex-col items-center justify-center">
        <p>Canvas</p>
        <Link to="/monsters">Monsters</Link>
        <Link to="/resources">Resources</Link>
      </div>
      <div className="h-full w-1/2 bg-purple-400">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
