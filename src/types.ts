import { Person } from "./utils/Person";

export type ParentPair = [string, string];

export type Parents = ParentPair[];

export type House = {
    name: string,
    definition: string,
    founder: {
        name: string,
        id: string
    },
    begin: number,
};

export type Title = {
    name: string,
    id: number,
    rank: string,
    appellation: string,
    eta: number,
    status: string,
    dissolved?: number,
    succession: string,
    succession_list: string[],
    holder?: {
        name: string,
        id: string
    },
    seat: string,
};
export type Year = {
    current: number,
    total: number,
    // global_stability: number,
    // region_stability: number,
    // local_stability: number,
    // plague_now: boolean,
    // plagues: Plague[],
    // climate: string,
    // crops: string,
    // crop_fortune: number,
    // war_now: boolean,
    // wars: War[]
};

export type EventfulYear = {
    year: number,
    events: NewsItem[],
};

export type Events = EventfulYear[];

export type NewsItem = {
    category: string,
    content: string
};

export type State = {
    // people, dead people, living people?
    houses: House[],
    titles: Title[],
    year: Year,
    sim_check: boolean,
    events: Events,
    contagions: StateContagion[];
    //temporarily living people, parents, dead people
    dead_people: Person[],
    living_people: Person[],
    parents: Parents
}

export type Contagion = {
    type_key: string,
    duration: number[],
    onset_delay: boolean,
    incubation: number[],
    infection_rate: number, // %
    reinfection: boolean,
    effects: {
        // effects are modifiers for different bracket functions (or otherwise??)
        // right now only mortality, but others TBD
        mortality: number 
    }
}

export type StateContagion = {
    type_key: string,
    current_cases: number,
}

export type Action = any;

export type Gene = {
    name: string,
    values: string,
    transfer: string
}

export type Genome = Gene[];

export type DNA = string[];

export interface Condition {
    diseases: Disease[];
    acquired_immunities: string[];
    risk_factors: string[];
    morale: number;
}

export interface Disease {
    type_key: string,
    duration: number, //year
    onset: number, // year value
    effects: {
        mortality: number,
    }
}