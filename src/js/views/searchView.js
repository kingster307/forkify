import { elements } from "./base";

// view
// console.log("fsdfesd");
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`a[href="#${id}"]`).classList.toggle('results__link--active');
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`
    }
    return title;

};

const renderRecipes = recipe => {
    const markUp = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResultList.insertAdjacentHTML('beforeend', markUp);

};

const createBtn = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1 }">
        <span>Page ${type === 'prev' ? page - 1 : page + 1 }</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : "right" }"></use>
        </svg>
    </button>
` ;

const renderButtons = (page, numOfResults, resPerPage) => {

    const pages = Math.ceil(numOfResults / resPerPage);

    let button;

    if(page === 1 && pages > 1){
        // button to go to next page
        button = createBtn(page, 'next');
    } else if (page < pages){
        //both buttons 
        button = `
            ${createBtn(page, 'prev')}
            ${createBtn(page, 'next')}
        `;
    } else if(page === pages && pages > 1){
        // only button to go to previous page
        button = createBtn(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);

};

export const resendResult = (recipes, page = 1, resPerPage = 10) => {
    //render results of current page 
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipes);


    //render pagination buttons 
    renderButtons(page, recipes.length, resPerPage);

};