import { useAppSelector } from '../store/hooks';
import { selectCurrentYear } from '../store/yearSlice';
import { selectPeople } from '../store/peopleSlice';
import type { People, Year } from '../types';

function Annals({year, people}: {year: Year, people: People}) {


    return (
        <div>
        <div>
            The year is { year.current }.
        </div>
        <div>
        { 
        people.map(each => (
            <div key={each.id}>
                {each.name} is { year.current - each.birth_year} years old. They will die in the year {each.old_year}.
            </div>
        ))
        }
        </div>
        </div>
    )
};


export default Annals;