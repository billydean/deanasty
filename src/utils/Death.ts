import type { Contagion, StateContagion, Title, NewsItem } from "../types"
import { Person, Spouse, Descendant } from "./Person"
import { findHeir } from "./Title";
import { catchContagionOdds, fatalSlapstickOdds, oddsFatalDisease, slapstickOdds } from "./Brackets";

// So-and-so died after BLANK
const fatal_accidents = [
    "falling into a river",
    "a tragic shipwreck",
    "being kicked by a horse",
    "slipping down the stairs",
    "getting stuck in a burning building",
    "choking on dinner",
    "staying in the sun too long",
    "getting mauled by an animal",
    "getting caught in the extreme cold",
    "having a tree fall on them"
]
export function fatalAccidents () {
    const random = Math.floor(Math.random() * fatal_accidents.length);
    return fatal_accidents[random];
}

export const contagions: Contagion[] = [
    {
        type_key: "leprosy",
        duration: [0,0],
        onset_delay: true,
        incubation: [0,20],
        infection_rate: 1,
        reinfection: false,
        effects: {
            mortality: 6
        }
    },
    {
        type_key: "smallpox",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 2,
        reinfection: false,
        effects: {
            mortality: 0.50,
        }
    },
    {
        type_key: "chickenpox",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 4,
        reinfection: false,
        effects: {
            mortality: 6,
        }
    },
    // {
    //     type_key: "plague",
    //     duration: [1,1],
    //     onset_delay: false,
    //     incubation: [0,0],
    //     infection_rate: 20,
    //     reinfection: false,
    //     effects: {
    //         mortality: 0.40,
    //     }
    // },
    {
        type_key: "typhoid",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 2,
        reinfection: true,
        effects: {
            mortality: 1.5,
        }
    },
    {
        type_key: "cholera",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 2,
        reinfection: true,
        effects: {
            mortality: 0.67,
        }
    },
    {
        type_key: "dysentery",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 3,
        reinfection: true,
        effects: {
            mortality: 6,
        }
    },
    {
        type_key: "influenza",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 4,
        reinfection: true,
        effects: {
            mortality: 6,
        }
    },
    {
        type_key: "measles",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 2,
        reinfection: false,
        effects: {
            mortality: 15,
        }
    },
    {
        type_key: "mumps",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 1,
        reinfection: false,
        effects: {
            mortality: 30,
        }
    },
    {
        type_key: "tuberculosis",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 2,
        reinfection: false, // setting this to false because complicated
        effects: {
            mortality: 0.75,
        }
    },
    {
        type_key: "lyme disease",
        duration: [1,0],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 1,
        reinfection: false,
        effects: {
            mortality: 15,
        }
    },
    {
        type_key: "malaria",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 2,
        reinfection: true,
        effects: {
            mortality: 1.5,
        }
    },
    {
        type_key: "syphilis",
        duration: [0,0],
        onset_delay: true,
        incubation: [2,15],
        infection_rate: 2,
        reinfection: false,
        effects: {
            mortality: 3,
        }
    },
]

function determineDuration (range: number[], year: number, old_year: number): number {
    let to_death = (old_year - year) + 1;
    if (range[0] !== 0) {
        if (range[1] !== 0) { // [1,1]
            if (range[0] === range[1]){
                return year;
            } else {
                return (Math.ceil(Math.random() * (range[1] - range[0])) + range[0]) + year;
            }
            } else { // [1,0]
            return (Math.ceil(Math.random() * (to_death - range[0])) + range[0]) + year;
        }
    } else {
        if (range[1] !== 0) { // [0,1]
            return old_year + 1;
        } else { // [0,0]
            return old_year + 1;
        }
    }
}

function determineOnset (range: number[], year: number ): number {
    const diff = range[1] - range[0];
        return (Math.ceil(Math.random() * diff) + range[0] + year)

}

export function infectPerson (person: Person, year: number, state_contagions: StateContagion[]): {added_disease: string} {
    let pool: string[] = [];
    let added_disease: string = "none";
    contagions.forEach((contagion) => {
        let state_version = state_contagions.find(stateContagion => stateContagion.type_key === contagion.type_key)
        let cases = 0;
        while ( cases < state_version!.current_cases) {
            pool.push(contagion.type_key);
            cases++;
        }
        let count = 0;
        while (count < contagion.infection_rate) {
            pool.push(contagion.type_key);
            count++;
        }
    })
    let chosenIndex: number = Math.floor(Math.random() * pool.length);
    const contagion = contagions.find(each => each.type_key === pool[chosenIndex]);
    const state_version = state_contagions.find(each => each.type_key === contagion!.type_key);
    const duration = determineDuration(contagion!.duration,year,person.old_year);
    const onset = determineOnset(contagion!.incubation,year);
    // OLD: does person have immunity? 
    if (!person.condition.acquired_immunities.includes(contagion!.type_key)) {
        person.condition.diseases.push({
            type_key: contagion!.type_key,
            duration: duration,
            onset: onset,
            effects: contagion!.effects,
        });
        state_version!.current_cases++;
        added_disease = contagion!.type_key;
        if (!contagion!.reinfection) {
            person.condition.acquired_immunities.push(added_disease);
        }
    };
    return { added_disease }
   
}

// Takes array of folks and filters both living and dead arrays
// If a title holder is included among the dead, looks for heir...
export function filterDeadFolks (living: Person[], titles: Title[], year: number): { the_living: Person[], the_dead: Person[], title_news: NewsItem[]} {
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
export function titleOnDeath (dead: Person[], titles: Title[], living: Person[]): NewsItem[] {
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


// Person[] die of old age.
// returns old-age-death news items and list of ids.
export function dieOldAge (year: number, people: Person[]): { oldAgeNews: NewsItem[] } {
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

export function dieAccident (people: Person[]): { fatalAccidentNews: NewsItem[] } {
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

export function dieContagion (people: Person[], year: number, contagions: StateContagion[]): { contagionNews: NewsItem[] } {
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

// Death, so sad
// Maps over people --> Die?
// Sorts out newly departed and survivors
// Creates news items for newly departed
// Returns news, updated living array, and updated dead array
export function death (year: number, living_people: Person[], dead_people: Person[], titles: Title[], contagions: StateContagion[]): {new_deaths: NewsItem[], the_living: Person[], updated_dead: Person[]} {
    const { oldAgeNews} = dieOldAge(year,living_people);
    const { fatalAccidentNews} = dieAccident(living_people);
    const { contagionNews} = dieContagion(living_people,year,contagions);

    /* TBD: { conditionDeathNews } = dieCondition(living_people);
            { killedNews } = dieKilled(living_people...?);
    */
    const {the_living, the_dead, title_news } = filterDeadFolks(living_people, titles, year);

    const updated_dead = [...dead_people, ...the_dead];

    const new_deaths = [
        ...contagionNews, 
        ...oldAgeNews, 
        ...fatalAccidentNews, 
        ...title_news];

    return {
        new_deaths,
        the_living,
        updated_dead
    }
}
