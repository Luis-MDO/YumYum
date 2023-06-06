import React from "react";
import style from "./meals.module.css";

// Recipe component represents a single recipe card
const RecipeCards = ({ title, calories, image, ingredients }) => {
  const roundedCalories = Math.floor(calories);

  return (
    <div className={style.recipeCard}>
      <h3>{title}</h3>
      <img className={style.image} src={image} alt={title} />
      <ul>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
        <li>
          <p>
            Calories: <span className={style.highlight}>{roundedCalories}</span>
          </p>
        </li>
      </ul>
    </div>
  );
};
export default RecipeCards;
