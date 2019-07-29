//model
import axios from 'axios'

<<<<<<< HEAD
import {key} from '../config'; 

=======
>>>>>>> 8675776c157914393649dc9207a31bcab27181e9
export default class Search {
    constructor(query){
        this.query = query;
    }

// import from our module
async getResults() {
    try {
        //const proxy = "https://crossorigin.me/";
<<<<<<< HEAD
        // const key = "38490075b54600b580df2902b4c314f4";
        //result value of promise is saved into the res variable 
        // alert(key.key);
=======
        const key = "38490075b54600b580df2902b4c314f4";
        //result value of promise is saved into the res variable 
>>>>>>> 8675776c157914393649dc9207a31bcab27181e9
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        this.result = res.data.recipes;
        // console.log(this.result);
    } catch(err) {
        alert(err.message);
    }
}




}
