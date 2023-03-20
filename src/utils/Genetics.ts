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
import { NewsItem } from "../types";

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
            gene = Math.ceil(((value + (maNum * 2) + (paNum * 2))/5)).toString();
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

function bigUnZipper(person: Person, dna: DNA, events: NewsItem[]) {
// What do I want this thing to do?
// Adds News Items
    // added traits
    // extreme personality traits (0-1, 8-9)
// Adds to Person.Condition:
    // risk factors
// Adds to Person.traits

// Adds personality values
let trait_news: string[] = [];
let risk_news: string[] = [];


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
};

if (person.personality.open < 2) trait_news.push("stubborn")
if (person.personality.open > 8) trait_news.push("open-minded")
if (person.personality.thoughtful < 2) trait_news.push("selfish")
if (person.personality.thoughtful > 8) trait_news.push("thoughtful")
if (person.personality.impulse < 2) trait_news.push("cautious")
if (person.personality.impulse > 8) trait_news.push("impulsive")
if (person.personality.ambition < 2) trait_news.push("lazy")
if (person.personality.ambition > 8) trait_news.push("ambitious")
if (person.personality.social < 2) trait_news.push("anti-social")
if (person.personality.social > 8) trait_news.push("gregarious")
if (person.personality.initiative < 2) trait_news.push("timid")
if (person.personality.initiative > 8) trait_news.push("bold")
if (person.personality.trust < 2) trait_news.push("skeptical")
if (person.personality.trust > 8) trait_news.push("trusting")
if (person.personality.kind < 2) trait_news.push("cruel")
if (person.personality.kind > 8) trait_news.push("kind")
if (person.personality.sad < 2) trait_news.push("cheerful")
if (person.personality.sad > 8) trait_news.push("depressive")
if (person.personality.stable < 2) trait_news.push("moody")
if (person.personality.stable > 8) trait_news.push("stoic")
if (person.personality.angst < 2) trait_news.push("carefree")
if (person.personality.angst > 8) trait_news.push("anxious")
if (dna[0] === "HH") {
    person.condition.risk_factors.push("heart");
    risk_news.push("heart disease")
}
if (dna[1] === "SS") {
    person.condition.risk_factors.push("stroke");
    risk_news.push("stroke");
}
if (dna[2] === "EE") {
    person.condition.risk_factors.push("epilepsy")
    risk_news.push("epilepsy");
}
if (dna[3] === "HH") {
    person.condition.risk_factors.push("hemophilia")
    risk_news.push("hemophilia");
}
if (["LA","AL","LL"].includes(dna[16])) {
    person.traits.push("left-handed");
    trait_news.push("left-handed")
}
if (dna[16] === "AA") {
    person.traits.push("ambidextrous");
    trait_news.push("ambidextrous")
}
if (dna[16].includes("R")) {
    person.traits.push("right-handed");
    trait_news.push("right-handed")
}
if (dna[17] === "BB") {
    person.traits.push("blind");
    trait_news.push("blind")
}
if (dna[18] === "DD") {
    person.traits.push("deaf");
    trait_news.push("deaf")
}

let exported_news: NewsItem = {
    category: "genetics",
    content: ""
}

if (trait_news.length > 0) exported_news.content += `${person.name} is `
if (trait_news.length === 1) {
    exported_news.content += `${trait_news[0]}. `
} else if (trait_news.length > 1) {
    for (let i=0; i<trait_news.length - 1; i++) {
                exported_news.content += `${trait_news[i]}, `
            }
            exported_news.content += `${trait_news[trait_news.length - 1]}. `
};

if (risk_news.length > 0) exported_news.content += `${person.name} has a hereditary risk of `
if (risk_news.length === 1) {
    exported_news.content += `${risk_news[0]}. `
} else if (risk_news.length > 1) {
    for (let i=0; i<risk_news.length - 1; i++) {
        exported_news.content += `${risk_news[i]}, `
    }
    exported_news.content += `${risk_news[risk_news.length - 1]}. `
};

if (exported_news.content.length > 0) events.push(exported_news);

}

export { noParentsDNA, bigZipper, bigUnZipper };