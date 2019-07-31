//controller 
import Search from './models/Search';
import Recipe from './models/Recipes';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import {elements, renderLoader, clearLoader} from "./views/base";
// import Likes from './models/Likes';

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
        //highlight selected 
        if (state.search) searchView.highlightSelected(id);
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
        recipeView.renderRecipe(
            state.recipe,
            state.likes.isLiked(id)
            );


        } catch (err){
            alert("error processing recipe");
        }
        
    }

console.log(state.recipe);



};


// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/**
 * List controller
 */
    const controlList = () => {
        // create new list if no list is present 
        if(!state.list) state.list = new List();
        
        // add each ingredient to the list && UI
        state.recipe.ingredients.forEach(el => {
            const item = state.list.addItem(el.count, el.unit, el.ingredients);
            listView.renderItem(item);
        });
    };

    // handle delete && update list item events 
    elements.shopping.addEventListener('click', e => {
        const id = e.target.closest('.shopping__item').dataset.itemid;

        //handle delete event / btn
        if (e.target.matches('.shopping__delete, .shopping__delete *')){
            // delete from state
            state.list.deleteItem(id);
            //delete from UI
            listView.deleteItem(id);

            //handle count update 
        }else if (e.target.matches('.shopping_count-value')){
            const val = parseFloat(e.target.value, 10);
            state.list.updateCount(id, val);
        }
    });


   

/**
 * Like controller
 */
const controlLike = () => {

    // if(!state.likes) state.likes = new Likes();
    
    const currentID = state.recipe.id;

    //user has not yet liked current recipe 
    if(!state.likes.isLiked(currentID)){

        // add like to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img,
        );
        console.log(state.likes);
       
        //toggle the liked button 
        likesView.toggleLikeBtn(true);

        // add like to UI list 
        likesView.renderLike(newLike);


    // user has like the cuurent recipe 
    }else{
        // remove like to state
        state.likes.deleteLike(currentID);
        console.log(state.likes);

        //toggle the liked button 
        likesView.toggleLikeBtn(false);

        // remove like to UI list 
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumOfLikes());
};


// restore likes recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    // restore likes
    state.likes.readStorage();

    // toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumOfLikes());

    // render existing likes
    state.likes.likes.forEach(like => {
        likesView.renderLike(like);
    });

});





//handling recipe button clicks 
elements.recipe.addEventListener('click', e =>{

    if(e.target.matches(".btn-dec, .btn-dec *")){
        if(state.recipe.servings > 1){
        //dec btn is clicked 
        state.recipe.updateServings("dec");
        recipeView.updateServingsIngr(state.recipe);
        }
    }else if(e.target.matches(".btn-inc, .btn-inc *")){
        //inc btn is clicked 
        state.recipe.updateServings("inc");
        recipeView.updateServingsIngr(state.recipe);
    }else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")){
        controlList();
    }else if (e.target.matches('.recipe__love, .recipe__love *')){
        //like controller 
        controlLike();
    }
        // console.log(state.recipe);
});

// const l = new List;


