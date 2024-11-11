// import { useEffect, useState } from "react";
// import { Card } from "./components/Card";
// import { Category } from "./components/Category";
// import { CategorySelect } from "./components/CategorySelect";
// import { NavBar } from "./components/NavBar";
// import { SlideShow } from "./components/SlideShow";
// import { CardData } from "./data/CardData";
// import { SellForm } from "./components/SellForm";
// import { ProfilePane } from "./components/ProfilePane";
// import { FullProduct } from "./components/FullProduct";

// function Demo() {
//     //localStorage.setItem("userName",  "haritha" );
//     //localStorage.setItem("auth_token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJoYXJpQGdtYWlsLmNvbSIsImlhdCI6MTczMTI2NjU0MywiZXhwIjoxNzMzODU4NTQzfQ.meRs27E71uUM1q7LaF8xRh4KvckLV24QtEMToyPCfTU");


//     const [category, setCategory] = useState({
//         Vehicles: false,
//         Electronics: false,
//         Tickets: false,
//         Clothing: false,
//         Furniture: false,
//         Other: false,
//         Rentals: false,
//     });


//     //for displaying adding product page - mainly for displaying
//     const [formSelected, setFormSelected] = useState(false);
//     function onFormSelect() {
//         setFormSelected(true);
//     }
//     function onCrossSelect() {
//         setFormSelected(false);
//     }

//     //for profile side pane -> mainly for displaying
//     const [profileSelected, setProfileSelected] = useState(false);
//     function onProfileSelect() {
//         setProfileSelected(true);
//     }
//     function onProfileCrossSelect() {
//         setProfileSelected(false);
//     }

//     //for product details, and which product is selected.
//     const [selectedProduct, setSelectedProduct] = useState(null); 

//     function handleCardClick(product) {
//         setSelectedProduct(product); 
//     }

//     function closeProductDetail() {
//         setSelectedProduct(null); 
//     }

//     useEffect(() => {
//         if (selectedProduct || formSelected || profileSelected) {
//             document.body.style.overflow = "hidden";
//         } else {
//             document.body.style.overflow = "auto";
//         }

//         return () => (document.body.style.overflow = "auto");
//     }, [selectedProduct || formSelected || profileSelected]);



//     const [selectedCategory, setSelectedCategory] = useState(null);
//     function handleCategorySelect(selectedCategory) {
//         setCategory((prev) => {
//             const isCurrentlySelected = prev[selectedCategory];
//             const newCategoryState = Object.keys(prev).reduce((acc, key) => {
//                 acc[key] = key === selectedCategory ? !isCurrentlySelected : false;
//                 return acc;
//             }, {});

//             setSelectedCategory(isCurrentlySelected ? null : selectedCategory);
//             return newCategoryState;
//         });
//     }

//     const isCategorySelected = selectedCategory !== null;

//     return (
//         <div className="relative">
//             <NavBar onFormSelect={onFormSelect} onProfileSelect={onProfileSelect} />
//             {formSelected && <SellForm onCrossSelect={onCrossSelect} />}
//             <SlideShow />
//             {profileSelected && <ProfilePane isOpen={profileSelected} onClose={onProfileCrossSelect} />}

//             <div className="pt-8 pb-8 flex justify-center"> 
//                 <Category onHandleSelect={handleCategorySelect} categoryName={category} />
//             </div>

//             {/*here we have to replace carddata with backend data from the server -we can use state to save and display that data or something else*/}
//             {!isCategorySelected ? (
//                 <>
//                 <div className="text-xl ml-24 mb-4"><h1>Recently Added </h1></div>
//                 <div className="flex flex-wrap justify-center gap-8">
//                     {CardData.map((card, index) => (
                        
//                         <Card key={index} props={card} onProdClick={()=>handleCardClick(card)}/>
//                     ))}
//                 </div>
//                 </>
//             ) : (
//                 <CategorySelect categoryName={selectedCategory} onProdClick={handleCardClick} />
//             )}
//              {selectedProduct && (
//                 <FullProduct product={selectedProduct} onClose={closeProductDetail} />
//             )}

            
//         </div>
//     );
// }

// export default Demo;


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

function Demo() {
    const [category, setCategory] = useState({
        Vehicles: false,
        Electronics: false,
        Tickets: false,
        Clothing: false,
        Furniture: false,
        Other: false,
        Rentals: false,
    });

    const [formSelected, setFormSelected] = useState(false);
    const [profileSelected, setProfileSelected] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [recentProducts, setRecentProducts] = useState([]);

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

    return (
        <div className="relative">
            <NavBar onFormSelect={() => setFormSelected(true)} onProfileSelect={() => setProfileSelected(true)} />
            {formSelected && <SellForm onCrossSelect={() => setFormSelected(false)} onNewProductAdded={handleNewProductAdded} />}
            <SlideShow />
            {profileSelected && <ProfilePane isOpen={profileSelected} onClose={() => setProfileSelected(false)} />}

            <div className="pt-8 pb-8 flex justify-center">
                <Category onHandleSelect={(selectedCategory) => setSelectedCategory(selectedCategory)} categoryName={category} />
            </div>

            {!selectedCategory ? (
                <>
                    <div className="text-xl ml-24 mb-4"><h1>Recently Added </h1></div>
                    <div className="flex flex-wrap justify-center gap-8">
                        {recentProducts.map((product, index) => (
                            <Card key={index} props={product} onProdClick={() => setSelectedProduct(product)} />
                        ))}
                    </div>
                </>
            ) : (
                <CategorySelect categoryName={selectedCategory} onProdClick={(product) => setSelectedProduct(product)} />
            )}

            {selectedProduct && (
                <FullProduct product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )}
        </div>
    );
}

export default Demo;
