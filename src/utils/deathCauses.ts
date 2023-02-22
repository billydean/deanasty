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