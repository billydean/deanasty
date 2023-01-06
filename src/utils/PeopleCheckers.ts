import { People, Person } from "../types"
import { beta } from '@stdlib/random/base';
import { createSpouse } from "./PeopleMakers";


export function deathRate(birth_year: number, modifier: number = 0): number {
    return Math.ceil(beta(5,3) * 60) + 50 + modifier + birth_year
}

export function reaper (person: Person, year: number): Person {
    return { ...person,
        alive: false,
        death_year: year
    }
};


export function checkOldAge (year: number, people: People): People {
    return people.map((person)=> {
        if (person.old_year <= year) {
            return reaper(person, year)
        } else {
            return person
        }
    })
}

export function agingFertility (people: People) {
    people.forEach((person) => {
        if (person.age > 40) {
            if (person.fertility >= 5) {
                person.fertility -= 5;
            } else {
                person.fertility = 0;
            }
        } else if (person.age > 30) {
            if (person.fertility >= 3) {
                person.fertility -= 3;
            } else {
                person.fertility = 0;
            }
        } else if (person.age > 20) {
            if (person.fertility > 0) {
                person.fertility--;
            } else {
                person.fertility = 0;
            }
        }
    })
}
 
/**
 * 
 * @param age Age of person in question, influences chances of success.
 * 
 * Note: Other parameters may be added!
 */
export function marriageRate (age: number): boolean {
    const check: number = Math.floor(age / 5);
    const picker: number = Math.ceil(Math.random() * 2560)
    
    switch (check) {
        case 3: return picker <= 64
        case 4: return picker <= 384
        case 5: return picker <= 384
        case 6: return picker <= 128
        case 7: return picker <= 128
        case 8: return picker <= 32
        case 9: return picker <= 32
        case 10: return picker <= 16
        case 11: return picker <= 8
        case 12: return picker <= 4
        case 13: return picker <= 4
        case 14: return picker <= 2
        case 15: return picker === 1
        default: return false;
    }
};

// iterates over People and adjusts marital status based on the marriageRate function above.
export function willYouMarryMe (people: People) {
    people.forEach((person) => {
        person.marital_status = marriageRate(person.age);
    })
};

// if married person is missing a spouse, this function
//      1. creates a spouse
//      2. ensures respective id for both spouses refer to each other
//      3. sets the spouse's age based on their birth year
//      4. pushes the spouse to the "createdSpouses" array
//      5. pushes an announcement about their marriage to the array of events in state

export function handleMarriages (people: People, year: number, new_spouses: People, events: (string|undefined)[]) {
    people.forEach((person) => {
        if (person.marital_status === true && !person.relations.spouse) {
            const spouse = createSpouse(person); // step 1
            person.relations.spouse = spouse.id; // step 2
            spouse.age = year - spouse.birth_year; // step 3
            new_spouses.push(spouse); // step 4
            events.push(`${person.name} and ${spouse.name} joined hands in marriage.`); // step 5
        }
    })
}
