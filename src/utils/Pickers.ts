import { beta } from '@stdlib/random/base';

export function pickSex (): string {
    const value: number = Math.ceil(Math.random() * 2);
    return value === 1
        ? 'female'
        : 'male'
}

/**
 * 
 * @param age Age of person in question, influences chances of success.
 * 
 * Note: Other parameters may be added!
 */
export function willYouMarryMe (age: number): boolean {
    const check: number = Math.floor(age / 5);
    const picker: number = Math.ceil(Math.random() * 2560)
    
    switch (check) {
        case 3: return picker <= 64
        case 4: return picker <= 384
        case 5: return picker <= 384
        case 6: return picker <= 128
        case 7: return picker <= 128
        case 8: return picker <= 32
        case 9: return picker <= 32
        case 10: return picker <= 16
        case 11: return picker <= 8
        case 12: return picker <= 4
        case 13: return picker <= 4
        case 14: return picker <= 2
        case 15: return picker === 1
        default: return false;
    }
}

export function setFertility (): number {
    return Math.ceil(beta(2.5,2) * 100);
}

/**back of napkin math:
 * when do I think folks should get married?
 * 
 * gut-estimate based on age brackets
 * 
 * 
 * 15   64      1/40
 * 20   256     1/10
 * 25   256     1/10
 * 30   128     1/20
 * 35   128     1/20
 * 40   32      1/80
 * 45   32      1/80
 * 50   16      1/160
 * 55   8       1/320
 * 60   4       1/640
 * 65   4       1/640
 * 70   2       1/1280
 * 75   1       1/2560
 * 
 * 
 */