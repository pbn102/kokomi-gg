// import React, { useState, useEffect } from 'react';
import AddUser from '../../Components/AddUser/AddUser';

interface CharactersProps {
  themePreference: string;
}

const Characters = ({ themePreference }: CharactersProps) => {
  const getDataFromLocalStorage = (_data: string): boolean => {
    return false
  }

  return (
    <div className="flex flex-wrap">
      { getDataFromLocalStorage("characters") ?
        "Characters found from local storage" :
        <AddUser themePreference={themePreference}/>
      }
    </div>
  );
};

export default Characters;
