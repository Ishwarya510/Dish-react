
import './App.css';
import React,{useEffect,useState} from 'react';
import Recipe from "./Recipe";

const App=()=>{
  const APP_ID="54a09bc0";
  const APP_KEY="590b5dc12627733ea2c891e477dc2639"
 const [recipes,setRecipes]=useState([])
 const [search,setSearch]=useState("");
 const [query,setQuery]=useState("chicken")

  useEffect(()=>{
    getRecipes();
  },[query])
  const getRecipes= async()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data.hits)
  }
  const updateSearch=(e)=>{
    setSearch(e.target.value)
  }
  const getSearch = e=>{
    e.preventDefault()
    setQuery(search)
    setSearch("");
  }

  return(
    <div className="App">
      <div className="sear">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-form" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">search</button>
      </form>
      </div>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe 
        key={recipe.recipe.calories}
        title={recipe.recipe.label} calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}

export default App

