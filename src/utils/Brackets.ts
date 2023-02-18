
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
