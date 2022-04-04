import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = React.useRef(""); // this references an element.

  React.useEffect(() => {
    searchValue.current.focus();
  }, []);
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value); // we are changing the searchTerm with the reference element value.
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name"> search for you favorite cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCocktail} // this happens on change of the value of the input.
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
