import { People, Person } from "../types"
import { beta } from '@stdlib/random/base';
// import { createChild, createSpouse } from "./PeopleMakers";


// export function deathRate(birth_year: number, modifier: number = 0): number {
//     return Math.ceil(beta(5,3) * 60) + 50 + modifier + birth_year
// }

// export function reaper (person: Person, year: number): Person {
//     return { ...person,
//         alive: false,
//         death_year: year
//     }
// };


// export function checkOldAge (year: number, people: People): People {
//     return people.map((person)=> {
//         if (person.old_year <= year) {
//             return reaper(person, year)
//         } else {
//             return person
//         }
//     })
// }

// export function agingFertility (people: People) {
//     people.forEach((person) => {
//         if (person.age > 40) {
//             if (person.fertility >= 5) {
//                 person.fertility -= 5;
//             } else {
//                 person.fertility = 0;
//             }
//         } else if (person.age > 30) {
//             if (person.fertility >= 3) {
//                 person.fertility -= 3;
//             } else {
//                 person.fertility = 0;
//             }
//         } else if (person.age > 20) {
//             if (person.fertility > 0) {
//                 person.fertility--;
//             } else {
//                 person.fertility = 0;
//             }
//         }
//     })
// }

// export function agingFertility (people: People): People {
//     return people.map((person) => {
//         let new_fertility = person.fertility;
//         if (person.age > 40) {
//             if (person.fertility >= 5) {
//                 new_fertility -= 5;
//             } else {
//                 new_fertility = 0;
//             }
//         } else if (person.age > 30) {
//             if (person.fertility >= 3) {
//                 new_fertility -= 3;
//             } else {
//                 new_fertility = 0;
//             }
//         } else if (person.age > 20) {
//             if (person.fertility > 0) {
//                 new_fertility--;
//             } else {
//                 new_fertility = 0;
//             }
//         }
//         return {
//             ...person,
//             fertility: new_fertility
//         }
        
//     })}

/**
 * 
 * @param age Age of person in question, influences chances of success.
 * 
 * Note: Other parameters may be added!
 */
// export function marriageRate (age: number): boolean {
//     const check: number = Math.floor(age / 5);
//     const picker: number = Math.ceil(Math.random() * 2560)
    
//     switch (check) {
//         case 3: return picker <= 172
//         case 4: return picker <= 720
//         case 5: return picker <= 512
//         case 6: return picker <= 256
//         case 7: return picker <= 256
//         case 8: return picker <= 64
//         case 9: return picker <= 32
//         case 10: return picker <= 16
//         case 11: return picker <= 8
//         case 12: return picker <= 4
//         case 13: return picker <= 4
//         case 14: return picker <= 2
//         case 15: return picker === 1
//         default: return false;
//     }
// };

// // iterates over People and adjusts marital status based on the marriageRate function above.
// export function willYouMarryMe (people: People) {
//     people.forEach((person) => {
//         person.marital_status = marriageRate(person.age);
//     })
// };

// if married person is missing a spouse, this function
//      1. creates a spouse
//      2. ensures respective id for both spouses refer to each other
//      3. sets the spouse's age based on their birth year (N/A!)
//      4. pushes the spouse to the "createdSpouses" array
//      5. pushes an announcement about their marriage to the array of events in state

// export function handleMarriages (people: People, year: number) {
    
//     let new_spouses: People = [];
//     let new_news: string[] = [];

//     people.forEach((person) => {
//         if (person.marital_status === true && !person.relations.spouse) {
//             const spouse = createSpouse(person, year); // step 1
//             person.relations.spouse = spouse.id; // step 2
//             new_spouses.push(spouse); // step 4
//             new_news.push(`${person.name} and ${spouse.name} joined hands in marriage.`); // step 5
//         }
//     });

//     return {
//         new_spouses,
//         new_news
//     }
// };

// export function coordinateSpouseIDs (spouse_array: People, people_array: People) {
//     if (spouse_array.length > 0) {
//         return people_array.map((person) => {
//             let spouse = spouse_array.find((one) => one.relations.spouse === person.id);
//             if (spouse) {
//                 return {
//                     ...person,
//                     relations: {
//                         ...person.relations,
//                         spouse: spouse.id
//                     }
//                 }
//             } else {
//                 return {
//                     ...person
//                 }
//             }
//         })
//     } else {
//         return people_array
//     }
// }

// 1. filters down to live, married couples
// 2. rolls: if lower than both fertility rates, baby!
// 3. creates baby
// 4. adds baby to baby array
// 5. adds baby news to array of events in state
// 6. adds baby's id to both parents' relations.offspring

// export function stork (people: People, new_children: People, events: (string|undefined)[], year: number) {
//     people.forEach((person) => {
        
//         // step 1
//         if (person.sex === 'female' && person.marital_status === true && person.fertility > 0) { 
//             const match = people.find(each => each.id === person.relations.spouse);
//             if (match && match.alive && match.fertility > 0) {
//                 const seed = Math.ceil(Math.random() * 100);
//                 console.log(`seed is ${seed}. fertility rates are ${person.fertility} and ${match.fertility}.`);
//                 if (person.fertility > seed && match.fertility > seed) { // step 2
//                     const kiddo = createChild(person, match, year); // step 3
//                     new_children.push(kiddo); // step 4
//                     events.push(`${kiddo.name} was born to ${person.name} and ${match.name}.`); // step 5
//                     // step 6
//                     if (person.relations.offspring) {
//                         person.relations.offspring.push(kiddo.id);
//                         if (match.relations.offspring) {
//                             match.relations.offspring.push(kiddo.id);
//                         } else {
//                             match.relations.offspring = [kiddo.id];
//                         }
//                     } else {
//                         person.relations.offspring = [kiddo.id];
//                         if (match.relations.offspring) {
//                             match.relations.offspring.push(kiddo.id);
//                         } else {
//                             match.relations.offspring = [kiddo.id];
//                         }
//                     }
//                 }
//             }
//         }
//     })
// }
