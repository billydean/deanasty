import { State, Action, Person, House } from "../types";
// import { firstPerson } from "../utils/PeopleMakers";
import { initialState } from "./initialState";
// import { livingToDead } from "../utils/livingToDead";
import { firstPerson } from "../utils/people";
// import { agingFertility, checkOldAge, coordinateSpouseIDs, handleMarriages, stork, willYouMarryMe } from "../utils/PeopleCheckers";
import { okay } from "../utils/masterFunctions";
import { firstTitle } from "../utils/titles";

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'START_SIM':
            const { newPerson, firstHouse } = firstPerson(state.year.current)
            const birthMessage: string = `${newPerson.name} ${newPerson.house} was born.`;
            const houseMessage: string = `The ${firstHouse.name} dynasty begins with the birth of ${newPerson.name}.`
            const {title, title_news} = firstTitle(state.year.current, newPerson);
            newPerson.title = {
                name: `${title.rank} of ${title.name}`,
                address: title.appellation,
                id: title.id
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
                        events: [birthMessage, houseMessage, title_news]
                    }
            ]
            };

        case 'RESET_SIM':
            return initialState;

        case 'INCREMENT_YEAR':

            // const peopleCheckedForOld = checkOldAge(state.year.current, state.living_people)

            // I know I'm playing fast and loose with 'less'! Not being able to quickly concatenate arrays led to dozens of new mapped arrays, which became hard to follow (and it was hard to settle on a naming convention that was easy to parse over the course of a dozen (potentially dozens) different checks). 
            // let { living_people, dead_people, death_events } = livingToDead(peopleCheckedForOld, state.dead_people);

            const other_year_events = state.events.filter((EventfulYear) => EventfulYear.year !== state.year.current);
            const current_year_events = state.events.find((EventfulYear) => EventfulYear.year === state.year.current)?.events || [];

            // // bucket arrays for later
            // let createdBabies: People = [];

            // // check/adjust fertility based on age bracket
            // living_people = (agingFertility(living_people));

            // // check to see if single folks get hitched
            // willYouMarryMe(living_people);
            
            // //  create spouses with correct id and age, announce marriages in array of current events
            // const { new_spouses, new_news } = handleMarriages(living_people, state.year.current);

            // living_people = coordinateSpouseIDs(new_spouses, living_people);
            
            // // check living couples for new babies, based on both fertility rates
            // stork(living_people, createdBabies, current_year_events, state.year.current);

            // const new_living_people = living_people.concat(new_spouses, createdBabies);
            // console.log(new_spouses)

            /**
             * 
             * ok....
             * 
             * big trouble...
             * 
             * either need to revert to when things were working
             * 
             * OORRRR combine into one huge handler
             * 
             * three modules:
             *  1. checks and logic handlers
             *  2. people creaters and people arrays
             *  3. big handler, calling on #1 to spit out people/make changes to #2
             *      3b. big handler for processing any check that DOESN'T involve new people (aging up, fertility, etc)
             * 
             * Then a function to stitch all the people arrays together.
             */
            const { updated_dead, updated_living, news_items, updated_houses } = okay(state.year.current,state.living_people,state.dead_people, state.houses)
            return {
                ...state,
                year: {
                    ...state.year,
                    current: state.year.current + 1,
                    total: state.year.total + 1
                },
                living_people: updated_living,
                dead_people: updated_dead,
                houses: updated_houses,
                events: [
                    ...other_year_events,
                    {
                        year: state.year.current,
                        events: [...current_year_events, ...news_items]
                    }
                ]
            }

        default:
            throw Error("I'm not familiar with the action: " + action.type)
    }
}