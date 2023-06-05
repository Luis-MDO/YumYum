import React from "react";
import style from "./meals.module.css";

// Recipe component represents a single recipe card
const RecipeCards = ({ title, calories, image, ingredients }) => {
  return (
    <div className={style.recipe}>
      <h2>{title}</h2>
      <img className={style.image} src={image} alt={title} />
      <ul>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
        <li>
          <p>Calories : {calories}</p>
        </li>
      </ul>
    </div>
  );
};
export default RecipeCards;
