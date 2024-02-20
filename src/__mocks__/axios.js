import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mocking axios for testing
const mock = new MockAdapter(axios);
export default mock;
