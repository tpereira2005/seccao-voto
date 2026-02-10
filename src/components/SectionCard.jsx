export default function SectionCard({ section, matchState }) {
    // matchState: 'exact' | 'partial' | 'no-match' | 'none'
    const stateClass =
        matchState === 'exact'
            ? 'match-exact'
            : matchState === 'partial'
                ? 'match-partial'
                : matchState === 'no-match'
                    ? 'no-match'
                    : ''

    const badgeText =
        matchState === 'exact'
            ? '✓ Secção'
            : matchState === 'partial'
                ? 'Possível'
                : ''

    return (
        <div className={`section-card ${stateClass}`}>
            <div className="section-top">
                <div className="section-number">
                    <span className="num">{section.num}</span>
                    Secção n.º {section.num}
                </div>
                <span className="match-badge">{badgeText}</span>
            </div>
            <div className="section-range">
                <span className="range-name" title={section.from}>
                    {section.from}
                </span>
                <span className="range-arrow">→</span>
                <span className="range-name" title={section.to}>
                    {section.to}
                </span>
            </div>
        </div>
    )
}
