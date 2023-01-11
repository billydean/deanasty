import { People } from "../types";
import { timeMarchesOn } from "./checks";
import { allStorks, death, marriageStuff } from "./people";

export function okay (current_year: number, living_people: People, dead_people: People): {
    updated_dead: People, updated_living: People, news_items: string[]
} {

    const { new_deaths, the_living, updated_dead } = death(current_year, living_people, dead_people);

    const aged_living = timeMarchesOn(the_living);

    const {new_spouses, marriage_news, people } = marriageStuff(current_year, aged_living);

    const { new_people, new_children, baby_news } = allStorks(people, current_year)

    const updated_living = new_people.concat(new_spouses, new_children);

    const news_items = new_deaths.concat(marriage_news, baby_news);

    return {
        updated_dead,
        updated_living,
        news_items
    }
}

