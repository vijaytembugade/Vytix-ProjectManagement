import { useHistory } from "react-router-dom";

function Home() {
    
    const history = useHistory()

    function handleWheel(e){
        if(e.deltaY > 0 ){
            console.log(e.deltaY)
            history.push('/about')
        }
    }
   
    return (
        <div style={{height : "75vh"}} onWheel={(e) => handleWheel(e)}>
            This is home component
        </div>
    )
}

export default Home
