import { useState, ChangeEvent } from "react"
import { ISearchProps } from "../types/ISearch";

export default function Search({ searchFilter }: ISearchProps) {

    let [inputState, setInputState] = useState<string>('')


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {

        setInputState(event.target.value);
        searchFilter(event.target.value)



    };
    const handleButtonSearch = () => {

        searchFilter(inputState)



    };

    return (
        <div className='search-block' >
            <input type="text " id='search-input' value={inputState} onChange={handleInputChange} className='search-input' placeholder='Search whatever' />
            <input type="button" className='search-button' id="search-button" onClick={handleButtonSearch} value={'Search'} />
        </div>
    )
}
