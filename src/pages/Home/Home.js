import { useHistory } from "react-router-dom";
import Project from '../../assets/Project-management1.svg'

import "./Home.css"

function Home() {
    
    const history = useHistory()

    function handleWheel(e){
        if(e.deltaY > 0 ){
            console.log(e.deltaY)
            history.push('/about')
        }
    }
   
    return (
        <div className="home-main" style={{height : "75vh"}} onWheel={(e) => handleWheel(e)}>
            <h2>Manage your project with Vytix-PM</h2>
            <img src={Project}/>

        </div>
    )
}

export default Home
