import login from './loginApi';
import authOn from '../../../../assets/images/authOn.jpg';

export const handleLogin = async ( credentials, navigate, setError, setImage, setIsLoading ) => {
    setIsLoading(true);
    setError('');
    try {
        const data = await login(credentials);
        console.log(data);
        setTimeout(() => {
            setImage(authOn);
        }, 500)
        setTimeout(() => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username)
            navigate("/")
        }, 1000);
    } catch (error) {
        if (error.status === 401) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
            setError('Неверные имя пользователя или пароль');
        }
    }
}