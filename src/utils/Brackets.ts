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
export function willYouMarryMe (age: number, modifier: number = 2): boolean {
    // The chances of getting married....
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
export function babyOnTheWay (age: number, modifier: number = 1.5): boolean {
    // Chances of getting pregnant
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
export function slapstickOdds (age: number, modifier: number = 0.25): boolean {
// Chance of having physical accident
    const total = 5000;
    const chance_array = [
// AGE  4   9   14  19  24  29  34  39  44  49  54  59  64  69  74  79  84  89  94  99  104 109 114
        0,  25, 50, 100,125,80, 50, 30, 30, 30, 50, 75, 100,100,100,100,100,100,100,100,100,100,100
    ];
    return masterBracketLogic(age,total,chance_array, modifier);
}

// Chances of slapstick accident being fatal
// LOWERED MODIFIER TO SEE IF I SHOULD ADJUST ODDS
export function fatalSlapstickOdds (age: number, modifier: number = 0.3): boolean {
// Chance of physical accident being fatal
        const total = 1000;
        const chance_array = [
// AGE  4   9   14  19  24  29  34  39  44  49  54  59  64  69  74  79  84  89  94  99  104 109 114
        0,  100,50, 100,150,50, 50, 60, 80, 120,160,200,350,500,600,650,700,750,800,850,900,900,950
        ];
        return masterBracketLogic(age,total,chance_array, modifier);
    }
export function catchContagionOdds (age: number, modifier: number = .25): boolean {
// Chances of catching contagion
            const total = 20000;
            const chance_array = [
// AGE  4   9   14  19  24  29  34  39  44  49  54  59  64  69  74  79  84  89  94  99  104 109 114
        800,500,300,275,250,225,200,150,100,100,150,200,250,300,350,400,450,500,500,500,500,500,500
            ];
            return masterBracketLogic(age,total,chance_array, modifier);
        };

export function oddsFatalDisease (age: number, modifier: number = 0.05): boolean {
// Chance of contagion being fatal...
                const total = 1000;
                const chance_array = [
// AGE  4   9   14  19  24  29  34  39  44  49  54  59  64  69  74  79  84  89  94  99  104 109 114
        400,330,265,200,125,100,125,150,175,200,225,250,275,300,330,360,400,450,475,500,550,600,700
                ];
                return masterBracketLogic(age,total,chance_array, modifier);

    }

// 