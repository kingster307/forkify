export const elements = {

    searchInput:  document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
<<<<<<< HEAD
    searchRes: document.querySelector('.results'),
    searchResultList: document.querySelector(".results__list"),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')

};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
};
=======
    searchResultList: document.querySelector(".results__list")

}
>>>>>>> 8675776c157914393649dc9207a31bcab27181e9