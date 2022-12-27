import { useAppSelector } from '../store/hooks';
import { selectCurrentYear } from '../store/yearSlice';
import { selectPeople } from '../store/peopleSlice';

function Annals() {
    const currentYear = useAppSelector(selectCurrentYear);
    const people = useAppSelector(selectPeople);

    return (
        <div>
        <div>
            The year is { currentYear }.
        </div>
        <div>
        { 
        people.map(each => (
            <div key={each.id}>
                {each.name} is {currentYear - each.birth_year} years old. They will die in the year {each.old_year}.
            </div>
        ))
        }
        </div>
        </div>
    )
};


export default Annals;