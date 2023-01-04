import type { Person } from "../types";
import { deathRate } from "./oldAge";
import { v4 as uuid } from "uuid";

export function firstPerson(): Person {
    const birth_year: number = 1;

    const newbie: Person = {
        name: "Persy Personson",
        id: uuid(),
        old_year: deathRate(birth_year),
        fertility: 100,
        alive: true,
        birth_year: birth_year,
        relations: {
            family: uuid(),
        }
    }
    return newbie;
}

