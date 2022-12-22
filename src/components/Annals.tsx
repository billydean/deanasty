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
                {each.name} is {currentYear - each.birth_year} years old.
            </div>
        ))
        }
        </div>
        </div>
    )
};


export default Annals;