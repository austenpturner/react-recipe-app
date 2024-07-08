import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

export default function Home() {
  const { recipeList, loading } = useContext(GlobalContext);

  if (loading) return <div>Loading... please wait</div>;

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0
        ? recipeList.map((item, index) => (
            <RecipeItem key={index} item={item} />
          ))
        : null}
    </div>
  );
}
