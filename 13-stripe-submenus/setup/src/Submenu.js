import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "./context";

const Submenu = () => {
  const {
    isSubmenuOpen,
    location,
    page: { page, links }, //destructure the values of the page object.
  } = useGlobalContext();
  const container = useRef(null); // this is use getting a reference to the aside node.
  const [columns, setColumns] = useState("col-2");
  useEffect(() => {
    setColumns("col-2");
    const submenu = container.current; // we are getting the node of the aside by using container.current here.
    const { center, bottom } = location; //destructure the location to get the center and bottom values.
    submenu.style.left = `${center}px`; // using inline css to style the variable submenu which is the aside node gotten from the container reference to the aside element.
    submenu.style.top = `${bottom}px`;

    if (links.length === 3) {
      setColumns("col-3");
    }

    if (links.length > 3) {
      setColumns("col-4");
    }
  }, [location, links]); // the array with the location is called a dependency array.
  return (
    <aside className={`submenu ${isSubmenuOpen && "show"}`} ref={container}>
      <h4>{page}</h4>
      <div className={`submenu-center ${columns}`}>
        {links.map((link, index) => {
          const { label, icon, url } = link;
          return (
            <a key={index} href={url}>
              {icon}
              {label}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default Submenu;
