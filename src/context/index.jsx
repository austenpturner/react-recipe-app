import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await response.json();

      if (data?.data?.recipes) {
        setLoading(false);
        setRecipeList(data?.data?.recipes);
        setSearchParam("");
        navigate('/');
      }
      console.log(recipeList);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddToFavorites(getCurrentItem) {
    let copyFavorites = [... favorites];
    const index = copyFavorites.findIndex(item => item.id === getCurrentItem.id)

    if (index === -1) {
        copyFavorites.push(getCurrentItem);
    } else {
        copyFavorites.splice(index);
    }

    setFavorites(copyFavorites);
  }

//   console.log(favorites);

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetails,
        setRecipeDetails,
        handleAddToFavorites,
        favorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
