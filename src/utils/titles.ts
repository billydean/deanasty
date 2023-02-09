import type { Person, Title } from "../types";

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
        seat: 'Examplia'
        /**
         * avenir:
         *  - founder?
         */
    };

    const title_news = `${holder.name} is the first ${title.appellation} of ${title.name}.`;

    return {
        title,
        title_news
    }
}

/**TODO
 * 
 * 1. Add title to worldgen and first person
 * 2. Death Handler: Person have title? Is there an heir? Add heir to title and title to heir. Add new heir to title. Inheritance news.
 * 3. ^^ First-- succession handler. Will determine what to do at death, etc.
 * 4. Birth check: Parent have title? Meet conditions for heir? Heir news.
 * 
 * 
 * will involve
 *      titles
 *      checks
 *      people
 *      masterFunctions
 *      reducer
 */