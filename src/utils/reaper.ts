import { Person } from "../types";

export function reaper (person: Person, year: number): Person {
    return { ...person,
        alive: false,
        death_year: year
    }
}