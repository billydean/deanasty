import { useAppSelector } from './store/hooks';
import { selectCurrentYear } from './store/yearSlice';

function Annals() {
    const currentYear = useAppSelector(selectCurrentYear);

    return (
            <div>
                The year is { currentYear }.
                </div>
    )
};

export default Annals;