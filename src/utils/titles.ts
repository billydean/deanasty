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
