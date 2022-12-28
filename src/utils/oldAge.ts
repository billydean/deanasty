import { beta } from '@stdlib/random/base';


export default function deathRate(birth_year: number, modifier: number = 0): number {
    return Math.ceil(beta(5,3) * 60) + 50 + modifier + birth_year
}