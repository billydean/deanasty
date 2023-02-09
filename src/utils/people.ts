import type { House, Houses, People, Person } from "../types"
import { v4 as uuid } from "uuid";
import { deathNews, dieOldAge, filterDeadFolks, handleMarriage, inherentOldAge, pickSex, setFertility, willYouMarryMe } from "./checks";
import { nameMaker } from "./Naming";
import { foundHouse, historicalHouse, pickHouse, whetherNewHouse } from "./houses";

// People Makers
export function firstPerson(year:number): {newPerson: Person, firstHouse: House} {
    // const birth_year = year;
    const capitalName = nameMaker('shorter');
    const newbie: Person = {
        name: "",
        id: uuid(),
        sex: 'male', // pickSex() I HATE this, but until I can figure out how to handle different kinds of succession laws, everything is single-sex primogeniture. Must fix this as soon as possible, because it feels gross. But I'm modelling off history (at first). Lame excuse
        age: 0,
        old_year: inherentOldAge(year),
        fertility: setFertility(),
        alive: true,
        birth_year: year,
        relations: {
            family: uuid(),
            mother: "",
            father: "",
            spouse: "",
            offspring: []
        },
        marital_status: false,
        house: ""
    }
    const firstHouse = foundHouse(newbie,year)
    newbie.house = firstHouse.name;
    newbie.name = `${capitalName} ${firstHouse.name}`


    return {
        newPerson: newbie,
        firstHouse: firstHouse
    }
}

export function createSpouse(person: Person, year: number): Person {
    const capitalFirst = nameMaker('shorter');
    const sex = person.sex === 'female'
        ? 'male'
        : 'female'
    const birthYear = (person.birth_year - 3) + Math.floor(Math.random() * 7)
    return {
        name: `${capitalFirst} `,
        id: uuid(),
        sex: sex,
        age: year - birthYear,
        birth_year: birthYear,
        old_year: inherentOldAge(birthYear),
        fertility: setFertility(),
        alive: true,
        relations: {
            family: uuid(),
            mother: "",
            father: "",
            spouse: person.id,
            offspring: []
        },
        marital_status: true,
        house: 'placeholder'
    }
}

export function createChild (parent1: Person, parent2: Person, year: number): Person {
    const capitalName = nameMaker('shorter');
    const lastName = parent2.house;
    return {
        name: `${capitalName} ${lastName}`,
        id: uuid(),
        sex: pickSex(),
        age: 0,
        old_year: inherentOldAge(year),
        fertility: setFertility(),
        alive: true,
        birth_year: year,
        relations: {
            family: parent1.relations.family,
            mother: parent1.id,
            father: parent2.id,
            spouse: "",
            offspring: []
        },
        marital_status: false,
        house: lastName
    }
}

// Death, so sad
// Maps over people --> Die?
// Sorts out newly departed and survivors
// Creates news items for newly departed
// Returns news, updated living array, and updated dead array
export function death (year: number, living_people: People, dead_people: People): {new_deaths: string[], the_living: People, updated_dead: People} {
    const sorted = dieOldAge(year,living_people);
    const {the_living, the_dead} = filterDeadFolks(sorted);
    const new_deaths = deathNews(the_dead);
    const updated_dead = dead_people.concat(the_dead);
    return {
        new_deaths,
        the_living,
        updated_dead
    }
}

// Love and Marriage...

export function marriageStuff (year: number, living_people: People, houses: Houses): {new_spouses: People, marriage_news: string[], people: People, new_houses: Houses} {
    let dummy = 0; // ignore this for now
    let new_spouses: People = [];
    let new_houses: Houses = [];
    let available_houses: Houses = new_houses.concat(houses)
    let marriage_news: string[] = [];
    let people = living_people;
    for (let i=0; i<people.length; i++) {
        if (people[i].marital_status === true) {
            dummy = 0;
        } else {
            let test = willYouMarryMe(people[i].age);
            if ( test === true ) {
                people[i].marital_status = true;
                const { spouseID, wedding_news, spouse} = handleMarriage(year, people[i]);
                let house_test = whetherNewHouse(available_houses.length);
                let spouseHouse;
                if (house_test) {
                    spouseHouse = historicalHouse(year);
                    new_houses.push(spouseHouse);
                    available_houses.push(spouseHouse);
                } else {
                    spouseHouse = pickHouse(available_houses)
                };
                spouse.house = spouseHouse.name;
                spouse.name += spouseHouse.name;
                people[i].relations.spouse = spouseID;
                new_spouses.push(spouse);
                marriage_news.push(wedding_news);
            } else {
                dummy = 0; // eslint-disable-line
            }

    }
    
}
// first, let's try WITHOUT mapping new array. is the above for loop sufficient???
return {
    new_spouses,
    marriage_news,
    people,
    new_houses
}
}

export function allStorks(people: People, year: number): {new_people: People, new_children: People, baby_news: string[]} {
    let new_children: People = [];
    let baby_news: string[] = [];
    let dummy = 0; // ignore for now...

    const mothers = people.filter((person: Person) => person.sex === 'female' && person.marital_status === true && person.fertility > 0);

    for (let i=0; i<mothers.length; i++) {
        const seed = Math.ceil(Math.random() * 100);
        const match = people.find((person) => person.id === mothers[i].relations.spouse);
        if (typeof match !== 'undefined' && mothers[i].fertility > seed && match.fertility > seed) {

            const {baby, baby_announcement} = individualStork(mothers[i],match,year);

            new_children.push(baby);

            baby_news.push(baby_announcement);
        } else {
            dummy = 0; // eslint-disable-line
        }
    }
 
    const new_people: People = people.map((person: Person) => {
        const spawn = new_children.find((kid) => person.id === kid.relations.mother || person.id === kid.relations.father);
        if (typeof spawn !== 'undefined') {
            return {
                ...person,
                relations: {
                    ...person.relations,
                    offspring: [
                        ...person.relations.offspring,
                        spawn.id
                    ]
                }
            }
        } else {
            return person 
        }
    });

    return {
        new_people,
        new_children,
        baby_news
    }
}

export function individualStork (mother: Person, father: Person, year: number): { baby: Person, baby_announcement: string} {
    const baby = createChild(mother,father,year);
    const baby_announcement = `${baby.name} was born to ${mother.name} and ${father.name}.`
    return {
        baby,
        baby_announcement
    };
    
}