//controller 
import Search from './models/Search';
import Recipe from './models/Recipes';
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import {elements, renderLoader, clearLoader} from "./views/base";
// import { stat } from 'fs';

// global state of the app
const state = {};


/**
 * Search Controller
 */
const controlSeach = async () => {
    // get the query from the view
    const query = searchView.getInput();
    // const query = 'pizza';

    if (query){
        //new search object && add it to state 
        state.search = new Search(query);

        //prepare UI for results 
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
        //search for recipieces ---> /returns promise 
        await state.search.getResults();

        //render results on UI
        clearLoader();
        searchView.resendResult(state.search.result);
        } catch(err){
            alert("something went wrong");
            clearLoader();
        }
    }

};

//event listener for the form 
elements.searchForm.addEventListener("submit", e => {
    //prevents the default action --> in this instance it wont reload the page 
    e.preventDefault();
    controlSeach();

});

//TESTING
// window.addEventListener("load", e => {
    //prevents the default action --> in this instance it wont reload the page 
    // e.preventDefault();
    // controlSeach();

// });


elements.searchResPages.addEventListener('click', e => {
    //returns element with specified argument 
    const btn = e.target.closest(".btn-inline");
    // console.log('clicked peter king ');
    if(btn){
        // console.log(btn.dataset.goto); // error here 
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.resendResult(state.search.result, goToPage);
    }


});


/**
 * Recipes controller
 */

const controlRecipe = async () => {
    // Get id from URL 
    const id = window.location.hash.replace('#', ''); 

    if (id){
        // prepare the UI for chnges
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        // create a new recipe object 
        state.recipe = new Recipe(id); 
        try{
        // get recipe data
       await state.recipe.getRecipes(); 
       state.recipe.parseIngrediants();

        // calculate servings && time 
        state.recipe.calcTime();
        state.recipe.calcServings();
        
        // render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);


        } catch (err){
            alert("error processing recipe");
        }
        
    }

console.log(state.recipe);



};


// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));




// const r = new Recipe(46956);
// r.getRecipes();
// console.log(r);
