import { useState } from 'react'
import SearchBar from './SearchBar'
import SectionList from './SectionList'
import useSearch from '../hooks/useSearch'

export default function SearchView({ sections }) {
    const [query, setQuery] = useState('')
    const { results, matchCount, isOnlyOne, hasInput } = useSearch(query, sections)

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
