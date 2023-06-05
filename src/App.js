import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Recipe from "./Meals";

// Define the main component of the application
const App = () => {
  // Define constants for the API credentials
  const PROJECT_ID = "52603bb7";
  const API_KEY = "1d3bc4d8aecdc5c0b1f6f80b4045701a";

  // Define state variables using the useState hook
  const [recipes, setRecipes] = useState([]); // Holds the fetched recipes
  const [search, setSearch] = useState(""); // Holds the value of the search input field
  const [query, setQuery] = useState(""); // Holds the current search query
  const [randomQuery, setRandomQuery] = useState(""); // Holds the random query for initial search

  // Define a callback function to fetch recipes from the API
  const fetchRecipes = useCallback(async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${PROJECT_ID}&app_key=${API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  }, [query, PROJECT_ID, API_KEY]);

  // Use the useEffect hook to generate a random query on component mount
  useEffect(() => {
    setRandomQuery(generateRandomQuery());
  }, []);

  // Use the useEffect hook to set the query when randomQuery changes
  useEffect(() => {
    if (randomQuery) {
      setQuery(randomQuery);
    }
  }, [randomQuery]);

  // Use the useEffect hook to fetch recipes when the query changes
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // Function to generate a random query from a predefined list
  const generateRandomQuery = () => {
    const randomQueries = [
      "chicken",
      "pasta",
      "pizza",
      "soup",
      "salad",
      "egg",
      "bacon",
      "beef",
      "avocado",
    ];
    const randomIndex = Math.floor(Math.random() * randomQueries.length);
    return randomQueries[randomIndex];
  };

  // Event handler for the search input field change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Event handler for the search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  // Render the component
  return (
    <div className="app wrapper">
      <h1 class="logo">YumYum</h1>
      <form className="app__search-form" onSubmit={handleSearchSubmit}>
        <input
          className="app__search-bar"
          type="text"
          value={search}
          onChange={handleSearchChange}
        />
        <button className="app__search-button" type="submit">
          Search
        </button>
      </form>
      <div className="app__recipes">
        {/* Map through the recipes and render each Recipe component */}
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
