import type { Person, SuccessionList, SuccessionTuple, Title } from "../types";

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

export function primogeniture (title: Title, parent: Person, child: Person): {updated_succession_list: SuccessionList, child_title: number | undefined} {
    let newline: SuccessionList = []
    let child_title = undefined;
    if (child.sex === 'male') {
        child_title = parent.title_claim;
        let found_index: number = title.succession_list.findIndex(tuple => tuple[0] === parent.id);
        if (found_index === -1) {
            newline = [[parent.id, [child.id]]];
        } else {
            title.succession_list[found_index][1].push(child.id)
        }
    }
    const updated_succession_list: SuccessionList = newline.concat(title.succession_list);

    return {
        updated_succession_list,
        child_title
    }
}

export function checkSuccessionAtBirth (title: Title, parent: Person, child: Person): {updated_succession_list: SuccessionList, child_title: number | undefined} {
    if (title.succession === 'primogen') {
        const {updated_succession_list, child_title} = primogeniture(title, parent, child)
        return {updated_succession_list, child_title};
    } else {
        return {updated_succession_list: title.succession_list, child_title: undefined}
    }
}