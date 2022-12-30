import type { State } from '../types';


export const initialState: Readonly<State> = {
    dead_people: [],
    living_people: [],
    year: {
        current: 1,
        total: 0,
        global_stability: 5,
        region_stability: 5,
        local_stability: 5,
        plague_now: false,
        climate: 'good',
        crops: 'good',
        crop_fortune: 5,
        war_now: false,
    },
    sim_check: false
}