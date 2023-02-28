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
        infection_rate: 4,
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
        infection_rate: 5,
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
        infection_rate: 4,
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
        infection_rate: 5,
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
        infection_rate: 6,
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
        infection_rate: 6,
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
        infection_rate: 2,
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
        infection_rate: 3,
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
        infection_rate: 5,
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
        infection_rate: 3,
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

export function infectPerson (person: Person, year: number): {added_disease: string} {
    let pool: string[] = [];
    let added_disease: string = "none"
    contagions.forEach((contagion) => {
        let count = 0;
        while (count < contagion.infection_rate) {
            pool.push(contagion.type_key);
            count++;
        }
    })
    let chosenIndex: number = Math.floor(Math.random() * pool.length);
    const contagion = contagions.find(each => each.type_key === pool[chosenIndex]);
    const duration = determineDuration(contagion!.duration,year,person.old_year);
    const onset = determineOnset(contagion!.incubation,year);
    if (!person.immunity) {
        if (!person.disease) {
            person.disease = [{
                type_key: contagion!.type_key,
                duration: duration,
                onset: onset,
                effects: contagion!.effects
            }];
            added_disease = contagion!.type_key;
        } else {
            person.disease.push({
                type_key: contagion!.type_key,
                duration: duration,
                onset: onset,
                effects: contagion!.effects
            })
            added_disease = contagion!.type_key;
        }
        if (!contagion!.reinfection) {
            person.immunity = [contagion!.type_key]
        }
    } else if (!person.immunity.includes(contagion!.type_key)) {
        if (!person.disease) {
            person.disease = [{
                type_key: contagion!.type_key,
                duration: duration,
                onset: onset,
                effects: contagion!.effects
            }];
            added_disease = contagion!.type_key;
        } else {
            person.disease.push({
                type_key: contagion!.type_key,
                duration: duration,
                onset: onset,
                effects: contagion!.effects
            });
            added_disease = contagion!.type_key;
        }
        if (!contagion!.reinfection) {
            person.immunity.push(contagion!.type_key)
        }
    }
    return {added_disease}
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