import { allStorks, marriageStuff, Person, yearOlder } from "./Person";
import { death } from "./Death";
import { House, NewsItem, Parents, StateContagion, Title } from "../types";

/**
 * 1. everyone gets a year older
 * 2. do people die?
 *  a. consequences for other death functions?
 *  b. mark dead people as dead
 *  c. add obits to news
 * 3. do people get married?
 *  a. create new spouse
 *  b. change marital status(es)
 *  c. add wedding announcements to news
 *  d. if new house, add to houses
 * 4. do people have babies?
 *  a. create new baby
 *  b. add relationships to parent/child
 *  c. add baby news 
 * 5. RETURN
 *      updated people
 *      updated news
 *      updated death stuff (titles, contagions, etc)
 *      updated houses
 * 
 * 
 */

export function ReducerFunction 
(current_year: number, living_people: Person[], dead_people: Person[], current_houses: House[], parents: Parents, titles: Title[], events: NewsItem[], contagions: StateContagion[]): {
    updated_dead: Person[], updated_living: Person[], news_items: NewsItem[], updated_houses: House[], updated_parents: Parents, updated_titles: Title[]
} {

    const { new_deaths, the_living, updated_dead } = death(current_year, living_people, dead_people, titles, contagions);

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
// (
//     current_year: number,
//     people: Person[],
//     titles: [],
//     contagions: []
// ): {
//     updated_people: Person[],
//     updated_titles: [],
//     updated_contagions: []    
// } {
//     const updated_contagions = contagions;
//     const updated_people = people.map(each => each)
//     const updated_titles = titles;
    
//     const {} = death(current_year, people)
//     yearOlder(updated_people);

//     return {
//         updated_people,
//         updated_titles,
//         updated_contagions
//     }
// }