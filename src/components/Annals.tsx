import { useAppSelector } from '../store/hooks';
import { selectCurrentYear } from '../store/yearSlice';
import { selectPeopleCheck } from '../store/checkSlice';

function Annals() {
    const currentYear = useAppSelector(selectCurrentYear);
    const peopleCheck = useAppSelector(selectPeopleCheck);

    return (
        <div>
        <div>
            The year is { currentYear }.
        </div>
        { peopleCheck == true 
            ? 
            <div>
                Start has been clicked; the wheels are in motion!
            </div>
            : 
            <div>
                The sim hasn't started, or someone clicked Restart.
            </div> 
        }
        </div>
    )
};

export default Annals;