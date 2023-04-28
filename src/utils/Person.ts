import type { Parents, NewsItem, DNA, Condition, Title, House } from "../types";
import { nameMaker } from "./Name";
import { noParentsDNA, bigUnZipper,bigZipper } from "./Genetics";
import { v4 as uuid } from "uuid";
import {beta} from '@stdlib/random/base';
import { babyOnTheWay, willYouMarryMe } from "./Brackets";
import { checkSuccessionAtBirth } from "./Title";
import { pickHouse, historicalHouse, whetherNewHouse } from "./House";

// Assigns sex at birth.
export function pickSex (): string {
    const value: number = Math.ceil(Math.random() * 2);
    return value === 1
        ? 'female'
        : 'male'
};

// Determines inherent year of death -- will die of "old age" if nothing kills them sooner.
export function inherentOldAge (birth_year: number, modifier: number = 0): number {
    return Math.ceil(beta(5,3) * 90) + 20 + modifier + birth_year
};

export function yearOlder (people: Person[]) {
    for (let i=0; i<people.length;i++) {
        people[i].age++;
    }
}

class Person {
    name: string;
    id: string;
    dna: DNA;
    sex: string;
    age: number;
    old_year: number;
    alive: boolean;
    birth_year: number;
    death_year?: number;
    relations: {
        mother: string;
        father: string;
        spouse: string;
        offspring: string[]
    };
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

    constructor(year: number, events: NewsItem[], dna: DNA = noParentsDNA(), sex: string = pickSex(), age: number = 0) {
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

        bigUnZipper(this,dna,events)
    }
};

function wifeAge (husband: number): number {
    const threshold = husband - ((husband - 15)/2);
    const minimum = Math.max(15, threshold)
    const maximum = husband + 2
    return Math.floor(Math.random() * (maximum - minimum)) + 15;
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

class Descendant extends Person {
    constructor (parent1: Person, parent2: Person, year: number, events: NewsItem[]) {
        let childDNA = bigZipper(parent1.dna, parent2.dna);
        super(year, events, childDNA);
        // this.dna = childDNA;
        this.relations.mother = parent1.id;
        this.relations.father = parent2.id;
        this.house = parent2.house;
       
        events.unshift({category: 'birth', content: `${this.name} of House ${this.house} was born to ${parent1.name} ${parent1.house} and ${parent2.name} ${parent2.house}.`})
        

    }
}

export function handleMarriage (year: number, person: Person, events: NewsItem[]): { spouseID: string, spouse: Person } {
    

    const spouse = new Spouse(year,person, events);
    const spouseID = spouse.id;
    
    return {
        spouseID,
        spouse
    }
    };

    export function marriageStuff (year: number, people: Person[], houses: House[]): {new_spouses: Person[], marriage_news: NewsItem[], people: Person[], available_houses: House[], possible_parents: Parents} {

        let new_spouses: Person[] = [];
        let available_houses: House[] = [...houses];
        let marriage_news: NewsItem[] = [];
        let possible_parents: Parents = [];
    
        for (let i=0; i<people.length; i++) {
            if (people[i].marital_status === false) {
                let test = willYouMarryMe(people[i].age);
                if ( test === true ) {
                    people[i].marital_status = true;
                    let single_marriage_news: NewsItem[] = []
                    const { spouseID, spouse} = handleMarriage(year, people[i],single_marriage_news);
                    let house_test = whetherNewHouse(available_houses.length);
                    let spouseHouse;
                    if (house_test) {
                        spouseHouse = historicalHouse(year);
                        available_houses.push(spouseHouse);
                    } else {
                        spouseHouse = pickHouse(available_houses)
                    };
                    people[i].relations.spouse = spouseID;
                    single_marriage_news.unshift({category: 'marriage', content: `${people[i].name} ${people[i].house} marries ${spouse.name} from House ${spouseHouse.name}.`});
                    spouse.house = spouseHouse.name;
                    new_spouses.push(spouse)
                    possible_parents.push([people[i].id,spouse.id]);
                    marriage_news = [...marriage_news, ...single_marriage_news];
                } 
    
        }
        
    }
    // first, let's try WITHOUT mapping new array. is the above for loop sufficient???
    return {
        new_spouses,
        marriage_news,
        people,
        available_houses,
        possible_parents
    }
    }
    
    export function allStorks(people: Person[], year: number, parents: Parents, titles: Title[], events: NewsItem[]): {new_people: Person[], new_children: Person[], updated_titles: Title[]} {
        let new_children: Person[] = [];
        // let baby_news: NewsItem[] = [];
    
        for (let i=0; i<parents.length; i++) {
            
            const parent1: Person | undefined = people.find((person: Person) => person.id === parents[i][0]);
            const parent2: Person | undefined = people.find((person: Person) => person.id === parents[i][1]);
    
            if (parent1 !== undefined && parent2 !== undefined) {
                if (parent1.sex === 'female' && babyOnTheWay(parent1.age)) {
                    let baby_news: NewsItem[] = [];
                    const {baby} = individualStork(parent1,parent2,year, baby_news);
                    baby_news.forEach((each: NewsItem) => events.push(each));
                    if (parent1.title_claim !== undefined) {
                        const relevant_title = titles.find(title => title.id === parent1.title_claim);
                        if (relevant_title !== undefined) {
                            const {updated_succession_list, child_title} = checkSuccessionAtBirth(relevant_title, parent1, baby); 
                            relevant_title.succession_list = updated_succession_list;
                            baby.title_claim = child_title;
                        }
                    };
                    if (parent2.title_claim !== undefined) {
                        const relevant_title = titles.find(title => title.id === parent2.title_claim);
                        if (relevant_title !== undefined) {
                            const {updated_succession_list, child_title} = checkSuccessionAtBirth(relevant_title, parent2, baby); 
                            relevant_title.succession_list = updated_succession_list;
                            baby.title_claim = child_title;
                        }
                    };
                    new_children.push(baby);
                    // baby_news.push(baby_announcement);
                    parent1.relations.offspring.push(baby.id);
                    parent2.relations.offspring.push(baby.id);
                }
                else if (parent2.sex === 'female' && babyOnTheWay(parent2.age)) {
                    let baby_news: NewsItem[] = [];
                    const {baby} = individualStork(parent2,parent1,year,baby_news);
                    baby_news.forEach((each: NewsItem) => events.push(each));
                    if (parent1.title_claim !== undefined) {
                        const relevant_title = titles.find(title => title.id === parent1.title_claim);
                        if (relevant_title !== undefined) {
                            const {updated_succession_list, child_title} = checkSuccessionAtBirth(relevant_title, parent1, baby); 
                            relevant_title.succession_list = updated_succession_list;
                            baby.title_claim = child_title;
                        }
                    };
                    if (parent2.title_claim !== undefined) {
                        const relevant_title = titles.find(title => title.id === parent2.title_claim);
                        if (relevant_title !== undefined) {
                            const {updated_succession_list, child_title} = checkSuccessionAtBirth(relevant_title, parent2, baby); 
                            relevant_title.succession_list = updated_succession_list;
                            baby.title_claim = child_title;
                        }
                    };
                    new_children.push(baby);
                    parent1.relations.offspring.push(baby.id);
                    parent2.relations.offspring.push(baby.id);
                    
                }
            }
    
    
    
        }
    
        const new_people = people;
        const updated_titles = titles;
        
        return {
            new_people,
            new_children,
            // baby_news, 
            updated_titles
        }
    }
    
    export function individualStork (mother: Person, father: Person, year: number, events:NewsItem[]): { baby: Person } {
        const baby =  new Descendant (mother,father,year,events);
        return {
            baby,
        };
        
    }

export { Person, Spouse, Descendant }