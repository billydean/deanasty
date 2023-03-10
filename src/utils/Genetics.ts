// "Genome" is array of XXX length. Genes identified by their index in the genome.
// Each "Gene" object has:
    // name
    // values (list of options)
    // transfer (argument used in passGene)
    // manifest (argument used in XXX) 
// Gene objects are in larger Genome array, with same index
// Handlers
    // bigZipper -> takes two genomes to instantiate new genome (mother, father)
    // passGene -> how gene is inherited (mother? father? recessive? etc)
    // expressGene -> what happens with XXX genes are present at index in genome

import { Person } from "../classes";

type Gene = {
    name: string,
    values: string,
    transfer: string,
};

type Genome = Gene[];

export type DNA = string[];
// TODO Need list of dispositions, risk factors, traits
// Whenever "active," appear in debugging annals
// Add "modifiers" to the person type (default at 1)
// "Modifiers" used whenever call Brackets
// Expressed genes -> modifiers

/*  Current Genome w/ Indices
0   heart disease
1   stroke
2   epilepsy
3   hemophilia
4   NONE
BIG FIVE TRAITS
5   openness
6   thoughtfulness
7   impulsive
8   ambitious
9   social
10  initiative
11  trust
12  kind
13  depression
14  stability
15  anxious
OTHER TRAITS
16  handedness
17  blindness
18  deafness
...
*/

const genome_reference: Genome = [
    {   //index 0
        name: "heart disease",
        values: "hhhH",
        transfer: "strong",
    },
    {   //index 1
        name: "stroke",
        values: "ssssS",
        transfer: "mid",
    },
    {   //index 2
        name: "epilepsy",
        values: "eeeeeeE",
        transfer: "mid",
    },
    {   //index 3
        name: "hemophilia",
        values: "hhhhhhH",
        transfer: "strong",
    },
    {   //index 4
        name: "NONE",
        values: "N",
        transfer: "NONE",
    },
    {   //index 5
        name: "openness",
        values: "9",
        transfer: "number",
    },
    {   //index 6
        name: "thoughtfulness",
        values: "9",
        transfer: "number",
    },
    {   //index 7
        name: "impulse control",
        values: "9",
        transfer: "number",
    },
    {   //index 8
        name: "ambition",
        values: "9",
        transfer: "number",
    },
    {   //index 9
        name: "social",
        values: "9",
        transfer: "number",
    },
    {   //index 10
        name: "initiative",
        values: "9",
        transfer: "number",
    },
    {   //index 11
        name: "trust",
        values: "9",
        transfer: "number",
    },
    {   //index 12
        name: "kindness",
        values: "9",
        transfer: "number",
    },
    {   //index 13
        name: "depression",
        values: "9",
        transfer: "number",
    },
    {   //index 14
        name: "stability",
        values: "9",
        transfer: "number",
    },
    {   //index 15
        name: "anxiety",
        values: "9",
        transfer: "number",
    },
    {   //index 16
        name: "handedness",
        values: "RRRRLLA",
        transfer: "mid",
    },
    {   //index 17
        name: "sight",
        values: "bbbbbbbbB",
        transfer: "mid",
    },
    {   //index 18
        name: "hearing",
        values: "ddddddddD",
        transfer: "strong",
    },
];

// transfer type tags include:
    // par  just adds parents to value set
    // mid  adds parents twice each
    // strong adds parents three times each
    // mid (mom/dad) adds (mom/dad) an extra time
    // strong (mom/dad) adds two extra times
    // number

function pick(string: string): string {
    return string.at(Math.floor(Math.random() * string.length))!
}
function passGene(transfer_type: string, mother: string, father: string, values: string): string {
    let gene = ""
    let pool = values + mother + father;
        if (!transfer_type.includes("number")) {
            if (transfer_type.includes("mid")) {
                pool = pool + mother + father
                if (transfer_type.includes("mom")) {
                    pool += mother;
                    gene = pick(pool) + pick(pool);
                } else if (transfer_type.includes("dad")) {
                    pool += father;
                    gene = pick(pool) + pick(pool);
                } else {
                    gene = pick(pool) + pick(pool);
                }
            } else if (transfer_type.includes("strong")) {
                pool = pool + mother + mother + father + father
                if (transfer_type.includes("mom")) {
                    pool = pool + mother + mother
                    gene = pick(pool) + pick(pool);
                } else if (transfer_type.includes("dad")) {
                    pool = pool + father + father
                    gene = pick(pool) + pick(pool);
                } else {
                    gene = pick(pool) + pick(pool);
                }
            } else if (transfer_type.includes("mom")) {
                pool += mother;
                gene = pick(pool) + pick(pool);
            } else if (transfer_type.includes("dad")) {
                pool += father;
                gene = pick(pool) + pick(pool);
            } else {
                gene = pick(pool) + pick(pool);
            } 
        } else {
            let value = Math.ceil(Math.random() * parseInt(values));
            let maNum = parseInt(mother);
            let paNum = parseInt(father);
            gene = ((value + (maNum * 2) + (paNum * 2))/5).toString();
        }
    return gene
};

function noParentsDNA (): DNA {
    let dna = []
    for (let i=0; i<genome_reference.length;i++) {
        let values = genome_reference[i].values;
        let value = "";
        if (genome_reference[i].transfer.includes("number")) {
            value = (Math.ceil(Math.random() * parseInt(values))).toString();
        } else {
            value! += values.at(Math.floor(Math.random() * values.length));
            value! += values.at(Math.floor(Math.random() * values.length));
        }
        dna.push(value);
    };
    return dna
};

function bigZipper(mother: DNA, father: DNA): DNA {
    let dna = [];
    for (let i=0; i<genome_reference.length; i++) {
        let gene = genome_reference[i];
        dna.push(passGene(gene.transfer,mother[i],father[i], gene.values))
    }
    return dna;
};

function bigUnZipper(person: Person, dna: DNA) {
// What do I want this thing to do?
// Adds News Items
    // added traits
    // extreme personality traits (0-1, 8-9)
// Adds to Person.Condition:
    // risk factors
// Adds to Person.traits

// Adds personality values
person.personality = {
    open: parseInt(dna[5]),
    thoughtful: parseInt(dna[6]),
    impulse: parseInt(dna[7]),
    ambition: parseInt(dna[8]),
    social: parseInt(dna[9]),
    initiative: parseInt(dna[10]),
    trust: parseInt(dna[11]),
    kind: parseInt(dna[12]),
    sad: parseInt(dna[13]),
    stable: parseInt(dna[14]),
    angst: parseInt(dna[15]),
}
if (dna[0] === "HH") {
    person.condition.risk_factors.push("heart");
}
if (dna[1] === "SS") {
    person.condition.risk_factors.push("stroke");
}
if (dna[2] === "EE") {
    person.condition.risk_factors.push("epilepsy")
}
if (dna[3] === "HH") {
    person.condition.risk_factors.push("hemophilia")
}
if (["LA","AL","LL"].includes(dna[16])) {
    person.traits.push("left-handed");
}
if (dna[16] === "AA") {
    person.traits.push("ambidextrous");
}
if (dna[16].includes("R")) {
    person.traits.push("right-handed");
}
if (dna[17] === "BB") {
    person.traits.push("blind");
}
if (dna[18] === "DD") {
    person.traits.push("deaf");
}

// Currently just for debugging -- in the future, bigUnZipper will read a person's DNA to determine any conditions, modifiers, news items, etc.
    // let debug_list: string[] = [];

    // if (dna[17] === "BB") debug_list.push("Blind");
    // if (dna[18] === "DD") debug_list.push("Deaf");

    // if (debug_list.length === 1) {
    //     debug_message += `${debug_list[0]}.`
    // } else {
    //     for (let i=0; i<debug_list.length - 1; i++) {
    //         debug_message += `${debug_list[i]}, `
    //     }
    //     debug_message += `${debug_list[debug_list.length - 1]}.`
    // }

    // return debug_message;
}

export { noParentsDNA, bigZipper, bigUnZipper };