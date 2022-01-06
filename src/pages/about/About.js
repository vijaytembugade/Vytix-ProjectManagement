import "./About.css"
import { useHistory } from "react-router-dom";
import ProjectOrganise from '../../assets/ProjectOrganise.svg'
import ProjectOrganise1 from '../../assets/ProjectOrganise1.svg'

const About = () => {
    const history = useHistory()
    function handleWheel(e) {
        if (e.deltaY > 0) {
            console.log(e.deltaY)
            history.push('/signup')
        } else if (e.deltaY < 0) {
            console.log(e.deltaY)
            history.push('/home')
        }
    }
    return (
        <div className="about-main" style={ { height: "75vh" } } onWheel={ (e) => handleWheel(e) }>
            <div className="about-item">
                <img src={ ProjectOrganise } />
                <span> Project Organisation </span>
            </div>
            <div className="about-item">
                <img src={ ProjectOrganise1 } />
                <span> Project Planing </span>
            </div>
            <div className="about-item">
                <img src={ ProjectOrganise } />
                <span> Project Organisation </span>
            </div>
            <div className="about-item">
                <img src={ ProjectOrganise1 } />
                <span> Project Planing </span>
            </div>
            <div className="about-item">
                <img src={ ProjectOrganise } />
                <span> Project Organisation </span>
            </div>
            <div className="about-item">
                <img src={ ProjectOrganise1 } />
                <span> Project Planing </span>
            </div>
            <div className="about-item">
                <img src={ ProjectOrganise } />
                <span> Project Organisation </span>
            </div>
            <div className="about-item">
                <img src={ ProjectOrganise1 } />
                <span> Project Planing </span>
            </div>
        </div>
    )
}

export default About
