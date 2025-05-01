import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const ExitButton = () => {
    const navigate = useNavigate();
    
    const handleRemoveToken = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return  <div>
                <form onSubmit={handleRemoveToken}>
                    <Button type="submit">Выйти</Button>
                </form>
            </div> 
}

export default ExitButton;