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
                <span className="range-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </span>
                <span className="range-name" title={section.to}>
                    {section.to}
                </span>
            </div>
        </div>
    )
}
