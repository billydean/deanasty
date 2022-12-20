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

interface Person {
    name: string,
    id: number,
    old_year: number, //death date by old age, barring other cause(s)
    family_id: number,
    mother_id: number,
    father_id: number,
    fertility: number,
    alive: boolean,
    offspring?: number[],
    birth_year: number,
    death_year?: number 
}

type People = Person[];

export type { Year, Person, People, War, Plague };


