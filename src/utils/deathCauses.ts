import { Contagion, Person } from "../types";

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

const contagions: Contagion[] = [
    {
        type_key: "leprosy",
        duration: [0,0],
        onset_delay: true,
        incubation: [1,20],
        infection_rate: 5,
        reinfection: false,
        effects: {
            mortality: 0.95
        }
    },
    {
        type_key: "smallpox",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 20,
        reinfection: false,
        effects: {
            mortality: 0.40,
        }
    },
    {
        type_key: "chickenpox",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 5,
        reinfection: false,
        effects: {
            mortality: 0.95,
        }
    },
    {
        type_key: "plague",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 20,
        reinfection: false,
        effects: {
            mortality: 0.40,
        }
    },
    {
        type_key: "typhoid",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 10,
        reinfection: true,
        effects: {
            mortality: 0.80,
        }
    },
    {
        type_key: "cholera",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 10,
        reinfection: true,
        effects: {
            mortality: 0.55,
        }
    },
    {
        type_key: "dysentary",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 15,
        reinfection: true,
        effects: {
            mortality: 0.95,
        }
    },
    {
        type_key: "influenza",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 30,
        reinfection: true,
        effects: {
            mortality: 0.95,
        }
    },
    {
        type_key: "measles",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 90,
        reinfection: false,
        effects: {
            mortality: 0.98,
        }
    },
    {
        type_key: "mumps",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 10,
        reinfection: false,
        effects: {
            mortality: 0.99,
        }
    },
    {
        type_key: "tuberculosis",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 25,
        reinfection: false, // setting this to false because complicated
        effects: {
            mortality: 0.60,
        }
    },
    {
        type_key: "lyme",
        duration: [1,0],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 5,
        reinfection: false,
        effects: {
            mortality: 0.98,
        }
    },
    {
        type_key: "malaria",
        duration: [1,1],
        onset_delay: false,
        incubation: [0,0],
        infection_rate: 10,
        reinfection: true,
        effects: {
            mortality: 0.80,
        }
    },
    {
        type_key: "syphilis",
        duration: [0,0],
        onset_delay: true,
        incubation: [2,15],
        infection_rate: 5,
        reinfection: false,
        effects: {
            mortality: 0.90,
        }
    },
]

export function whatContagion (person: Person, contagions: Contagion[]) {

}
// List of possible contagions
/*
*/

// List of possible congenital conditions
/* 
Heart Risk
Stroke Risk
Epilepsy
Hemophilia
*/
// List of acquired conditions??
/* 
Ergotism
Scurvy
Heart Risk
Stroke Risk
Gout
Lead Poisoning
*/