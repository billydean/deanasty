import { State, Action, Person, People } from "../types";
import { firstPerson, createSpouse } from "../utils/PeopleMakers";
import { initialState } from "./initialState";
import { livingToDead } from "../utils/livingToDead";
import { agingFertility, checkOldAge, handleMarriages, willYouMarryMe } from "../utils/PeopleCheckers";

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'START_SIM':
            const newPerson: Person = firstPerson();
            const birthMessage: string = newPerson.name + ' was born';
            return {
                ...state,
                sim_check: true,
                living_people: [newPerson],
                events: [
                    ...state.events,
                    { year: state.year.current,
                        events: [birthMessage]
                    }
            ]
            };

        case 'RESET_SIM':
            return initialState;

        case 'INCREMENT_YEAR':
            const peopleCheckedForOld = checkOldAge(state.year.current, state.living_people)

            const { living_people, dead_people, death_events } = livingToDead(peopleCheckedForOld, state.dead_people);

            const other_year_events = state.events.filter((EventfulYear) => EventfulYear.year !== state.year.current);
            const current_year_events = state.events.find((EventfulYear) => EventfulYear.year === state.year.current)?.events || [];

            const createdSpouses: People = []

            // check/adjust fertility based on age bracket
            agingFertility(living_people);

            // check to see if single folks get hitched
            willYouMarryMe(living_people);
            
            //  create spouses with correct id and age, announce marriages in array of current events
            handleMarriages(living_people, state.year.current, createdSpouses, current_year_events);
            
            const new_living_people = living_people.concat(createdSpouses);


            return {
                ...state,
                year: {
                    ...state.year,
                    current: state.year.current + 1,
                    total: state.year.total + 1
                },
                living_people: new_living_people,
                dead_people: dead_people,
                events: [
                    ...other_year_events,
                    {
                        year: state.year.current,
                        events: [...current_year_events, ...death_events]
                    }
                ]
            }

        default:
            throw Error("I'm not familiar with the action: " + action.type)
    }
}