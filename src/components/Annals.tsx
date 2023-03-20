import type { Year, Events } from '../types';
import Annal from './Annal';
import { Divider } from '@mui/material';
import { People } from '../classes';
function Annals({year, people, events}: {year: Year, people: People, events: Events}) {
    
    const filteredEvents = events.filter((eachYear) => eachYear.events.length > 0)
  
    return (
        <div>
        <div>
            The year is { year.current }.
        </div>
        <Divider variant="fullWidth" />
        { filteredEvents.map(eachYear => (
            <div key={eachYear.year}>
                {eachYear.year !== 1000 &&
                <Divider variant="fullWidth" light /> }
                <Annal year={eachYear.year} events={eachYear.events} />
            </div>
        ))   
        }
        <Divider variant="fullWidth" />
        {
        people.map(each => {
            let count = 0;
            return (
                <div key={each.id}>
                 { each.name } is { each.age } years old. House { each.house }. &nbsp;
                 {
                    each.dna.map(gene => {
                        let key = count;
                        count++;
                        return (
                            <span key={key} className={`gene${key}`}>{gene}</span>  
                        )
                    })
                 }
                </div>
            )
        })
    }    
    </div>
    
    )
};


export default Annals;