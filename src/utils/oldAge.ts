import { beta } from '@stdlib/random/base';


export function deathRate(birth_year: number, modifier: number = 0): number {
    return Math.ceil(beta(5,3) * 20) + 0 + modifier + birth_year
}