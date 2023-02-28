
/** Master Helper -- 
 *      The logic behind every check where the chances of something happening vary by age bracket.
 *      It will never be called directly; it only helps form the helpers that will be called.
 *      The called helper will (normally?) only take "age" as a param. It feeds age through this master 
 *      to get a boolean (whether the sim passes the check or not).
 *  @param age - Should be passed down.
 *  @param total_chances - 100 if chances are 1 in 100.
 *  @param chance_array - Array of 23 numbers for each five-year bracket (0-114yo).
 *  @param modifier - In some cases, a modifier make success more or less likely. Should be passed down.
 * 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22  
 */
function masterBracketLogic (age: number, total_chances: number, chance_array: number[], modifier: number = 1): boolean {
    const level: number = Math.floor(age / 5);
    let chances: number = Math.ceil(Math.random() * total_chances);
    chances *= modifier;
    switch (level) {
        case 0: return chances <= chance_array[0]
        case 1: return chances <= chance_array[1]
        case 2: return chances <= chance_array[2]
        case 3: return chances <= chance_array[3]
        case 4: return chances <= chance_array[4]
        case 5: return chances <= chance_array[5]
        case 6: return chances <= chance_array[6]
        case 7: return chances <= chance_array[7]
        case 8: return chances <= chance_array[8]
        case 9: return chances <= chance_array[9]
        case 10: return chances <= chance_array[10]
        case 11: return chances <= chance_array[11]
        case 12: return chances <= chance_array[12]
        case 13: return chances <= chance_array[13]
        case 14: return chances <= chance_array[14]
        case 15: return chances <= chance_array[15]
        case 16: return chances <= chance_array[16]
        case 17: return chances <= chance_array[17]
        case 18: return chances <= chance_array[18]
        case 19: return chances <= chance_array[19]
        case 20: return chances <= chance_array[20]
        case 21: return chances <= chance_array[21]
        case 22: return chances <= chance_array[22]
        default: return false;
    }   
}

/**
 * 
 * @param age - Age of the person checked.
 * @param modifier - Modifier, when applicable. Defaults at 1 (100%).
 * @returns Married or not (boolean) after running age through probability brackets using masterBracketLogic
 */
export function willYouMarryMe (age: number, modifier: number = 1): boolean {
    /** Chances of getting married age...
     *      0-4     0
     *      5-9     0
     *      10-14   0
     *      15-19   56 in 5600  TO 84?
     *      20-24   280 in 5600 420?
     *      25-29   560 in 5600 840?
     *      30-34   280 in 5600 420?
     *      35-39   187 in 5600 281?
     *      40-44   112 in 5600 168?
     *      45-49   56 in 5600  84?
     *      50-54   37 in 5600  56?
     *      55-59   37 in 5600  56?
     *      60-64   28 in 5600  42
     *      65-69   18 in 5600  27
     *      70-74   9 in 5600   14
     *      75-79   8 in 5600   12
     *      80-84   7 in 5600   10
     *      85-89   0
     *      90-94   0
     *      95-99   0
     *      100-104 0
     *      105-109 0
     *      110-114 0 
     */
    const total = 5600;
    const chance_array = [0,0,0,300,900,900,560,281,168,84,56,56,42,27,14,12,10,0,0,0,0,0,0];

    return masterBracketLogic(age,total,chance_array, modifier);
};

/**
 * 
 * @param age - Age of the person checked.
 * @param modifier - Modifier, when applicable. Defaults at 1 (100%).
 * @returns Married or not (boolean) after running age through probability brackets using masterBracketLogic
 */
export function babyOnTheWay (age: number, modifier: number = 1): boolean {
    /** The chances of getting pregnant at age...
     *      0-4     0
     *      5-9     0
     *      10-14   0
     *      15-19   100 in 1000 150
     *      20-24   180 in 1000 270
     *      25-29   160 in 1000 240
     *      30-34   140 in 1000 210
     *      35-39   100 in 1000 150
     *      40-44   40 in 1000  60
     *      45-49   5 in 1000   8
     *      50-54   0
     *      55-59   0
     *      60-64   0
     *      65-69   0
     *      70-74   0
     *      75-79   0
     *      80-84   0
     *      85-89   0
     *      90-94   0
     *      95-99   0
     *      100-104 0
     *      105-109 0
     *      110-114 0 
     */
    const total = 1000;
    const chance_array = [0,0,0,120,220,200,180,125,50,8,0,0,0,0,0,0,0,0,0,0,0,0,0];
    return masterBracketLogic(age,total,chance_array, modifier);
};

// Chances of having a slapstick accident
/**
 * 
 * @param age 
 * @param modifier - Possible modifiers: sickness, frailty, stress/morale?
 */
export function slapstickOdds (age: number, modifier: number = .85): boolean {
/** The chances of having a PHYSICAL accident at age... 
     *      0-4     0
     *      5-9     20
     *      10-14   40
     *      15-19   80
     *      20-24   100
     *      25-29   60
     *      30-34   40
     *      35-39   20
     *      40-44   20
     *      45-49   20
     *      50-54   40
     *      55-59   60
     *      60-64   80
     *      65-69   80
     *      70-74   80
     *      75-79   80
     *      80-84   80
     *      85-89   80
     *      90-94   80
     *      95-99   80
     *      100-104 80
     *      105-109 80
     *      110-114 80 
     */
    const total = 5000;
    const chance_array = [0,20,40,80,100,60,40,20,20,20,40,60,80,80,80,80,80,80,80,80,80,80,80];
    return masterBracketLogic(age,total,chance_array, modifier);
}

// Chances of slapstick accident being fatal
// LOWERED MODIFIER TO SEE IF I SHOULD ADJUST ODDS
export function fatalSlapstickOdds (age: number, modifier: number = 0.5): boolean {
    /** The odds of a physical accident being fatal at age... 
         *      0-4     0
         *      5-9     100
         *      10-14   50
         *      15-19   100
         *      20-24   150
         *      25-29   50
         *      30-34   50
         *      35-39   60
         *      40-44   80
         *      45-49   120
         *      50-54   160
         *      55-59   200
         *      60-64   350
         *      65-69   500
         *      70-74   600
         *      75-79   650
         *      80-84   700
         *      85-89   750
         *      90-94   800
         *      95-99   850
         *      100-104 900
         *      105-109 900
         *      110-114 950 
         */
        const total = 1000;
        const chance_array = [0,100,50,100,150,50,50,60,80,120,160,200,350,500,600,650,700,750,800,850,900,900,950];
        return masterBracketLogic(age,total,chance_array, modifier);
    }

    export function catchContagionOdds (age: number, modifier: number = 1): boolean {
        /** The odds of being infected at age... 
             *      0-4     120
             *      5-9     120
             *      10-14   120
             *      15-19   120
             *      20-24   150
             *      25-29   180
             *      30-34   180
             *      35-39   180
             *      40-44   180
             *      45-49   180
             *      50-54   150
             *      55-59   150
             *      60-64   150
             *      65-69   120
             *      70-74   120
             *      75-79   120
             *      80-84   120
             *      85-89   120
             *      90-94   120
             *      95-99   120
             *      100-104 120
             *      105-109 120
             *      110-114 120
             */
            const total = 6000;
            const chance_array = [120,120,120,120,150,180,180,180,180,180,150,150,150,120,120,120,120,120,120,120,120,120,120];
            return masterBracketLogic(age,total,chance_array, modifier);
        };

    export function oddsFatalDisease (age: number, modifier: number = 1): boolean {
                /** The odds of being infected at age... 
             *      0-4     2000
             *      5-9     1500
             *      10-14   1000
             *      15-19   500
             *      20-24   250
             *      25-29   125
             *      30-34   100
             *      35-39   125
             *      40-44   125
             *      45-49   250
             *      50-54   250
             *      55-59   500
             *      60-64   500
             *      65-69   1000
             *      70-74   1000
             *      75-79   2000
             *      80-84   2000
             *      85-89   3000
             *      90-94   3000
             *      95-99   3000
             *      100-104 4000
             *      105-109 4000
             *      110-114 4000
             */
                const total = 6000;
                const chance_array = [120,120,120,120,150,180,180,180,180,180,150,150,150,120,120,120,120,120,120,120,120,120,120];
                return masterBracketLogic(age,total,chance_array, modifier);

    }


// Need bracket for....
// Chance of catching infection
// Chance of showing symptoms
// Chance of dying from infection
// Chance of inheriting condition?
// Chance of developing new condition?
// Chance of condition manifesting
// Chance of dying from condition