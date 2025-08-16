import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <p> Luski portfolio </p>
            <nav>
                <Link to='/'>Accueil</Link>
                <Link to='/projets'>Projets</Link>
                <Link to='/Contact'>Contact</Link>
            </nav>
        </header>
    )
}

export default Header;