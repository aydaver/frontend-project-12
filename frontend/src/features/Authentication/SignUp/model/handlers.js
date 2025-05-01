import signUp from './signUpApi';
import authOn from '../../../../assets/images/authOn.jpg';

export const handleSignUp = async ( credentials, navigate, setError, setImage, setIsLoading ) => {
    setIsLoading(true);
    setError('');
    try {
        const data = await signUp(credentials);
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
        if (error.status === 409) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
            setError('Пользователь уже существует');
        }
    }
}