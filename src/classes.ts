import type {Relations, Disease } from './types';
import { v4 as uuid } from "uuid";
import { nameMaker } from './utils/Naming';
import { beta } from '@stdlib/random/base';

// Assigns sex at birth.
export function pickSex (): string {
    const value: number = Math.ceil(Math.random() * 2);
    return value === 1
        ? 'female'
        : 'male'
};

// Determines inherent year of death -- will die of "old age" if nothing kills them sooner.
export function inherentOldAge (birth_year: number, modifier: number = 0): number {
    return Math.ceil(beta(5,3) * 60) + 50 + modifier + birth_year
};

class Person {
    name: string;
    id: string;
    sex: string;
    age: number;
    old_year: number; // year when "die from natural causes"
    alive: boolean;
    birth_year: number;
    death_year?: number;
    relations: Relations;
    marital_status: boolean;
    house: string;
    title?: {
        name: string; // title.rank of title.name
        address: string; // title.appellation
        id: number; // title.id
    };
    title_claim: number | undefined;
    disease?: Disease[];
    immunity?: string[];

    constructor(year: number, sex: string = pickSex(), age: number = 0) {
        this.name = nameMaker('shorter');
        this.id = uuid() + sex === 'male'
            ? 'M'
            : 'F';
        this.sex = sex;
        this.age = age;
        this.old_year = inherentOldAge(year - age);
        this.alive = true;
        this.birth_year = year - age;
        this.relations = {
            family: uuid(),
            mother: "",
            father: "",
            spouse: "",
            offspring: []
        };
        this.marital_status = false;
        this.house = ""
        this.title_claim = undefined;
    }
}

class Spouse extends Person {
    constructor(year: number, person: Person) {
        if (person.sex === 'female') {
            let age = person.age + Math.floor(Math.random() * 15);
            super(year, 'male', age);
        } else {
            let age = wifeAge(person.age)
            super(year, 'female', age);
        }
        this.relations.spouse = person.id;
        this.marital_status = true;
    }
}



function wifeAge (husband: number): number {
    const threshold = husband - ((husband - 15)/2);
    const minimum = Math.max(15, threshold)
    const maximum = husband + 2
    return Math.floor(Math.random() * (maximum - minimum)) + 15;
}


export { Person, Spouse }

