//controller 
import Search from './models/Search';
import * as searchView from "./views/searchView";
import {elements} from "./views/base";

// global state of the app
const state = {};

const controlSeach = async () => {
    // get the query from the view
    const query = searchView.getInput();

    if (query){
        //new search object && add it to state 
        state.search = new Search(query);

        //prepare UI for results 
        searchView.clearInput();
        searchView.clearResults();

        //search for recipieces ---> /returns promise 
        await state.search.getResults();

        //render results on UI
        searchView.resendResult(state.search.result);
    }

};

//event listener for the form 
elements.searchForm.addEventListener("submit", e => {
    //prevents the default action --> in this instance it wont reload the page 
    e.preventDefault();
    controlSeach();

});



// const search    = new Search("pizza");



// console.log(search)
// search.getResults();

