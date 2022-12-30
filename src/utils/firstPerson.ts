import type { Person } from "../types";
import { deathRate } from "./oldAge";


export function firstPerson(): Person {
    const birth_year: number = 1;

    const newbie: Person = {
        name: "Persy Personson",
        id: 1,
        old_year: deathRate(birth_year),
        family_id: 1,
        mother_id: 0,
        father_id: 0,
        fertility: 100,
        alive: true,
        offspring: [],
        birth_year: birth_year
    }
    return newbie;
}
