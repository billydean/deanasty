import { State, Action, Person } from "../types";
import { firstPerson } from "../utils/firstPerson";
import { initialState } from "./initialState";
import { isOld }from "../utils/isOld";
import { livingToDead } from "../utils/livingToDead";
import { reaper } from "../utils/reaper";

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
            let oldCheckedPeople = state.living_people.map((person) => {
                if (isOld(person.old_year,state.year.current)) {
                    return reaper(person, state.year.current)
                } else { 
                    return person
                }
            })
            const { living_people, dead_people, death_events } = livingToDead(oldCheckedPeople, state.dead_people);
            const other_year_events = state.events.filter((EventfulYear) => EventfulYear.year !== state.year.current);
            const current_year_events = state.events.find((EventfulYear) => EventfulYear.year === state.year.current)?.events || [];
            

            return {
                ...state,
                year: {
                    ...state.year,
                    current: state.year.current + 1,
                    total: state.year.total + 1
                },
                living_people: living_people,
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