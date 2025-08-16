import { Link } from "react-router-dom"
import { SiGithub } from "react-icons/si"

function Footer() {
    return (
        <footer>
            <h2>Navigation</h2>
            <nav>
                <Link to='/'>Accueil</Link>
                <Link to='/projets'>Projets</Link>
                <Link to='/Contact'>Contact</Link>
            </nav>

            <h2>Liens</h2>
            <a href='https://github.com/LucieLuski' target='_blank' rel="noopener noreferrer"><SiGithub /></a>
        </footer>
    )
}

export default Footer;