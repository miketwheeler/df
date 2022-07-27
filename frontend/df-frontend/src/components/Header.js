import { Link } from "react-router-dom"


const Header = () => {
    return (
        <header className="Header">
            <h1>dev foyer</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="projects">Projects</Link></li>
                    <li><Link to="teams">Teams</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header