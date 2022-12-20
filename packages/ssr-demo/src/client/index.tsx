import { hydrateRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import router from "../router";

const Client = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        {router.map((item, index) => {
          return <Route {...item} key={index}></Route>;
        })}
      </Routes>
    </BrowserRouter>
  );
};

hydrateRoot(document.getElementById("root") as Document | Element, <Client />);
