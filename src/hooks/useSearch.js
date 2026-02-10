import { useMemo } from 'react'
import { computeMatches } from '../utils/matching'

/**
 * Hook that computes match results for a given query against sections.
 * Returns { results, matchCount, isOnlyOne }.
 */
export default function useSearch(query, sections) {
    return useMemo(() => {
        const trimmed = query.trim()
        const results = computeMatches(trimmed, sections)
        const matchCount = results.filter(r => r.matches).length
        const isOnlyOne = matchCount === 1
        const hasInput = trimmed.length > 0

        return { results, matchCount, isOnlyOne, hasInput }
    }, [query, sections])
}
