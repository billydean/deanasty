import type { Person } from "../types";
import { deathRate } from "./oldAge";
import { v4 as uuid } from "uuid";
import { pickSex, setFertility } from "./Pickers";
import { nameMaker } from "./Naming";

export function firstPerson(): Person {
    const birth_year: number = 1;
    const {first, last} = nameMaker();

    const newbie: Person = {
        name: `${first} ${last}`,
        id: uuid(),
        sex: pickSex(),
        old_year: deathRate(birth_year),
        fertility: setFertility(),
        alive: true,
        birth_year: birth_year,
        relations: {
            family: uuid(),
        },
        marital_status: false
    }
    return newbie;
}


export function createSpouse(person: Person): Person {
    const {first, last} = nameMaker();
    const sex = person.sex === 'female'
        ? 'male'
        : 'female'
    const birthYear = (person.birth_year - 3) + Math.floor(Math.random() * 7)
    return {
        name: `${first} ${last}`,
        id: uuid(),
        sex: sex,
        birth_year: birthYear,
        old_year: deathRate(birthYear),
        fertility: setFertility(),
        alive: true,
        relations: {
            family: uuid(),
            spouse: person.id
        },
        marital_status: true
    }
}


/**
 * all are checked for marriage
 * married yes but spouse no?
 * new array of created spouse(s)
 * iterate over living people for each created spouse
 *  lp id == spouse id? add to spouse id
 * then add created spouses to living people
 * 
 * 
 */