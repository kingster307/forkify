//model
import axios from 'axios'

export default class Search {
    constructor(query){
        this.query = query;
    }

// import from our module
async getResults() {
    try {
        //const proxy = "https://crossorigin.me/";
        const key = "38490075b54600b580df2902b4c314f4";
        //result value of promise is saved into the res variable 
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        this.result = res.data.recipes;
        // console.log(this.result);
    } catch(err) {
        alert(err.message);
    }
}




}
