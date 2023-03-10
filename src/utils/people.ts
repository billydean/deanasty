import type { Houses, NewsItem, Parents, Title } from "../types"
import { dieAccident, dieContagion, dieOldAge, filterDeadFolks, handleMarriage } from "./checks";
import { historicalHouse, pickHouse, whetherNewHouse } from "./houses";
import { babyOnTheWay, willYouMarryMe } from "./Brackets";
import { checkSuccessionAtBirth } from "./titles";
import { Child, Person, People } from '../classes'

// Another year older...
export function yearOlder (people: People) {
    for (let i=0; i<people.length;i++) {
        people[i].age++;
    }
}

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

// Love and Marriage...

export function marriageStuff (year: number, people: People, houses: Houses): {new_spouses: People, marriage_news: NewsItem[], people: People, available_houses: Houses, possible_parents: Parents} {

    let new_spouses: People = [];
    let available_houses: Houses = [...houses];
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

export function allStorks(people: People, year: number, parents: Parents, titles: Title[], events: NewsItem[]): {new_people: People, new_children: People, updated_titles: Title[]} {
    let new_children: People = [];
    // let baby_news: NewsItem[] = [];

    for (let i=0; i<parents.length; i++) {
        
        const parent1: Person | undefined = people.find((person: Person) => person.id === parents[i][0]);
        const parent2: Person | undefined = people.find((person: Person) => person.id === parents[i][1]);

        if (parent1 !== undefined && parent2 !== undefined) {
            if (parent1.sex === 'female' && babyOnTheWay(parent1.age)) {
                const {baby} = individualStork(parent1,parent2,year, events);
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
                const {baby} = individualStork(parent2,parent1,year,events);
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
    const baby =  new Child (mother,father,year,events);
    // const baby_announcement = {category: 'birth', content: `${baby.name} of House ${baby.house} was born to ${mother.name} ${mother.house} and ${father.name} ${father.house}.`}
    return {
        baby,
        // baby_announcement
    };
    
}