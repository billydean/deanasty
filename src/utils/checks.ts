// This file contains any logic, tests, or filters used to create or transform slices of state related to the current year or to any generated people
import { Events, People, Person } from "../types";

// Takes array of folks and filters both living and dead arrays
export function filterDeadFolks (living: People): { the_living: People, the_dead: People} {
    return {
        the_living : living.filter((person: Person) => person.alive === true),
        the_dead: living.filter((person: Person) => person.alive === false)}
};

// Creates array of new news items based on people array: new deaths
export function deathNews (dead: People): string[] {
    let array: string[] = [];
    dead.forEach((person: Person) => {
        if (person.death_year) {
            array.push(`${person.name} died at age ${person.age}.`);
        }
    });
    return array;
}

// Function describes "neutral changes," i.e., changes that are constant across populations and are not dynamically determined by other factors in state. Example: increase in age, decrease in fertility, etc.
export function agingProcess (people: People): People {
    return people.map((person: Person) => {
        const new_age = person.age + 1;
        const new_fertility = 
        return {
            ...person
        }
    })
}
export function livingToDead (living: People, dead: People): { living_people: People, dead_people: People, death_events: (string | undefined)[] } {
    let new_dead_people = living.filter((person: Person) => person.alive === false)
    let death_events = new_dead_people.map((person: Person) => {
        if (person.death_year) {
            return `${person.name} died at age ${person.death_year - person.birth_year}.`
        }  else return undefined
    })
    let dead_people = dead.concat(new_dead_people)
    let new_living_people = living.filter((person: Person) => person.alive === true);
    let living_people = new_living_people.map((person: Person) => {
        return {
            ...person,
            age: person.age + 1
        }
    })
    return {
        living_people,
        dead_people,
        death_events
    }
}