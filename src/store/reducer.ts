import { State, Action, NewsItem } from "../types";
import { Person } from '../classes'
import { initialState } from "./initialState";
import { okay } from "../utils/masterFunctions";
import { firstTitle } from "../utils/titles";
import { foundHouse } from "../utils/houses";

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'START_SIM':
            // CONSIDER: Migrating "first person" stuff into dedicated module
            const firstEvents: NewsItem[] = [];
            const newPerson = new Person(state.year.current,firstEvents);
            const firstHouse = foundHouse(newPerson, state.year.current);
            newPerson.house = firstHouse.name;
            const birthMessage: NewsItem = {category: 'birth', content: `${newPerson.name} ${newPerson.house} was born.`};
            const houseMessage: NewsItem = {category: 'house', content: `The ${firstHouse.name} dynasty begins with the birth of ${newPerson.name}.`}
            const {title, title_news} = firstTitle(state.year.current, newPerson);
            newPerson.title = {
                name: `${title.rank} of ${title.name}`,
                address: title.appellation,
                id: title.id
            };
            newPerson.title_claim = title.id;
            title.succession_list = [newPerson.id];
            title.holder = {
                name: `${newPerson.name} of House ${newPerson.house}`,
                id: newPerson.id
            }
            return {
                ...state,
                sim_check: true,
                living_people: [newPerson],
                houses: [firstHouse],
                titles: [title],
                events: [
                    ...state.events,
                    { year: state.year.current,
                        events: [birthMessage, ...firstEvents, houseMessage, title_news]
                    }
            ]
            };

        case 'RESET_SIM':
            return initialState;

        case 'INCREMENT_YEAR':

            // Lost notes --> Why was this step included again?
            const other_year_events = state.events.filter((EventfulYear) => EventfulYear.year !== state.year.current);
            const current_year_events = state.events.find((EventfulYear) => EventfulYear.year === state.year.current)?.events || [];

            // Note: "okay" is dummy title for master function. May need to be split in future; certainly renamed before all said and done
            const { updated_dead, updated_living, news_items, updated_houses, updated_parents, updated_titles } = okay(state.year.current,state.living_people,state.dead_people, state.houses, state.parents, state.titles, current_year_events, state.contagions)

            const new_current_year_events = [...current_year_events, ...news_items];
            
            return {
                ...state,
                year: {
                    ...state.year,
                    current: state.year.current + 1,
                    total: state.year.total + 1
                },
                living_people: updated_living,
                dead_people: updated_dead,
                parents: updated_parents,
                houses: updated_houses,
                titles: updated_titles,
                events: 
                    new_current_year_events.length > 0
                        ? [...other_year_events, { year: state.year.current, events: [...new_current_year_events]}]
                        : [...other_year_events]
                
            }

        default:
            throw Error("I'm not familiar with the action: " + action.type)
    }
}