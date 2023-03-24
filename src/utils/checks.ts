// This file contains any logic, tests, or filters used to create or transform slices of state related to the current year or to any generated people
import { NewsItem, StateContagion, Title } from "../types";
// import { beta } from '@stdlib/random/base';
// import { createSpouse } from "./people";
import { findHeir } from "./titles";
import { catchContagionOdds, fatalSlapstickOdds, oddsFatalDisease, slapstickOdds } from "./Brackets";
import { fatalAccidents, infectPerson } from "./deathCauses";
import { Spouse, Person, People } from "../classes";

// Takes array of folks and filters both living and dead arrays
// If a title holder is included among the dead, looks for heir...
export function filterDeadFolks (living: People, titles: Title[], year: number): { the_living: People, the_dead: People, title_news: NewsItem[]} {
    living.forEach(person => {
        if (person.alive === false) {
            person.death_year = year
        }
    });
    const the_living = living.filter((person: Person) => person.alive === true);
    const the_dead = living.filter((person: Person) => person.alive === false);
    const title_news = titleOnDeath(the_dead, titles, the_living);
    
    return {
        the_living,
        the_dead,
        title_news,
    }
};

// Creates array of new news items based on people array: new deaths
export function titleOnDeath (dead: People, titles: Title[], living: People): NewsItem[] {
    let array: NewsItem[] = [];
    dead.forEach((person: Person) => {
        if (person.title !== undefined) {
            const vacant_title = titles.find(entry => entry.id === person.title!.id)
            array.push({ category: 'title', content: `${person.title.address} ${person.name} was the ${vacant_title!.appellation} of ${vacant_title!.name}.`})
            findHeir(vacant_title!, living, array);
        }
    });
    return array;
}


// People die of old age.
// returns old-age-death news items and list of ids.
export function dieOldAge (year: number, people: People): { oldAgeNews: NewsItem[] } {
    let oldAgeNews = [];
    for (let i=0; i<people.length;i++){
        if (people[i].alive === true && people[i].old_year <= year) {
            oldAgeNews.push({category: "death", content: `${people[i].name} ${people[i].house} died of natural causes at the age of ${people[i].age}.`});
            people[i].alive = false;
        }
    }
    return {
        oldAgeNews
    }
};

export function dieAccident (people: People): { fatalAccidentNews: NewsItem[] } {
    let fatalAccidentNews: NewsItem[] = [];
    for (let i=0; i<people.length;i++){
        if (people[i].alive === true && slapstickOdds(people[i].age) && fatalSlapstickOdds(people[i].age)) {
            let death_cause = fatalAccidents();
            fatalAccidentNews.push({category: 'death', content: `${people[i].name} ${people[i].house} died at the age of ${people[i].age} after ${death_cause}.`});
            people[i].alive = false;
        }
    }
    return {
        fatalAccidentNews
    }
};

export function dieContagion (people: People, year: number, contagions: StateContagion[]): { contagionNews: NewsItem[] } {
    let contagionNews: NewsItem[] = [];
    for (let i=0; i<people.length; i++) {
        if (people[i].alive === true && catchContagionOdds(people[i].age)) {
            const {added_disease} = infectPerson(people[i], year, contagions);
            if (added_disease !== "none") {
                contagionNews.push({category:'disease', content: `${people[i].name} ${people[i].house} has caught ${added_disease}.`})
            } 
        }
            for (let j=0; j<people[i].condition.diseases.length; j++) {
                if (year >= people[i].condition.diseases[j].onset && year <= people[i].condition.diseases[j].duration && oddsFatalDisease(people[i].age,people[i].condition.diseases[j].effects.mortality) && people[i].alive === true) {
                    contagionNews.push({category: 'death', content: `${people[i].name} ${people[i].house} died of ${people[i].condition.diseases[j].type_key} at the age of ${people[i].age}.`});
                    people[i].alive = false;
                    const contagion = contagions.find(entry => entry.type_key === people[i].condition.diseases[j].type_key);
                    contagion!.current_cases!--;
                }
            }
    }
    return {
        contagionNews
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
