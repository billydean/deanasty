import type { House, Person } from "../types";
import { nameMaker } from "./Naming";


// Only one house for now. Eventually, new houses may appear. And houses may disappear.

export function foundingHouse(founder: Person, year: number): House {
    const {capitalFirst} = nameMaker();

    return {
        name: capitalFirst,
        definition: 'The founding family.',
        founder: {
            name: founder.name,
            id: founder.id
        },
        begin: year
    }
}