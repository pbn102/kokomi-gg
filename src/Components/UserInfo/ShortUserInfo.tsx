import React from "react";

interface ShortUserInfoProps {
    name: string;
    picUrl: string;
    adventureRank: number;
    worldLevel: number;
    signature: string;
}

const ShortUserInfo: React.FC<ShortUserInfoProps> = ({ name, picUrl, adventureRank, worldLevel, signature }) => {
    return (
        <div className="card p-4 flex flex-row items-center justify-center rounded-md">
            <div className="avatar-container w-12 md:w-16">
                <img
                    src={picUrl}
                    alt={name}
                    className="avatar rounded-full w-full h-full"
                />
            </div>
            <div className="text-xl md:text-2xl pl-4 flex flex-col">
                <div className="flex items-center space-x-2">
                    <div className="font-semibold">{name}</div>
                    <div className="badge badge-neutral">AR {adventureRank}</div>
                    <div className="badge badge-ghost">WL {worldLevel}</div>
                </div>
                <div className="text-sm pb-1 text-left">{signature}</div>
            </div>
        </div>
    );
};

export default ShortUserInfo;
