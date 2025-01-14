import React, {useEffect} from "react";
import Navbar from './Navbar';
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { isAuthenticated, user } = useAuth0();
  const userName = isAuthenticated ? user.name : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/projects");
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="grid justify-items-center bg-sky-950 w-full h-screen overflow-y-auto">
      <Navbar isAuthenticated={isAuthenticated} userName={userName} />
      <div className="bg-sky-950 px-10 pt-24 pb-48 w-full max-w-7xl">
        <div className="pl-3 text-center">
          <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            Welcome to{" "}
            <span className="font-extralight text-sky-200">
              {" "}
              Productivity<span className="font-bold">Board</span>{" "}
            </span>
          </h1>
          <p className="mt-4 text-sky-500 text-md sm:text-lg lg:text-xl">
            An interactive board for project collaboration
          </p>
        </div>
      </div>
      <div className="grid justify-items-center bg-white p-10 w-full">
        <div className="w-full max-w-7xl">
          <h2 className="font-bold text-center first-line:selection:text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Why use ProductivityBoard?
          </h2>
          <hr className="my-10" />
          <div
            id="features"
            className="grid lg:grid-cols-3 place-items-center gap-5"
          >
            <div className="p-6 pt-0 text-center">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-sky-950">
                Big Picture
              </h5>
              <p className="mb-3 font-normal text-sky-500">
                Project progress overview from an elevated perspective
                <br />
              </p>
            </div>
            <div className="p-6 pt-0 text-center">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-sky-950">
                Zero Learning Curve
              </h5>
              <p className="mb-3 font-normal text-sky-500">
                Productivity Board is intuitive and has zero learning curve
              </p>
            </div>
            <div className="p-6 pt-0 text-center">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-sky-950">
                Increase Collaboration
              </h5>
              <p className="mb-3 font-normal text-sky-500">
                Mutiple users can create and share projects with one another{" "}
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
