
const ActivityCard = ({ item }) => {
    const Icon = item.icon;

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3 hover:shadow-md transition">

            <Icon
                size={21}
                className="text-orange-500 shrink-0"
            />

            <div>
                <p className="text-[10px] text-gray-500">
                    {item.title}
                </p>

                <h3 className="text-lg font-bold text-gray-800 leading-5">
                    {item.value}
                </h3>

                <p className="text-[10px] text-gray-400">
                    {item.subtitle}
                </p>
            </div>
        </div>
    );
};

export default ActivityCard;
