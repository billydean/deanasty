import { People, Person } from "../types";

export function livingToDead (living: People, dead: People): { living_people: People, dead_people: People, death_events: (string | undefined)[] } {
    let new_dead_people = living.filter((person: Person) => person.alive === false)
    let death_events = new_dead_people.map((person: Person) => {
        if (person.death_year) {
            return `${person.name} died at age ${person.death_year - person.birth_year}.`
        }  else return undefined
    })
    let dead_people = dead.concat(new_dead_people)
    let living_people = living.filter((person: Person) => person.alive === true )
    return {
        living_people,
        dead_people,
        death_events
    }
}