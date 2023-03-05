import { Houses, NewsItem, Parents, People, Title } from "../types";
import { allStorks, death, marriageStuff, yearOlder } from "./people";

export function okay (current_year: number, living_people: People, dead_people: People, current_houses: Houses, parents: Parents, titles: Title[]): {
    updated_dead: People, updated_living: People, news_items: NewsItem[], updated_houses: Houses, updated_parents: Parents, updated_titles: Title[]
} {

    const { new_deaths, the_living, updated_dead } = death(current_year, living_people, dead_people, titles);

    // const aged_living = timeMarchesOn(the_living);
    yearOlder(the_living);

    const {new_spouses, marriage_news, people, available_houses, possible_parents } = marriageStuff(current_year, the_living, current_houses);

    const { new_people, new_children, baby_news, updated_titles } = allStorks(people, current_year, parents, titles)

    const updated_living = new_people.concat(new_spouses, new_children);
 
    const news_items = new_deaths.concat(marriage_news, baby_news);

    const updated_houses = available_houses;

    const updated_parents = parents.concat(possible_parents)
    
    return {
        updated_dead,
        updated_living,
        news_items,
        updated_houses,
        updated_parents,
        updated_titles
    }
}

