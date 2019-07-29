import axios from 'axios';
import { key } from '../config';


export default class Recipes {

    constructor(id) {
        this.id = id;
    }

    async getRecipes() {

        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`)
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            //    console.log(res);

        } catch (er) {
            console.log(er.messgae);
        }
    }

    calcTime() {
        // assuming that we need 15 minutes for each 3 ingredients
        this.numIng = this.ingredients.length;
        const periods = Math.ceil(this.numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngrediants() {

        const unitsLong = ['tablespoons', "tablespoon", "ounce", "ounces", "teaspoon", "teaspoons", "cups", "pounds"];
        const unitsShort = ['tbsp', "tbsp", "oz", "oz", 'tsp', 'tsp', 'cup', 'pound'];



        const newIngrediants = this.ingredients.map(el => {
            //univform units 
            let ingrediant = el.toLowerCase()
            unitsLong.forEach((unit, i) => {
                ingrediant.replace(unit, unitsShort[i]);
            });

            //remove parathesis 
            ingrediant = ingrediant.replace(/ *\([^)]*\) */g, ' ');
            
            //Parse ingrediants into count, units & ingrediants 
            const arrIng = ingrediant.split(" ");
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIngrediant; 

            if(unitIndex > -1){

                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-', '+'));
                }else{
                    count = eval(arrIng.slice(0, unitIndex).join("+"));
                }

                objIngrediant = {
                    count,
                    unit: arrIng[unitIndex],
                    ingrediant: arrIng.slice(unitIndex + 1).join(' '),
                }

            }else if (parseInt(arrIng[0], 10)){

                objIngrediant = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingrediant: arrIng.slice(1).join(' ')
                }

            }else if (unitIndex === -1){
                objIngrediant = {
                    count: 1,
                    unit: '',
                    ingrediant
                }
            }

            return objIngrediant;

        });
        this.ingredients = newIngrediants

    }

}