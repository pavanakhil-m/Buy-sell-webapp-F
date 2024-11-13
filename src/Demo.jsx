
import { useEffect, useState } from "react";
import axios from 'axios';
import { Card } from "./components/Card";
import { Category } from "./components/Category";
import { CategorySelect } from "./components/CategorySelect";
import { NavBar } from "./components/NavBar";
import { SlideShow } from "./components/SlideShow";
import { SellForm } from "./components/SellForm";
import { ProfilePane } from "./components/ProfilePane";
import { FullProduct } from "./components/FullProduct";
import { FooterComponent } from "./components/FooterElement";

function Demo() {

    const [category, setCategory] = useState({
        Vehicle: false,
        Electronics: false,
        Tickets: false,
        Clothing: false,
        Furniture: false,
        Other: false,
        Rentals: false,
    });

    const [formSelected, setFormSelected] = useState(false);
    const [profileSelected, setProfileSelected] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [recentProducts, setRecentProducts] = useState([]);

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
        fetchRecentProducts();
    }, []);

    const fetchRecentProducts = async () => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/products/recent', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRecentProducts(response.data);
        } catch (error) {
            console.error('Error fetching recently listed products:', error);
        }
    };

    const handleNewProductAdded = (newProduct) => {
        setRecentProducts((prevProducts) => [newProduct, ...prevProducts]);
    };

    // function handleCategorySelect(selectedCategory) {
    //     setCategory((prev) => {
    //         const isCurrentlySelected = prev[selectedCategory];
    //         const newCategoryState = Object.keys(prev).reduce((acc, key) => {
    //             acc[key] = key === selectedCategory ? !isCurrentlySelected : false;
    //             return acc;
    //         }, {});

    //         setSelectedCategory(isCurrentlySelected ? null : selectedCategory);
    //         setProductCategoryHeading(isCategorySelected ? "Recently Added" : selectedCategory);
    //         return newCategoryState;
    //     });
    // }
    function handleCategorySelect(selectedCategory) {
        setCategory((prev) => {
            const isCurrentlySelected = prev[selectedCategory];
            const newCategoryState = Object.keys(prev).reduce((acc, key) => {
                acc[key] = key === selectedCategory ? !isCurrentlySelected : false;
                return acc;
            }, {});
    
            const newCategoryHeading = isCurrentlySelected ? "Recently Added" : selectedCategory;
            setProductCategoryHeading(newCategoryHeading);
            setSelectedCategory(isCurrentlySelected ? null : selectedCategory);
            
            return newCategoryState;
        });
    }
    

    const isCategorySelected = selectedCategory !== null;

    const [productCategoryHeading, setProductCategoryHeading] = useState("Recently Added");

    return (
        <>
            <div className="relative">
                <NavBar onFormSelect={() => setFormSelected(true)} onProfileSelect={onProfileSelect} />
                {formSelected && <SellForm onCrossSelect={() => setFormSelected(false)} onNewProductAdded={handleNewProductAdded} />}
                <SlideShow />
                {profileSelected && <ProfilePane isOpen={profileSelected} onClose={() => setProfileSelected(false)} />}

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
                            {recentProducts.length > 0 ? (
                                recentProducts.map((product, index) => (
                                    <Card key={index} props={product} onProdClick={() => setSelectedProduct(product)} />
                                ))
                            ) : (
                                <h1>No products found</h1>
                            )}
                        </div>
                    </>
                ) : (
                    // setHeading={setProductCategoryHeading}
                    <CategorySelect categoryName={selectedCategory} onProdClick={handleCardClick} />
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
