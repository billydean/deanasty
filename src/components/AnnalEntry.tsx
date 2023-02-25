import type { NewsItem } from "../types"


function AnnalEntry ({category, content}: NewsItem) {
    const news_class = `${category}-news`;
    return (
        <span className={news_class}>
            { content }&nbsp;
        </span>
    )
}

export default AnnalEntry