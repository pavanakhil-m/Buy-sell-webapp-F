import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel'
import a1 from "../assets/images/asset1.jpg"
import a2 from "../assets/images/asset2.jpg"
import a3 from "../assets/images/asset3.jpg"
import a4 from "../assets/images/asset4.jpg"
import "./SlideStyle.css"

export const SlideShow = () => {
    return (
        <>
        <div className="mt-24">
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                
            >
                <div>
                    <img src={a1} />
                </div>
                <div>
                    <img src={a2} />
                </div>
                <div>
                    <img src={a3} />
                    
                </div>
                <div>
                    <img src={a4} />
                   
                </div>
            </Carousel>
            </div>
        </>
    )
}