const consonant = ["b","d","f","g","h","j","k","l","m","n","p","r","s","t","v","w","z"]
const vowel = ["a","e","i","o","u"]

const picker = (array: string[]): string => {
    return array[Math.floor(Math.random() * array.length)];
}

const C = () => {
    return picker(consonant);
}

const V = () => {
    return picker(vowel);
}

const syllableCount = (name: string) => {
    if (name === 'first') {
        return Math.ceil(Math.random() * 3)
    } else {
        return Math.ceil(Math.random() * 4)
    }
}

const syllables = [
    'CV', 'CV', 'CV', 'CV', 'CV', 'CVC', 'CVC', 'CVC', 'VC', 'VC'
];

const syllableMaker = (syllable: string) => {
    let product = ""
    for (let i=0; i<syllable.length; i++) {
        if (syllable[i] === 'C') {
            product += C();
        } else {
            product += V();
        }
    }
    return product;
}

export function nameMaker (): {first: string, last: string} {
    let firstCount = syllableCount('first');
    let lastCount = syllableCount('second');
    let first = "";
    let last = "";
    while (firstCount > 0) {
        first += syllableMaker(picker(syllables));
        firstCount--;
    }
    while (lastCount > 0) {
        last += syllableMaker(picker(syllables));
        lastCount--;
    }
    return {
        first, 
        last
    }
}