import { useState, useRef, useEffect } from 'react'
import SearchBar from './SearchBar'
import SectionList from './SectionList'
import useSearch from '../hooks/useSearch'

export default function SearchView({ sections, trackSearch }) {
    const [query, setQuery] = useState('')
    const { results, matchCount, isOnlyOne, hasInput } = useSearch(query, sections)
    const debounceRef = useRef(null)

    // Track searches with debounce
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (query.trim()) {
            debounceRef.current = setTimeout(() => {
                trackSearch(query)
            }, 1500)
        }
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [query, trackSearch])

    return (
        <div className="search-view fade-in">
            <SearchBar value={query} onChange={setQuery} />
            <SectionList
                results={results}
                hasInput={hasInput}
                isOnlyOne={isOnlyOne}
                matchCount={matchCount}
                totalCount={sections.length}
            />
        </div>
    )
}
