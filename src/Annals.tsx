import * as types from './types';
import { useState } from 'react';

function Annals() {
    const startingYear: types.Year = {
        current:1,
    }
    const [year, setYear] = useState(startingYear);
    return (
            <div>
                The year is { year.current }.
                </div>
    )
};

export default Annals;