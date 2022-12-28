import { State, Action } from "../types";
import firstPerson from "../utils/firstPerson";
import { initialState } from "./initialState";
import isOld from "../utils/isOld";

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'START_SIM':
            return {
                ...state,
                sim_check: true,
                people: [firstPerson()]
            };

        case 'RESET_SIM':
            return initialState;

        case 'INCREMENT_YEAR':
            // let current = state.year.current;
            return {
                ...state,
                year: {
                    ...state.year,
                    current: state.year.current + 1,
                    total: state.year.total + 1
                },
                people: state.people.map((person) => {
                    if (isOld(person.old_year,state.year.current)) {
                        return {...person, alive: false}
                    } else {
                        return person
                    }
                })
            }
            // state.year.current++;
            // state.year.total++;
            // return state;

        default:
            throw Error("I'm not familiar with the action: " + action.type)
    }
}