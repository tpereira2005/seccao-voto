/**
 * Export sections as a JSON file download.
 */
export function exportJSON(sections, postoName = 'posto') {
    const data = {
        version: 1,
        postoName,
        exportedAt: new Date().toISOString(),
        sections: sections.map(({ from, to }) => ({ from, to })),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `seccoes-${postoName.toLowerCase().replace(/\s+/g, '-')}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

/**
 * Import sections from a JSON file.
 * Returns a promise that resolves with the parsed sections array.
 */
export function importJSON(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result)

                // Validate structure
                let sections
                if (Array.isArray(data)) {
                    sections = data
                } else if (data.sections && Array.isArray(data.sections)) {
                    sections = data.sections
                } else {
                    throw new Error('Formato inválido')
                }

                // Validate each section
                const valid = sections.every(s =>
                    typeof s.from === 'string' && s.from.trim() &&
                    typeof s.to === 'string' && s.to.trim()
                )
                if (!valid) throw new Error('Cada secção precisa de campos "from" e "to"')

                // Normalize
                const normalized = sections.map((s, i) => ({
                    id: i + 1,
                    num: i + 1,
                    from: s.from.trim(),
                    to: s.to.trim(),
                }))

                resolve(normalized)
            } catch (err) {
                reject(new Error(err.message || 'Erro ao ler ficheiro'))
            }
        }
        reader.onerror = () => reject(new Error('Erro ao ler ficheiro'))
        reader.readAsText(file)
    })
}
