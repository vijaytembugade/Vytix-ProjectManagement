import "./About.css"
import ProjectOrganise from '../../assets/ProjectOrganise.svg'
import ProjectOrganise1 from '../../assets/ProjectOrganise1.svg'

const About = () => {
    function handleWheel(e) {
    }
    return (
        <div className="about-main"  onWheel={ (e) => handleWheel(e) }>
            <div className="about-item">
                <img alt="about-tags" src={ ProjectOrganise } />
                <span> Project Organisating </span>
            </div>
            <div className="about-item">
                <img alt="about-tags" src={ ProjectOrganise1 } />
                <span> Project Planing </span>
            </div>
            <div className="about-item">
                <img alt="about-tags" src={ ProjectOrganise } />
                <span> Team Management </span>
            </div>
            <div className="about-item">
                <img alt="about-tags" src={ ProjectOrganise1 } />
                <span> Task assignment </span>
            </div>
            {/* <div className="about-item">
                <img alt="about-tags" src={ ProjectOrganise } />
                <span> Research and Development </span>
            </div>
            <div className="about-item">
                <img alt="about-tags" src={ ProjectOrganise1 } />
                <span> Communications and standups  </span>
            </div>
            <div className="about-item">
                <img alt="about-tags" src={ ProjectOrganise } />
                <span> Reports </span>
            </div>
            <div className="about-item">
                <img alt="about-tags" src={ ProjectOrganise1 } />
                <span> Monitoring</span>
            </div> */}
        </div>
    )
}

export default About
