import type {Relations, Condition, NewsItem } from './types';
import { DNA, bigUnZipper, bigZipper } from './utils/Genetics';
import { v4 as uuid } from "uuid";
import { nameMaker } from './utils/Naming';
import { beta } from '@stdlib/random/base';
import { noParentsDNA } from './utils/Genetics';

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
    dna: DNA;
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
    condition: Condition;
    modifiers: {};
    traits: string[];
    personality?: {
        open: number;
        thoughtful: number;
        impulse: number;
        ambition: number;
        social: number;
        initiative: number;
        trust: number;
        kind: number;
        sad: number;
        stable: number;
        angst: number;
    };

    constructor(year: number, events: NewsItem[], dna: string[] = noParentsDNA(), sex: string = pickSex(), age: number = 0) {
        let tag = sex === 'male'
            ? 'M'
            : 'F';
        this.name = nameMaker('shorter');
        this.id = `${uuid()}${tag}`;
        this.dna = dna;
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
        this.house = "";
        this.title_claim = undefined;
        this.condition = {
            diseases : [],
            acquired_immunities: [],
            risk_factors: [],
            morale: 0
        };
        this.modifiers = {
            fertility: 1,
            eligibility: 1,
            slapstick: 1,
            luck: 1,
        };
        this.traits = [];
        // this.personality = {
        //     open: parseInt(dna[5]),
        //     thoughtful: parseInt(dna[6]),
        //     impulse: parseInt(dna[7]),
        //     ambition: parseInt(dna[8]),
        //     social: parseInt(dna[9]),
        //     initiative: parseInt(dna[10]),
        //     trust: parseInt(dna[11]),
        //     kind: parseInt(dna[12]),
        //     sad: parseInt(dna[13]),
        //     stable: parseInt(dna[14]),
        //     angst: parseInt(dna[15]),
        // }
        bigUnZipper(this,dna,events)
    }
}

class Spouse extends Person {
    constructor(year: number, person: Person, events: NewsItem[]) {
        if (person.sex === 'female') {
            let age = person.age + Math.floor(Math.random() * 15);
            super(year, events, noParentsDNA(), 'male', age);
        } else {
            let age = wifeAge(person.age)
            super(year, events, noParentsDNA(),'female', age);
        }
        this.relations.spouse = person.id;
        this.marital_status = true;
    
    }
}

class Child extends Person {
    constructor (parent1: Person, parent2: Person, year: number, events: NewsItem[]) {
        let childDNA = bigZipper(parent1.dna, parent2.dna);
        super(year, events, childDNA);
        // this.dna = childDNA;
        this.relations.family = parent2.relations.family;
        this.relations.mother = parent1.id;
        this.relations.father = parent2.id;
        this.house = parent2.house;
       
        events.unshift({category: 'birth', content: `${this.name} of House ${this.house} was born to ${parent1.name} ${parent1.house} and ${parent2.name} ${parent2.house}.`})
        

    }
}

function wifeAge (husband: number): number {
    const threshold = husband - ((husband - 15)/2);
    const minimum = Math.max(15, threshold)
    const maximum = husband + 2
    return Math.floor(Math.random() * (maximum - minimum)) + 15;
}

export type People = Person[];

export { Person, Spouse, Child }

