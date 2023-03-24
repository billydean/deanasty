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

// FORMAT FOR BRACKET FUNCTIONS
// AGE  4   9   14  19  24  29  34  39  44  49  54  59  64  69  74  79  84  89  94  99  104 109 114


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
     *      15-19   1 in 10     1000
     *      20-24   1 in 5      2000
     *      25-29   1 in 8      1250
     *      30-34   1 in 10     1000
     *      35-39   1 in 15     667
     *      40-44   1 in 20     500
     *      45-49   1 in 30     333
     *      50-54   1 in 40     250
     *      55-59   1 in 50     200
     *      60-64   1 in 60     167
     *      65-69   1 in 75     133
     *      70-74   1 in 90     110
     *      75-79   1 in 120    83
     *      80-84   1 in 150    67
     *      85-89   0
     *      90-94   0
     *      95-99   0
     *      100-104 0
     *      105-109 0
     *      110-114 0 
     */
    
    const total = 1000;
    const chance_array = [
// AGE  4   9   14  19  24  29  34  39  44  49  54  59  64  69  74  79  84  89  94  99  104 109 114
        0,  0,  0,  100,250,225,200,175,150,125,100,75, 50, 25, 20, 15, 10, 0,  0,  0,  0,  0,  0
    ]

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
    const chance_array = [
// AGE  4   9   14  19  24  29  34  39  44  49  54  59  64  69  74  79  84  89  94  99  104 109 114
        0,  0,  0,  100,200,150,100,75, 25, 10,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0
    ];
    return masterBracketLogic(age,total,chance_array, modifier);
};

// Chances of having a slapstick accident
/**
 * 
 * @param age 
 * @param modifier - Possible modifiers: sickness, frailty, stress/morale?
 */
export function slapstickOdds (age: number, modifier: number = 1): boolean {
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
    const chance_array = [
// AGE  4   9   14  19  24  29  34  39  44  49  54  59  64  69  74  79  84  89  94  99  104 109 114
        0,  25, 50, 100,125,80, 50, 30, 30, 30, 50, 75, 100,100,100,100,100,100,100,100,100,100,100
    ];
    return masterBracketLogic(age,total,chance_array, modifier);
}

// Chances of slapstick accident being fatal
// LOWERED MODIFIER TO SEE IF I SHOULD ADJUST ODDS
export function fatalSlapstickOdds (age: number, modifier: number = 1): boolean {
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
        const chance_array = [
// AGE  4   9   14  19  24  29  34  39  44  49  54  59  64  69  74  79  84  89  94  99  104 109 114
        0,  100,50, 100,150,50, 50, 60, 80, 120,160,200,350,500,600,650,700,750,800,850,900,900,950
        ];
        return masterBracketLogic(age,total,chance_array, modifier);
    }
export function catchContagionOdds (age: number, modifier: number = 1): boolean {
        /** The odds of being infected at age... 
             *      0-4     1300
             *      5-9     900
             *      10-14   600
             *      15-19   400
             *      20-24   300
             *      25-29   250
             *      30-34   200
             *      35-39   150
             *      40-44   100
             *      45-49   200
             *      50-54   300
             *      55-59   400
             *      60-64   500
             *      65-69   600
             *      70-74   700
             *      75-79   800
             *      80-84   900
             *      85-89   1000
             *      90-94   1000
             *      95-99   1000
             *      100-104 1000
             *      105-109 1000
             *      110-114 1000
             */
            const total = 20000;
            const chance_array = [
// AGE  4   9   14  19  24  29  34  39  44  49  54  59  64  69  74  79  84  89  94  99  104 109 114
        800,500,300,275,250,225,200,150,100,100,150,200,250,300,350,400,450,500,500,500,500,500,500
            ];
            return masterBracketLogic(age,total,chance_array, modifier);
        };

export function oddsFatalDisease (age: number, modifier: number = 0.2): boolean {
                /** The odds of being infected at age... 
             *      0-4     4000
             *      5-9     3300
             *      10-14   2650
             *      15-19   2000
             *      20-24   1250
             *      25-29   1000
             *      30-34   1250
             *      35-39   1500
             *      40-44   1750
             *      45-49   2000
             *      50-54   2250
             *      55-59   2500
             *      60-64   2750
             *      65-69   3000
             *      70-74   3300
             *      75-79   3600
             *      80-84   4000
             *      85-89   4500
             *      90-94   4750
             *      95-99   5000
             *      100-104 5500
             *      105-109 6000
             *      110-114 7000
             */
                const total = 1000;
                const chance_array = [
// AGE  4   9   14  19  24  29  34  39  44  49  54  59  64  69  74  79  84  89  94  99  104 109 114
        400,330,265,200,125,100,125,150,175,200,225,250,275,300,330,360,400,450,475,500,550,600,700
                ];
                return masterBracketLogic(age,total,chance_array, modifier);

    }

// 