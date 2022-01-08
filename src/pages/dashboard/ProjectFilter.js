

const filterList = ['all', 'mine', "development", "design", "api-project", "other"]

export default function ProjectFilter({currentFilter, chnageFilter}) {
    
    const handleClick = (newFilter) => {
        chnageFilter(newFilter)
        console.log(newFilter)
    }
    return (
        <div className="project-filter">
            <nav>
                <p>filter by: </p>
                { filterList.map(f => (
                    <button key={ f } onClick={ () => handleClick(f) } className={currentFilter === f ? "active" : ""}>
                        { f }
                    </button>
                )) }
            </nav>
        </div>
    )
}
