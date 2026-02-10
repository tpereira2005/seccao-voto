import SectionCard from './SectionCard'

export default function SectionList({ results, hasInput, isOnlyOne, matchCount, totalCount }) {
    if (hasInput && matchCount === 0) {
        return (
            <div className="no-results">
                <div className="icon">🔍</div>
                <p>Nenhuma secção encontrada</p>
                <p className="hint">Verifique o nome introduzido</p>
            </div>
        )
    }

    let statusText
    let countText

    if (!hasInput) {
        statusText = 'Todas as secções de voto'
        countText = `${totalCount} secções`
    } else if (isOnlyOne) {
        statusText = 'Secção encontrada'
        countText = `1 de ${totalCount}`
    } else {
        statusText = `${matchCount} secções possíveis — continue a escrever`
        countText = `${matchCount} de ${totalCount}`
    }

    return (
        <>
            <div className="results-status">
                <span className="label">{statusText}</span>
                <span className="count">{countText}</span>
            </div>
            <div className="sections-grid">
                {results.map(({ section, matches }) => {
                    let matchState = 'none'
                    if (hasInput) {
                        if (matches && isOnlyOne) matchState = 'exact'
                        else if (matches) matchState = 'partial'
                        else matchState = 'no-match'
                    }

                    return (
                        <SectionCard
                            key={section.id}
                            section={section}
                            matchState={matchState}
                        />
                    )
                })}
            </div>
        </>
    )
}
