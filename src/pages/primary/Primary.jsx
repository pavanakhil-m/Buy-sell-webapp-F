import bgdrop from "../../assets/images/bgdrop.png"
import TestMessage from "../../components/TestMessage"
import { useNavigate } from 'react-router-dom';


export default function PrimaryPage() {

    const navigate = useNavigate();

    return (
        <>
            <div className=" flex items-center justify-center bg-repeat min-h-screen"
                style={{
                    backgroundImage: `url(${bgdrop})`,
                    backgroundSize: 'auto',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 backdrop-blur-sm bg-white/70"></div>
                <div className="relative z-10 flex-col justify-center items-center min-h-screen">
                    <h1 className="pb-60 text-8xl font-extrabold font-sans" style={{ color: '#FB8241' }}>Menu Mate</h1>
                    <TestMessage/>
                    <div className="flex justify-between">
                        <button 
                            className="bg-blue-700 text-white hover:bg-blue-900 hover:text-blue-200 rounded-md p-2 w-20 ml-24"
                            onClick={() => navigate('/login')}
                            >
                                Login
                        </button>
                        <button
                            className="bg-stone-700 text-white hover:bg-stone-900 hover:text-stone-200 rounded-md p-2 w-20 mr-24"
                            onClick={()=> navigate('/register')}
                            >
                                register
                        </button>
                    </div>
                    
                </div>
                

            </div>
        </>
    )
}