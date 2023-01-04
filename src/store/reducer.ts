import { State, Action, Person, People } from "../types";
import { firstPerson, createSpouse } from "../utils/PeopleMakers";
import { initialState } from "./initialState";
import { isOld }from "../utils/isOld";
import { livingToDead } from "../utils/livingToDead";
import { reaper } from "../utils/reaper";
import { willYouMarryMe } from "../utils/Pickers";

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'START_SIM':
            const newPerson: Person = firstPerson();
            const birthMessage: string = newPerson.name + ' was born';
            return {
                ...state,
                sim_check: true,
                living_people: [newPerson],
                events: [
                    ...state.events,
                    { year: state.year.current,
                        events: [birthMessage]
                    }
            ]
            };

        case 'RESET_SIM':
            return initialState;

        case 'INCREMENT_YEAR':
            let oldCheckedPeople = state.living_people.map((person) => {
                if (isOld(person.old_year,state.year.current)) {
                    return reaper(person, state.year.current)
                } else { 
                    return person
                }
            })
            const { living_people, dead_people, death_events } = livingToDead(oldCheckedPeople, state.dead_people);
            const other_year_events = state.events.filter((EventfulYear) => EventfulYear.year !== state.year.current);
            const current_year_events = state.events.find((EventfulYear) => EventfulYear.year === state.year.current)?.events || [];
            const createdSpouses: People = []

            living_people.forEach((person)=> {
                person.marital_status = willYouMarryMe((state.year.current - person.birth_year));
                if (person.marital_status === true && !person.relations.spouse) {
                    const spouse = createSpouse(person);
                    person.relations.spouse = spouse.id;
                    createdSpouses.push(spouse);
                    current_year_events.push(`${person.name} and ${spouse.name} joined hands in marriage.`)
                }
            });

            // createdSpouses.forEach((spouse)=>{
            //     living_people.forEach((person)=>{
            //         if (spouse.relations.spouse === person.id) {
            //             person.relations.spouse = spouse.id
                        
            //         }
            //     })
            // });

            const new_living_people = living_people.concat(createdSpouses);


            return {
                ...state,
                year: {
                    ...state.year,
                    current: state.year.current + 1,
                    total: state.year.total + 1
                },
                living_people: new_living_people,
                dead_people: dead_people,
                events: [
                    ...other_year_events,
                    {
                        year: state.year.current,
                        events: [...current_year_events, ...death_events]
                    }
                ]
            }

        default:
            throw Error("I'm not familiar with the action: " + action.type)
    }
}