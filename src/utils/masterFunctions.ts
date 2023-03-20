import { Houses, NewsItem, Parents, Title } from "../types";
import { allStorks, death, marriageStuff, yearOlder } from "./people";
import { People } from "../classes";

export function okay (current_year: number, living_people: People, dead_people: People, current_houses: Houses, parents: Parents, titles: Title[], events: NewsItem[]): {
    updated_dead: People, updated_living: People, news_items: NewsItem[], updated_houses: Houses, updated_parents: Parents, updated_titles: Title[]
} {

    const { new_deaths, the_living, updated_dead } = death(current_year, living_people, dead_people, titles);

    yearOlder(the_living);

    const {new_spouses, marriage_news, people, available_houses, possible_parents } = marriageStuff(current_year, the_living, current_houses);

    const { new_people, new_children, updated_titles } = allStorks(people, current_year, parents, titles,events)

    const updated_living = [...new_people, ...new_spouses, ...new_children];

    const news_items = [...new_deaths, ...marriage_news]

    const updated_houses = available_houses;

    const updated_parents = [...parents, ...possible_parents]
    
    return {
        updated_dead,
        updated_living,
        news_items,
        updated_houses,
        updated_parents,
        updated_titles
    }
}

