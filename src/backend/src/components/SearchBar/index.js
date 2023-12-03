/**
 * @description: Box for user to type for search
 */

import { Search, SearchIconWrapper, StyledInputBase } from './style';

import { useNavigate } from "react-router-dom";

import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar(props) {

    const navigate = useNavigate();

    const handleSearch = (qwerty) => {
        navigate(`/search?q=${qwerty}`);
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch(e.target.value);
                    }
                }}
            />
        </Search>
    );
}

export default SearchBar;
