import "./About.css"
import { useHistory } from "react-router-dom";

const About = () => {
    const history = useHistory()
    function handleWheel(e){
        if(e.deltaY > 0 ){
            console.log(e.deltaY)
            history.push('/signup')
        }else if (e.deltaY < 0){
            console.log(e.deltaY)
            history.push('/home')
        }
    }
    return (
        <div style={{height: "75vh"}} onWheel={(e) => handleWheel(e)}>
            This is about page
        </div>
    )
}

export default About
