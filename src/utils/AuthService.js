export const isAuthenticated = () => {
    const jwt = localStorage.getItem('jwt');
    return !!jwt;
}