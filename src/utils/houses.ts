import type { House, Houses } from "../types";
import { nameMaker } from "./Naming";
import { Person } from "../classes";
// for when a NEW house is founded (at worldgen or otherwise)
export function foundHouse(founder: Person, year: number): House {
    const capitalName = nameMaker('longer');
    return {
        name: capitalName,
        definition: 'The founding family.',
        founder: {
            name: founder.name,
            id: founder.id
        },
        begin: year
    }
};

// for when married to 'preexisting,' historical house

export function historicalHouse(year: number): House {
    const capitalName = nameMaker('longer');
    const yearsAgo = Math.floor(Math.random()*500);
    return {
        name: capitalName,
        definition: 'Another noble family.',
        founder: {
            name: nameMaker('shorter'),
            id: 'prehistorical'
        },
        begin: year - yearsAgo
    }

}


//A new marriage--are they from a new house, or are they from a house we've heard of? Boolean: if TRUE, new house. if FALSE, pick...

export function whetherNewHouse(houses_length: number): boolean {
    const bar = 200 / houses_length;
    const check = Math.ceil(Math.random() * 100)
    return check < bar;
}


export function pickHouse(houses: Houses): House {
    let range = houses.length - 1;
    let pick = Math.floor(Math.random() * range) + 1;
    return houses[pick];

}