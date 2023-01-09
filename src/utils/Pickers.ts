import { beta } from '@stdlib/random/base';

// export function pickSex (): string {
//     const value: number = Math.ceil(Math.random() * 2);
//     return value === 1
//         ? 'female'
//         : 'male'
// }

// export function setFertility (): number {
//     return Math.ceil(beta(3,2) * 100);
// }

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