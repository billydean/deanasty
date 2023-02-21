import type { People, Person, Title } from "../types";

//Only one title for now. Eventually titles will be more dynamic. Appearing, disappearing, changing hands. And there will be disputes among claimants.

export function firstTitle(year: number, holder: Person): {title: Title, title_news: string} {
    const title = {
        name: 'Examplia',
        id: 1,
        rank: 'Duchy',
        appellation: 'Duke',
        eta: year,
        status: 'extant',
        succession: 'primogen',
        succession_list: [],
        seat: 'Examplia'
        /**
         * avenir:
         *  - founder?
         */
    };

    const title_news = `${holder.name} ${holder.house} is the first ${title.appellation} of ${title.name}.`;

    return {
        title,
        title_news
    }
}

export function primogeniture (title: Title, parent: Person, child: Person): {updated_succession_list: string[], child_title: number | undefined} {
    let exported_list = title.succession_list.map(id => id);
    let child_title = undefined;
    let male_siblings: number = 0;

    for (let i=0;i<parent.relations.offspring.length; i++) {
        if (parent.relations.offspring[i].slice(-1) === 'M') {
            male_siblings++;
        }
    }

    if (child.sex === 'male') {
        child_title = parent.title_claim;
        let found_index: number = exported_list.findIndex(id => id === parent.id);
        found_index = found_index + male_siblings + 1;
        exported_list.splice(found_index,0,child.id);
    }
    return {
        updated_succession_list: exported_list,
        child_title
    }
}

export function checkSuccessionAtBirth (title: Title, parent: Person, child: Person): {updated_succession_list: string[], child_title: number | undefined} {
    if (title.succession === 'primogen') {
        const {updated_succession_list, child_title} = primogeniture(title, parent, child)
        return {updated_succession_list, child_title};
    } else {
        return {updated_succession_list: title.succession_list, child_title: undefined}
    }
}

// title?: {
//     name: string, // pulled from 'rank' and 'name' of Title. 'Rank of Name'
//     address: string, // 'appellation' in Title
//     id: number, // matches Title id (for other checks/calculations)
// },

// Find heir
// Add title info to new title holder

export function findHeir (title: Title, people: People, news: string[] ) {
    let heir_found = false;
    let while_count = 0;
    while (heir_found === false && while_count < title.succession_list.length) {
        const candidate = title.succession_list[while_count];
        if (people.some(person => person.id === candidate)) {
            const heir = people.find(person => person.id === candidate);
            heir!.title = {
                name: `${title.rank} of ${title.name}`,
                address: title.appellation,
                id: title.id
            };
            title.holder = {
                name: `${heir!.name} of House ${heir!.house}`,
                id: heir!.id
            };
            news.push(`Hail ${title.appellation} ${title.holder.name}, the new ${title.appellation} of ${title.name}.`);
            // title.succession_list = title.succession_list.slice(title.succession_list.findIndex(id => id === heir!.id))
            heir_found = true;
        } else {
            while_count++;
        }
    };
    
}

// {
//     let heir_found = false;
//     let holder_info = {
//         name: "",
//         id: ""
//     }
//     let while_count = 0;
//     while (heir_found === false) {
//         const candidate = title.succession_list[while_count];
//         if (people.some(person => person.id === candidate)) {
//             const heir = people.find(person => person.id === candidate);
//             if (heir) {
//                 holder_info.name = heir.name;
//                 holder_info.id = heir.id;
//             }
            
//         }
//     }

//     return {
//         holder_info,
//         title_info: {
//             name,
//             address,
//             id
//         }
//     }
// }

// Add title info to new title holder

// Change title info: new holder, trimmed succession list

