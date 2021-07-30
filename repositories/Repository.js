import ClientsRepository from '~/repositories/ClientsRepository';
import ServicesRepository from '~/repositories/ServicesRepository';
import UserRepository from '~/repositories/UserRepository';

export default ($axios) => {
    if (process.browser) {
        let token = localStorage.getItem('auth._token.laravelSanctum');
        if (token)
            $axios.setHeader('Authorization', localStorage.getItem('auth._token.laravelSanctum'));
    }

    return {
        clients: ClientsRepository($axios),
        services: ServicesRepository($axios),
        users: UserRepository($axios),
    }
}
