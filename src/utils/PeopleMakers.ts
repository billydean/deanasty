import type { Person } from "../types";
import { deathRate } from "./oldAge";
import { v4 as uuid } from "uuid";
import { pickSex } from "./Pickers";

export function firstPerson(): Person {
    const birth_year: number = 1;

    const newbie: Person = {
        name: "Persy Personson",
        id: uuid(),
        sex: pickSex(),
        old_year: deathRate(birth_year),
        fertility: 100,
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
    const sex = person.sex === 'female'
        ? 'male'
        : 'female'
    const birthYear = (person.birth_year - 4) + Math.floor(Math.random() * 9)
    return {
        name: "name",
        id: uuid(),
        sex: sex,
        birth_year: birthYear,
        old_year: deathRate(birthYear),
        fertility: 100,
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