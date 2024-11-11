import React from "react";

function StickyTest() {
    return (
        <div className="relative pt-20"> {/* Space for NavBar */}
            <div className="fixed w-full h-16 z-50 top-0">
                <h1>NavBar Mock</h1>
            </div>
            
            <div className="h-[200vh] pt-24"> {/* Content below NavBar */}
                <div className="flex justify-center">
                    <div
                        className="text-xl flex justify-evenly bg-blue-400 h-12 w-[90%] items-center rounded-md shadow-md sticky top-16 z-40"
                    >
                        <h1>Sticky Heading</h1>
                    </div>
                </div>
                
                {/* Filler content for scrolling */}
                <div className="h-[200vh] bg-gray-100">
                    <p>Scroll down to test sticky behavior.</p>
                </div>
            </div>
        </div>
    );
}

export default StickyTest;
