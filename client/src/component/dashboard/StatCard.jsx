const StatCard = ({ item }) => {
    const Icon = item.icon;

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3 min-w-0 hover:shadow-md transition">
            <div className={`${item.color} rounded-lg p-3 text-white shrink-0`}>
                <Icon size={21} />
            </div>

            <div className="min-w-0">
                <p className="text-[11px] text-gray-500 truncate">
                    {item.title}
                </p>

                <h3 className="text-lg font-bold text-gray-800">
                    {item.value}
                </h3>

                <p className="text-[10px] text-gray-400">
                    {item.subtitle}
                </p>
            </div>
        </div>
    );
};

export default StatCard;