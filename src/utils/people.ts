import type { House, Houses, NewsItem, Parents, People, Person, Title } from "../types"
import { v4 as uuid } from "uuid";
import { dieAccident, dieContagion, dieOldAge, filterDeadFolks, handleMarriage, inherentOldAge, pickSex } from "./checks";
import { nameMaker } from "./Naming";
import { foundHouse, historicalHouse, pickHouse, whetherNewHouse } from "./houses";
import { babyOnTheWay, willYouMarryMe } from "./Brackets";
import { checkSuccessionAtBirth } from "./titles";
import { Child } from '../classes'

// People Makers
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
 

// distance from 15yo
// distance / 2
// random times that!
// + 15
// (age - 15) / 2
// function wifeAge (husband: number): number {
//     const threshold = husband - ((husband - 15)/2);
//     const minimum = Math.max(15, threshold)
//     const maximum = husband + 2
//     return Math.floor(Math.random() * (maximum - minimum)) + 15;
// }

// export function createSpouse(person: Person, year: number): Person {
//     const capitalFirst = nameMaker('shorter');
//     const sex = person.sex === 'female'
//         ? 'male'
//         : 'female'
//     const sexed_id = sex === 'female'
//         ? 'F'
//         : 'M'
//     const spouse_age = person.sex === 'male'
//         ? wifeAge(person.age)
//         : person.age + Math.floor(Math.random() * 15);
//     return {
//         name: capitalFirst,
//         id: `${uuid()}${sexed_id}`,
//         sex: sex,
//         age: spouse_age,
//         birth_year: year - spouse_age,
//         old_year: inherentOldAge(year - spouse_age),
//         alive: true,
//         relations: {
//             family: uuid(),
//             mother: "",
//             father: "",
//             spouse: person.id,
//             offspring: []
//         },
//         marital_status: true,
//         title_claim: undefined,
//         house: 'placeholder'
//     }
// }

// export function createChild (parent1: Person, parent2: Person, year: number): Person {
//     const capitalName = nameMaker('shorter');
//     const lastName = parent2.house;
//     let babysClaim = undefined;
//     const assigned_sex = pickSex();
//     const sexed_id = assigned_sex === 'female'
//         ? 'F'
//         : 'M'
        
//     return {
//         name: capitalName,
//         id: `${uuid()}${sexed_id}`,
//         sex: assigned_sex,
//         age: 0,
//         old_year: inherentOldAge(year),
//         alive: true,
//         birth_year: year,
//         relations: {
//             family: parent1.relations.family,
//             mother: parent1.id,
//             father: parent2.id,
//             spouse: "",
//             offspring: []
//         },
//         marital_status: false,
//         title_claim: babysClaim,
//         house: lastName
//     }
// }

// Death, so sad
// Maps over people --> Die?
// Sorts out newly departed and survivors
// Creates news items for newly departed
// Returns news, updated living array, and updated dead array
export function death (year: number, living_people: People, dead_people: People, titles: Title[]): {new_deaths: NewsItem[], the_living: People, updated_dead: People} {
    const { oldAgeNews} = dieOldAge(year,living_people);
    const { fatalAccidentNews} = dieAccident(living_people);
    const { contagionNews} = dieContagion(living_people,year);

    /* TBD: { conditionDeathNews } = dieCondition(living_people);
            { killedNews } = dieKilled(living_people...?);
    */
    const {the_living, the_dead, title_news } = filterDeadFolks(living_people, titles, year);
    const updated_dead = dead_people.concat(the_dead);

    const new_deaths = contagionNews.concat(oldAgeNews, fatalAccidentNews, title_news);
    return {
        new_deaths,
        the_living,
        updated_dead
    }
}

// Love and Marriage...

export function marriageStuff (year: number, living_people: People, houses: Houses): {new_spouses: People, marriage_news: NewsItem[], people: People, new_houses: Houses, possible_parents: Parents} {
    let dummy = 0; // ignore this for now
    let new_spouses: People = [];
    let new_houses: Houses = [];
    let available_houses: Houses = new_houses.concat(houses)
    let marriage_news: NewsItem[] = [];
    let possible_parents: Parents = [];
    let people = living_people;
    for (let i=0; i<people.length; i++) {
        if (people[i].marital_status === true) {
            dummy = 0;
        } else {
            let test = willYouMarryMe(people[i].age);
            if ( test === true ) {
                people[i].marital_status = true;
                const { spouseID, spouse} = handleMarriage(year, people[i]);
                let house_test = whetherNewHouse(available_houses.length);
                let spouseHouse;
                if (house_test) {
                    spouseHouse = historicalHouse(year);
                    new_houses.push(spouseHouse);
                    available_houses.push(spouseHouse);
                } else {
                    spouseHouse = pickHouse(available_houses)
                };
                people[i].relations.spouse = spouseID;
                marriage_news.push({category: 'marriage', content: `${people[i].name} ${people[i].house} marries ${spouse.name} from House ${spouseHouse.name}.`});
                spouse.house = spouseHouse.name;
                new_spouses.push(spouse)
                possible_parents.push([people[i].id,spouse.id]);
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
    new_houses,
    possible_parents
}
}

export function allStorks(people: People, year: number, parents: Parents, titles: Title[]): {new_people: People, new_children: People, baby_news: NewsItem[], updated_titles: Title[]} {
    let new_children: People = [];
    let baby_news: NewsItem[] = [];

    for (let i=0; i<parents.length; i++) {
        // const parent1Index: number | undefined = people.findIndex(x => x.id === couple[0]);
        // const parent2Index: number | undefined = people.findIndex(x => x.id === couple[1]);
        // const parent1: Person | undefined = people[parent1Index];
        // const parent2: Person | undefined  = people[parent2Index];

        const parent1: Person | undefined = people.find((person) => person.id === parents[i][0]);
        const parent2: Person | undefined = people.find((person) => person.id === parents[i][1]);

        if (parent1 !== undefined && parent2 !== undefined) {
            if (parent1.sex === 'female' && babyOnTheWay(parent1.age)) {
                const {baby, baby_announcement} = individualStork(parent1,parent2,year);
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
                baby_news.push(baby_announcement);
                parent1.relations.offspring.push(baby.id);
                parent2.relations.offspring.push(baby.id);
            }
            else if (parent2.sex === 'female' && babyOnTheWay(parent2.age)) {
                const {baby, baby_announcement} = individualStork(parent2,parent1,year);
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
                baby_news.push(baby_announcement);
                parent1.relations.offspring.push(baby.id);
                parent2.relations.offspring.push(baby.id);
                
            }
        }

        // this is silly, but...
       
        // parent not undefined, if parent female, babyontheway(age)

    }
    const new_people = people.map(person => person);
    const updated_titles = titles.map(title => title);
    // const mothers = people.filter((person: Person) => person.sex === 'female' && person.marital_status === true);

    // for (let i=0; i<mothers.length; i++) {
    //     const match = people.find((person) => person.id === mothers[i].relations.spouse);
    //     if (typeof match !== 'undefined' && babyOnTheWay(mothers[i].age)) {

    //         const {baby, baby_announcement} = individualStork(mothers[i],match,year);

    //         new_children.push(baby);

    //         baby_news.push(baby_announcement);
    //     } else {
    //         dummy = 0; // eslint-disable-line
    //     }
    // }
 
    // const new_people: People = people.map((person: Person) => {
    //     const spawn = new_children.find((kid) => person.id === kid.relations.mother || person.id === kid.relations.father);
    //     if (typeof spawn !== 'undefined') {
    //         return {
    //             ...person,
    //             relations: {
    //                 ...person.relations,
    //                 offspring: [
    //                     ...person.relations.offspring,
    //                     spawn.id
    //                 ]
    //             }
    //         }
    //     } else {
    //         return person 
    //     }
    // });

    return {
        new_people,
        new_children,
        baby_news, 
        updated_titles
    }
}

export function individualStork (mother: Person, father: Person, year: number): { baby: Person, baby_announcement: NewsItem} {
    const baby =  new Child(mother,father,year);
    const baby_announcement = {category: 'birth', content: `${baby.name} of House ${baby.house} was born to ${mother.name} ${mother.house} and ${father.name} ${father.house}.`}
    return {
        baby,
        baby_announcement
    };
    
}