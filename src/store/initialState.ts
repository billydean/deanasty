import type { State } from '../types';
import { contagions } from '../utils/deathCauses';

const stateContagions = contagions.map(each => {
    return {type_key: each.type_key, current_cases: 0}})

export const initialState: Readonly<State> = {
    dead_people: [],
    living_people: [],
    parents: [],
    houses: [],
    titles: [],
    year: {
        current: 1000,
        total: 0,
        global_stability: 5,
        region_stability: 5,
        local_stability: 5,
        plague_now: false,
        plagues: [],
        climate: 'good',
        crops: 'good',
        crop_fortune: 5,
        war_now: false,
        wars: [],
    },
    sim_check: false,
    events: [],
    contagions: stateContagions,
}
