import type { People, Year, Events } from '../types';
import Annal from './Annal';

function Annals({year, people, events}: {year: Year, people: People, events: Events}) {
    
    const filteredEvents = events.filter((eachYear) => eachYear.events.length > 0)
  
    return (
        <div>
        <div>
            The year is { year.current }.
        </div>

        { filteredEvents.map(eachYear => (
            <div key={eachYear.year}>
            <Annal year={eachYear.year} events={eachYear.events} />
            </div>
        ))   
        }
        {
        people.map(each => (
             <div key={each.id}>
                 { each.name } is { each.age } years old. They will die in the year {each.old_year}. They are { each.alive ? `alive` : `dead`}. Their fertility level is: { each.fertility }.
             </div>
         ))
        } 
        </div>
    
    )
};


export default Annals;