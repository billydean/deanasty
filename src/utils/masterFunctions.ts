import { People } from "../types";
import { timeMarchesOn } from "./checks";
import { death, marriageStuff } from "./people";

export function okay (current_year: number, living_people: People, dead_people: People) {

    const { new_deaths, the_living, updated_dead } = death(current_year, living_people, dead_people);

    const aged_living = timeMarchesOn(the_living);

    const {new_spouses, marriage_news, people } = marriageStuff(current_year, aged_living);
}