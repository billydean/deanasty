interface Plague {
    name: string,
    effect: string
}

interface War {
    name: string,
    sd: number, //starting date
    participants: string[]
}
interface Year {
    current: number,
    total: number,
    global_stability: number,
    region_stability: number,
    local_stability: number,
    plague_now: boolean,
    plagues?: Plague[],
    climate: string,
    crops: string,
    crop_fortune: number,
    war_now: boolean,
    wars?: War[]
}

interface Relations {
    family: string;
    mother?: string;
    father?: string;
    spouse?: string;
    offspring?: string[];
}

interface Person {
    name: string,
    id: string,
    sex: string,
    old_year: number, //death date by old age, barring other cause(s)
    fertility: number,
    alive: boolean,
    birth_year: number,
    death_year?: number,
    relations: Relations
}

type People = Person[];

type Events = EventfulYear[]

type EventfulYear = {
    year: number;
    events: (string | undefined)[]
}

interface State {
    dead_people: People;
    living_people: People;
    year: Year;
    sim_check: boolean;
    events: Events;
}

type Action = any;

export type { Year, Person, People, War, Plague, State, Action, Events, EventfulYear };


