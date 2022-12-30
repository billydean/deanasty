import { People, Person } from "../types";

export function livingToDead (living: People, dead: People): { living_people: People, dead_people: People } {
    let dead_people = dead.concat(living.filter((person: Person) => person.alive === false))
    let living_people = living.filter((person: Person) => person.alive === true )
    return {
        living_people,
        dead_people
    }
}