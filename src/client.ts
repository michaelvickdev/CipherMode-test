import {BackendClient} from './BackendServiceClientPb';

const client = new BackendClient("http://mock.ciphermode.com:50051", null, null);

export default client;