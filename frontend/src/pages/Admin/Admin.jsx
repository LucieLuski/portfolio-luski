import Button from "../../component/ui/Button"
import { useNavigate } from "react-router-dom";
function Admin() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
    return (

        <Button type='button' onClick={handleLogout}> deconnexion </Button>
    )
}

export default Admin