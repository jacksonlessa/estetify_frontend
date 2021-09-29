import ClientsRepository from '~/repositories/ClientsRepository';
import ServicesRepository from '~/repositories/ServicesRepository';
import UsersRepository from '~/repositories/UsersRepository';
import ProfessionalsRepository from '~/repositories/ProfessionalsRepository';
import OrdersRepository from '~/repositories/OrdersRepository';
import AccountsRepository from '~/repositories/AccountsRepository';

export default ($axios) => {
    if (process.browser) {
        let token = localStorage.getItem('auth._token.laravelSanctum');
        if (token)
            $axios.setHeader('Authorization', token);
        
    }

    return {
        clients: ClientsRepository($axios),
        services: ServicesRepository($axios),
        users: UsersRepository($axios),
        professionals: ProfessionalsRepository($axios),
        orders: OrdersRepository($axios),
        accounts: AccountsRepository($axios),
    }
}
