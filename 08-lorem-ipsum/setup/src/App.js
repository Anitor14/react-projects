import React, { useState } from "react";
import data from "./data";
function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); // this is to prevent unnecessary reloading.
    let amount = parseInt(count); // this converts the count value to a number.
    if (count <= 0) {
      // this is to make sure numbers lower that 0 are always equals to one.
      amount = 1;
    }
    if (count > 8) {
      // this is to make sure that numbers higher than 8 are always equals to 8 .
      amount = 8;
    }
    setText(data.slice(0, amount)); // this is use to return data beginning from the first argument which is included to the last argument which is not included.
  };
  return (
    <section className="section-center">
      <h3>Tired of boring Lorem Ipsum?</h3>
      <form className="lorem-form" onSubmit={handleSubmit}> 
        <label htmlFor="amount">Paragraphs:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button type="submit" className="btn">
          generate
        </button>
      </form>
      <article className="lorem-text">
        {text.map((item, index) => {
          // if(index > count-1){
          //   return
          // }
          return <p key={index}>{item}</p>;
        })}
      </article>
    </section>
  );
}

export default App;
