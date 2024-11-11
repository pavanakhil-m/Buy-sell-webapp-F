import { useEffect, useRef, useState } from "react";
import { Card } from "./components/Card";
import { Category } from "./components/Category";
import { CategorySelect } from "./components/CategorySelect";
import { NavBar } from "./components/NavBar";
import { SlideShow } from "./components/SlideShow";
import { CardData } from "./data/CardData";
import { SellForm } from "./components/SellForm";
import { ProfilePane } from "./components/ProfilePane";
import { FullProduct } from "./components/FullProduct";
import { FooterComponent } from "./components/FooterElement";

function Demo() {
    localStorage.setItem("userName", "pmunab753");
    localStorage.setItem("auth_token", " ");



    const [category, setCategory] = useState({
        Vehicles: false,
        Electronics: false,
        Tickets: false,
        Clothing: false,
        Furniture: false,
        Other: false,
        Rentals: false,
    });


    //for displaying adding product page - mainly for displaying
    const [formSelected, setFormSelected] = useState(false);
    function onFormSelect() {
        setFormSelected(true);
    }
    function onCrossSelect() {
        setFormSelected(false);
    }

    //for profile side pane -> mainly for displaying
    const [profileSelected, setProfileSelected] = useState(false);
    function onProfileSelect() {
        setProfileSelected(true);
    }
    function onProfileCrossSelect() {
        setProfileSelected(false);
    }

    //for product details, and which product is selected.
    const [selectedProduct, setSelectedProduct] = useState(null);

    function handleCardClick(product) {
        setSelectedProduct(product);
    }

    function closeProductDetail() {
        setSelectedProduct(null);
    }

    useEffect(() => {
        if (selectedProduct || formSelected || profileSelected) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => (document.body.style.overflow = "auto");
    }, [selectedProduct || formSelected || profileSelected]);



    const [selectedCategory, setSelectedCategory] = useState(null);
    function handleCategorySelect(selectedCategory) {
        setCategory((prev) => {
            const isCurrentlySelected = prev[selectedCategory];
            const newCategoryState = Object.keys(prev).reduce((acc, key) => {
                acc[key] = key === selectedCategory ? !isCurrentlySelected : false;
                return acc;
            }, {});

            setSelectedCategory(isCurrentlySelected ? null : selectedCategory);
            setProductCategoryHeading(isCategorySelected ? "Recently Added" : selectedCategory);
            return newCategoryState;
        });
    }

    const isCategorySelected = selectedCategory !== null;

    const [productCategoryHeading, setProductCategoryHeading] = useState("Recently Added");

    return (
        <>
            <div className="relative">
                <NavBar onFormSelect={onFormSelect} onProfileSelect={onProfileSelect} />
                {formSelected && <SellForm onCrossSelect={onCrossSelect} />}
                <SlideShow />
                {profileSelected && <ProfilePane isOpen={profileSelected} onClose={onProfileCrossSelect} />}

                <div className="pt-8 pb-4 flex justify-center">
                    <Category onHandleSelect={handleCategorySelect} categoryName={category} />
                </div>

                {/*here we have to replace carddata with backend data from the server -we can use state to save and display that data or something else*/}
                <div className={`flex justify-center pt-1 pb-2 sticky top-16 z-10 `}>
                    <div className="text-xl flex justify-evenly mb-2 bg-slate-400 h-12 w-[90%] items-center rounded-md ">
                        <h1>{productCategoryHeading}</h1>
                    </div>
                </div>

                {!isCategorySelected ? (
                    <>
                        <div className="flex flex-wrap justify-center gap-8">
                            {CardData.map((card, index) => (

                                <Card key={index} props={card} onProdClick={() => handleCardClick(card)} />
                            ))}
                        </div>
                    </>
                ) : (
                    // setHeading={setProductCategoryHeading}
                    <CategorySelect categoryName={selectedCategory} onProdClick={handleCardClick}  />
                )}
                {selectedProduct && (
                    <FullProduct product={selectedProduct} onClose={closeProductDetail} />
                )}


            </div>
            <FooterComponent />
        </>

    );
}

export default Demo;
