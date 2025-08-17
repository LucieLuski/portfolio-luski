import { Link } from "react-router-dom";
import './header.module.scss'

function Header() {
    return (
        <header>
            <h1> Luski </h1>
            <nav>
                <Link to='/'>Accueil</Link>
                <Link to='/projets'>Projets</Link>
                <Link to='/Contact'>Contact</Link>
            </nav>
        </header>
    )
}

export default Header;