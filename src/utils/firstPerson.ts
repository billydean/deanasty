import type { Person } from "../types";

export default function () {
    const newbie: Person = {
        name: "Persy Personson",
        id: 1,
        old_year: 75,
        family_id: 1,
        mother_id: 0,
        father_id: 0,
        fertility: 100,
        alive: true,
        offspring: [],
        birth_year: 0
    }
    return newbie;
}
