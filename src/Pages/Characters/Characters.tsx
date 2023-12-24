// import React, { useState, useEffect } from 'react';
import AddUser from '../../Components/AddUser/AddUser';

const Characters = () => {
  const getDataFromLocalStorage = (_data: string): boolean => {
    return false
  }

  return (
    <div className="flex flex-wrap">
      {getDataFromLocalStorage("characters") ?
        "Characters found from local storage" :
        <AddUser />
      }
    </div>
  );
};

export default Characters;
