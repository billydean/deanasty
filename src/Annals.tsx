import { useAppSelector } from './store/hooks';
import { selectCount } from './store/counterSlice';

function Annals() {
    const count = useAppSelector(selectCount);

    return (
            <div>
                The year is { count }.
                </div>
    )
};

export default Annals;