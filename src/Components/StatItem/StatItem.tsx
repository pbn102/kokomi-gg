import React from 'react';

interface StatItemProps {
    icon: React.ComponentType;
    label?: string;
    value: string | number;
    color?: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, label, value, color }) => {
    return (
        <div className="flex flex-row space-x-1" style={{ color }}>
            <Icon />
            {label && (
                <p>
                    {label}: {value}
                </p>
            )}
            {!label && <p>{value}</p>}
        </div>
    );
};

export default StatItem;
