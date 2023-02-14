import { Houses, Parents, People } from "../types";
import { timeMarchesOn } from "./checks";
import { allStorks, death, marriageStuff } from "./people";

export function okay (current_year: number, living_people: People, dead_people: People, current_houses: Houses, parents: Parents): {
    updated_dead: People, updated_living: People, news_items: string[], updated_houses: Houses, updated_parents: Parents
} {

    const { new_deaths, the_living, updated_dead } = death(current_year, living_people, dead_people);

    const aged_living = timeMarchesOn(the_living);

    const {new_spouses, marriage_news, people, new_houses, possible_parents } = marriageStuff(current_year, aged_living, current_houses);

    const { new_people, new_children, baby_news } = allStorks(people, current_year, parents)

    const updated_living = new_people.concat(new_spouses, new_children);
 
    const news_items = new_deaths.concat(marriage_news, baby_news);

    const updated_houses = current_houses.concat(new_houses)

    const updated_parents = parents.concat(possible_parents)
    
    return {
        updated_dead,
        updated_living,
        news_items,
        updated_houses,
        updated_parents
    }
}

