import React, { useEffect, useState, useRef } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Input } from './ui/input'
import { Client } from '@/types/user/client-types';
import { getClients } from '@/actions/getClients';

interface SearchProps {
    onSelectResult: (result: any) => void;
    placeholder: string;
    type: "client" | "product";
    disabled?: boolean;
}

const Search: React.FC<SearchProps> = ({ onSelectResult,placeholder, type, disabled }) => {
    const [results, setResults] = useState<Client[]>([])
    const [query, setQuery] = useState("")
    const [filteredResults, setFilteredResults] = useState<Client[]>([])
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    const handleFetch = async () => {

        const data = await getClients();
        console.log("Datos obtenidos:", data); // Verifica si `data` tiene información correcta
        setResults(data as Client[]);
    }

    useEffect(() => {
        handleFetch()
    }, [])

    useEffect(() => {
        if (query.length >= 3) {
            const lowerCaseQuery = query.toLowerCase()
            const filtered = results.filter(result => {
                if (type === "client" && result.fullName) {
                    return result.fullName.toLowerCase().includes(lowerCaseQuery);
                }
                return false;
            });                   
            setFilteredResults(filtered)
            console.log("filtered", filtered);
            
        } else {
            setFilteredResults([])
        }
    }, [query, results, type])

    useEffect(() => {
        if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
            itemRefs.current[highlightedIndex].focus()
        }
    }, [highlightedIndex])

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, filteredResults.length - 1))
        } else if (event.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0))
        } else if (event.key === 'Enter' && highlightedIndex >= 0) {
            onSelectResult(filteredResults[highlightedIndex])
            setQuery("")
            setFilteredResults([])
            setHighlightedIndex(-1)
        }
    }

    const handleItemClick = (result: Client, index: React.SetStateAction<number>) => {
        setHighlightedIndex(index)
        onSelectResult(result)
        setQuery("")
        setFilteredResults([])
        setHighlightedIndex(-1)
    }

    return (
        <div>
            <Input
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
            />
            {query.length >= 3 && (
                <ScrollArea className="rounded-md border mt-2">
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Resultados</h4>
                        {filteredResults.length > 0 ? (
                            filteredResults.map((result, index) => (
                                <div
                                    key={result.id}
                                    className={`text-sm cursor-pointer p-2 ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
                                    onClick={() => handleItemClick(result, index)}
                                    onKeyDown={handleKeyDown}
                                    ref={(el) => {
                                        itemRefs.current[index] = el;
                                    }}
                                    tabIndex={0}
                                >
                                    {type === "client" ? (
                                        <>
                                            {result.fullName}
                                        </>
                                    ) : (
                                        <>
                                            
                                        </>
                                    )}
                                    <Separator className="my-2" />
                                </div>
                            ))
                        ) : (
                            <div className="text-sm">No se encontraron resultados</div>
                        )}
                    </div>
                </ScrollArea>
            )}
        </div>
    )
}

export default Search
