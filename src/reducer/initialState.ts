import type { State, StateContagion } from "../types";
import { contagions } from "../utils/Death";

const stateContagions: StateContagion[] = contagions.map(each => {
    return {type_key: each.type_key, current_cases: 0}
})
export const initialState: Readonly<State> = {
    houses: [],
    titles: [],
    year: {
        current: 1000,
        total: 0
    },
    sim_check: false,
    events: [],
    contagions: stateContagions,
    parents: [],
    living_people: [],
    dead_people: []
}