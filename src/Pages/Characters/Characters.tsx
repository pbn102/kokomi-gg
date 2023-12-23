import React, { useState, useEffect } from 'react';

const Characters = () => {
  const [content, setContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetch('https://kokomi-api-pols.onrender.com/users/600035485').then((response) => response.json());
        const characters = user.characters;

        if (!characters || Object.keys(characters).length === 0) {
          setContent("This user has no detailed characters on the profile.");
          return;
        }

        const newContent = [];
        for (const charKey in characters) {
          if (characters.hasOwnProperty(charKey)) {
            const char = characters[charKey];
            const name = char.characterData.name.text;
            const level = char.level;
            const maxLevel = char.maxLevel;

            const statsList = [];
            for (const statKey in char.stats.statProperties) {
              if (char.stats.statProperties.hasOwnProperty(statKey)) {
                const stat = char.stats.statProperties[statKey];
                const formattedValue = stat.isPercent
                  ? `${(stat.value * 100).toFixed(2)}%`
                  : parseFloat(stat.value).toFixed(2);
                statsList.push(
                  <p key={statKey} className="text-sm">
                    {stat.fightPropName.text}: {formattedValue}
                  </p>
                );
              }
            }

            newContent.push(
              <div key={charKey} className="bg-white p-4 m-4 rounded-md shadow-md">
                <h2 className="text-lg font-bold">{name} - Lv.{level}/{maxLevel}</h2>
                {statsList}
              </div>
            );
          }
        }

        setContent(newContent);
      } catch (error) {
        console.error('Error fetching data:', error);
        setContent("Error fetching data");
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return <div className="flex flex-wrap">{content}</div>;
};

export default Characters;
