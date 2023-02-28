import type { ConditionInstance, Condition } from "../types";
// Inherited conditions
// Will not *directly* manifest as events or cause events. Treat as "risk factors." Should be invisible unless actualized. Should be imperfectly inherited. Should occasionally be added to new babies spontaneously.

// Condition types have names, effects object, inheritibility index.
// Condition instances have additional "severity index," modifying likelihood of manifesting.

// set of inherited condition types
export const inConditions: Condition[] = [
    {
        name: 'heart',
        inheritibility: 0.85,
        effect: {
            mortality: 0.67
        },
        news: {
            mortality: 'of a heart attack'
        }
    },
    {
        name: 'stroke',
        inheritibility: 0.85,
        effect: {
            mortality: 0.67
        },
        news: {
            mortality: 'after a sudden stroke'
        }
    },
    {
        name: 'epilepsy',
        inheritibility: 0.85,
        effect: {
            mortality: 0.67
        },
        news: {
            mortality: 'in the grip of a sudden possession'
        }
    },
    {
        name: 'hemophilia',
        inheritibility: 0.85,
        effect: {
            mortality: 0.67
        },
        news: {
            mortality: 'of bloodloss after a seemingly minor wound'
        }
    }
]

// Acquired conditions
// These will initially be random. Eventually, they will be caused by environmental or lifestyle factors, or appear as direct consequence of a person's actions.


// List of possible congenital conditions
/* 
Heart Risk
Stroke Risk
Epilepsy
Hemophilia
*/
// List of acquired conditions??
/* 
Ergotism
Scurvy
Heart Risk
Stroke Risk
Gout
Lead Poisoning
*/