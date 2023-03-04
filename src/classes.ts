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

export class Person {
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

    constructor(year: number) {
        let sex = pickSex();

        this.name = nameMaker('shorter');
        this.id = uuid() + sex === 'male'
            ? 'M'
            : 'F';
        this.sex = sex;
        this.age = 0;
        this.old_year = inherentOldAge(year);
        this.alive = true;
        this.birth_year = year;
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

// export function firstPerson(year:number): {newPerson: Person, firstHouse: House} {
//     // const birth_year = year;
//     const capitalName = nameMaker('shorter');
//     const newbie: Person = {
//         name: "",
//         id: `${uuid()}M`,
//         sex: 'male', // pickSex() I HATE this, but until I can figure out how to handle different kinds of succession laws, everything is single-sex primogeniture. Must fix this as soon as possible, because it feels gross. But I'm modelling off history (at first). Lame excuse
//         age: 0,
//         old_year: inherentOldAge(year),
//         alive: true,
//         birth_year: year,
//         relations: {
//             family: uuid(),
//             mother: "",
//             father: "",
//             spouse: "",
//             offspring: []
//         },
//         marital_status: false,
//         title_claim: undefined,
//         house: ""
//     }
//     const firstHouse = foundHouse(newbie,year)
//     newbie.house = firstHouse.name;
//     newbie.name = capitalName;


//     return {
//         newPerson: newbie,
//         firstHouse: firstHouse
//     }
// };
