interface TalentProps {
    picUrl: string;
    name: string;
    level: number;
};

const Talent: React.FC<TalentProps> = ({ picUrl, name, level }) => {
    return (
        <div className="indicator">
            <span className="indicator-item indicator-bottom badge badge-sm">{level}</span>
            <img
                src={picUrl}
                alt={name}
                className="avatar w-8"
            />
        </div>
    );
};

export default Talent;