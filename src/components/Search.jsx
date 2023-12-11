import React from 'react'
import {BiSearch} from 'react-icons/bi'
import './Search.css';
const Search = ({value, onChange}) => {
  return (
    <div className='flex relative'>
        <BiSearch className="icon" size={20} />
        <input className='search' type="text" placeholder='Search by Name/Category' value={value} onChange={onChange}/>
    </div>
  )
}

export default Search