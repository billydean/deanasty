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
    plagues: Plague[],
    climate: string,
    crops: string,
    crop_fortune: number,
    war_now: boolean,
    wars: War[]
}

interface Relations {
    family: string;
    mother: string;
    father: string;
    spouse: string;
    offspring: string[];
    /**
     * avenir:
     *  - attitude/relationship with each relation?
     *  - friends? other relations?
     */
}

interface Person {
    name: string,
    id: string,
    sex: string,
    age: number,
    old_year: number, //death date by old age, barring other cause(s)
    alive: boolean,
    birth_year: number,
    death_year?: number,
    relations: Relations,
    marital_status: boolean,
    house: string,
    title?: {
        name: string, // pulled from 'rank' and 'name' of Title. 'Rank of Name'
        address: string, // 'appellation' in Title
        id: number, // matches Title id (for other checks/calculations)
    },
    title_claim: number | undefined,
    /**
     * avenir
     *  - claim (to titles extant or otherwise)
     */
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
    houses: Houses;
    titles: Titles;
    year: Year;
    sim_check: boolean;
    events: Events;
    parents: Parents;
}

type Action = any;

interface House {
    name: string,
    definition: string,
    founder: {
        name: string,
        id: string
    },
    begin: number,
    /**
     * avenir:
     *  - accomplishments or events?
     *  - current head
     *  - notable members?
     *  - dissolved?
     */
};

interface Title {
    name: string,
    id: number,
    rank: string,
    appellation: string,
    eta: number,
    status: string,
    dissolved?: number,
    succession: string, // will eventually delineate different succession models,
    succession_list: SuccessionList,
    holder?: {
        name: string,
        id: string
    },
    seat: string, // eventually geographical types?
    /**
     * avenir:
     *  - history
     *  - size
     *  - rank
     *  - parent/child titles, if applicable
     *  - claimants
     */
};

type SuccessionList = SuccessionTuple[];

type SuccessionTuple = [string, string[]]

type Houses = House[];

type Titles = Title[];

type ParentPair = [string, string];

type Parents = ParentPair[];

export type { Year, Person, People, War, Plague, State, Action, Events, EventfulYear, Title, House, Houses, ParentPair, Parents, SuccessionList, SuccessionTuple };


