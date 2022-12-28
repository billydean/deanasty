import { State, Action } from "../types";
import firstPerson from "../utils/firstPerson";
import { initialState } from "./initialState";

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
            return {
                ...state,
                year: {
                    ...state.year,
                    current: state.year.current + 1,
                    total: state.year.total + 1
                }
            }
            // state.year.current++;
            // state.year.total++;
            // return state;

        default:
            throw Error("I'm not familiar with the action: " + action.type)
    }
}