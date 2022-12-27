import { beta } from '@stdlib/random/base';


const deathRate = (50* beta(4,8)) + 50

export default function (birth_year: number, modifier: number = 0) {
    return Math.ceil(beta(5,3) * 60) + 50 + modifier + birth_year
}