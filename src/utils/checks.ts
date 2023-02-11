// This file contains any logic, tests, or filters used to create or transform slices of state related to the current year or to any generated people
import { People, Person } from "../types";
import { beta } from '@stdlib/random/base';
import { createSpouse } from "./people";

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
export function timeMarchesOn (people: People): People {
    return people.map((person: Person) => {
        const new_age = person.age + 1;
        // let new_fertility = 0; <--- BILLY GO BACK TO USING THIS VARIABLE RATHER THAN DIRECTLY CHANGING PERSON.FERTILITY!!!
        // if (new_age > 40) {
        //     if (person.fertility > 5) {
        //         person.fertility -= 6;
        //     } else {
        //         person.fertility = 0;
        //     }
        // } else if (new_age > 30) {
        //     if (person.fertility > 3) {
        //          person.fertility -= 4;
        //     } else {
        //         person.fertility = 0;
        //     }
        // } else if (new_age > 20) {
        //     if (person.fertility > 1) {
        //         person.fertility -= 2;
        //     } else {
        //         person.fertility = 0;
        //     }
        // }
        return {
            ...person,
            age: new_age
        }
    })
};

// Determines inherent year of death -- will die of "old age" if nothing kills them sooner.
export function inherentOldAge (birth_year: number, modifier: number = 0): number {
    return Math.ceil(beta(5,3) * 60) + 50 + modifier + birth_year
};

// Assigns sex at birth.
export function pickSex (): string {
    const value: number = Math.ceil(Math.random() * 2);
    return value === 1
        ? 'female'
        : 'male'
};

// Assigns fertility at birth.
// Made it lower! Later when I have a "universal bracketing" function, I'll give up the ghost with these beta distributions. Just too finicky
// export function setFertility (): number {
//     return Math.ceil(beta(2,2.5) * 100);
// };

// General-use death-handler
export function reaper (person: Person, year: number): Person {
    return { ...person,
        alive: false,
        death_year: year
    }
};

// People die of old age.
export function dieOldAge (year: number, people: People): People {
    return people.map((person)=> {
        if (person.old_year <= year) {
            return reaper(person, year)
        } else {
            return person
        }
    })
};


// iterates over People and adjusts marital status based on the marriageRate function above.
// export function willYouMarryMe (people: People) {
//     people.forEach((person) => {
//         person.marital_status = marriageRate(person.age);
//     })
// };

// if married person is missing a spouse, this function
//      1. creates a spouse
//      2. ensures respective id for both spouses refer to each other
//      3. sets the spouse's age based on their birth year (N/A!)
//      4. pushes the spouse to the "createdSpouses" array
//      5. pushes an announcement about their marriage to the array of events in state

export function handleMarriage (year: number, person: Person): { spouseID: string, spouse: Person } {
    

    const spouse = createSpouse(person, year);
    const spouseID = spouse.id;
    

    return {
        spouseID,
        spouse
    }

    };
