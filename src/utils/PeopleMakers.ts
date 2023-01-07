import type { Person } from "../types";
import { deathRate } from "./oldAge";
import { v4 as uuid } from "uuid";
import { pickSex, setFertility } from "./Pickers";
import { nameMaker } from "./Naming";

export function firstPerson(): Person {
    const birth_year: number = 1;
    const {capitalFirst, capitalLast} = nameMaker();

    const newbie: Person = {
        name: `${capitalFirst} ${capitalLast}`,
        id: uuid(),
        sex: pickSex(),
        age: 0,
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
    const {capitalFirst, capitalLast} = nameMaker();
    const sex = person.sex === 'female'
        ? 'male'
        : 'female'
    const birthYear = (person.birth_year - 3) + Math.floor(Math.random() * 7)
    return {
        name: `${capitalFirst} ${capitalLast}`,
        id: uuid(),
        sex: sex,
        age: 0,
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

export function createChild (parent1: Person, parent2: Person, year: number): Person {
    const {capitalFirst, capitalLast} = nameMaker();
    return {
        name: `${capitalFirst} ${capitalLast}`,
        id: uuid(),
        sex: pickSex(),
        age: 0,
        old_year: deathRate(year),
        fertility: setFertility(),
        alive: true,
        birth_year: year,
        relations: {
            family: parent1.relations.family,
            mother: parent1.id,
            father: parent2.id
        },
        marital_status: false
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