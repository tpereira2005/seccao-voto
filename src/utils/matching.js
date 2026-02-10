/**
 * Normalize a string for alphabetical comparison:
 * uppercase, strip diacritics, trim whitespace.
 */
export function normalize(str) {
    return str
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
}

/**
 * Check if a typed name (possibly partial) could belong to a given section.
 * Returns true if the name falls within [from, to] range, or if it's a prefix
 * of either boundary (meaning it could still match as more characters are typed).
 */
export function sectionMatches(input, section) {
    const ni = normalize(input)
    if (!ni) return false

    const nFrom = normalize(section.from)
    const nTo = normalize(section.to)

    // Fully inside range
    if (ni >= nFrom && ni <= nTo) return true
    // Input is a prefix of the 'from' boundary
    if (nFrom.startsWith(ni)) return true
    // Input is a prefix of the 'to' boundary
    if (nTo.startsWith(ni)) return true

    return false
}

/**
 * Given a search query and a list of sections, return an array of
 * { section, matches } objects sorted so matches come first.
 */
export function computeMatches(query, sections) {
    const trimmed = query.trim()
    if (!trimmed) {
        return sections.map(s => ({ section: s, matches: false }))
    }

    const results = sections.map(s => ({
        section: s,
        matches: sectionMatches(trimmed, s),
    }))

    // Sort: matches first, preserving original order within each group
    return [
        ...results.filter(r => r.matches),
        ...results.filter(r => !r.matches),
    ]
}
