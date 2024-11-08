import CategoryData from "../data/CategoryData";
import "./CustomScrollbar.css"; 

export const Category = ({ onHandleSelect, categoryName }) => {
    const defaultData = CategoryData;
    
    return (
        <div className="w-[90%] bg-slate-400 h-16 overflow-x-auto custom-scrollbar flex items-center rounded-md">
            <div className="flex items-center space-x-4">
                {defaultData.map((category, index) => (
                    <div
                        key={index}
                        className={` rounded-md border-2 min-w-[10rem] flex justify-center items-center mx-4 
                            ${categoryName[category] ? 'bg-rose-400' : 'bg-slate-200'}`}
                        onClick={() => onHandleSelect(category)}
                    >
                        {category}
                    </div>
                ))}
            </div>
        </div>
    );
};
