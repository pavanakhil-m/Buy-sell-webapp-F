import { CardData } from "../data/CardData";
import { Card } from "./Card";

export const CategorySelect = ({ categoryName, onProdClick }) => {
    let found=0;
    return (
        <div className="bg-red-400 flex flex-wrap justify-center gap-8">
            <div>Filter & Sorting</div>
            {CardData.map((card, index) => {                
                if (card.tag === categoryName) {
                    found+=1;
                    return <Card key={index} props={card} onProdClick={()=>onProdClick(card)}/>;
                }               
                return null;
            })}
            {found===0 && <div className="text-center text-2xl bg-black text-slate-300">No items found!</div>}
        </div>
        
    );
}
