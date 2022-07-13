import React, { useState, useEffect } from "react";
import "./main.scss";

const Cocktail = () => {
  const [data, setData] = useState({});

  const fetchCocktailData = async () => {
    const response = await fetch(`/api/cocktails`);
    const cocktailData = await response.json();
    setData(cocktailData);
  };

  useEffect(() => {
    fetchCocktailData();
  }, []);

  let ingredients = [];

  for (let string in data) {
    if (string.includes("strIngredient") && data[string] != null) {
      ingredients.push(<li>{data[string]}</li>);
    }
  }

  let instructions = [];

  for (let string in data) {
    if (string.includes("strMeasure") && data[string] != null) {
      instructions.push(<li>{data[string]}</li>);
    }
  }

  return (
    <div>
      <h1 className="cocktail-name">{data.strDrink}</h1>
      <img src={data.strDrinkThumb} />
      <h3 className="ingredients-header">Ingredients:</h3>
      <div className="cocktail-box">
        <div className="cocktail-item">
          <ul>{instructions}</ul>
        </div>
        <div className="cocktail-item">
          <ul>{ingredients}</ul>
        </div>
      </div>
      <h4>Instructions:</h4>
      <p className="cocktail-directions">{data.strInstructions}</p>
    </div>
  );
};

export default Cocktail;
