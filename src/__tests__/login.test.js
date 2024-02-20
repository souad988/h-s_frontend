/* import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from '../__mocks__/axios';
import mockStore from '../__mocks__/redux';
import Login from '../components/auth/Login';

describe('Login Component', () => {
  it('dispatches login action on button click', async () => {
    const store = mockStore({}); // Create a mock Redux store
    axiosMock.onPost('/api/login').reply(200, { token: 'mocked/\Token' }); // Mock the API response

    const { getByRole } = render(
      // Provide the mock store to the component
      <Provider store={store}>
        <Login />
      </Provider>,
    );

    // Click the login button
    fireEvent.click(getByRole('button', { name: 'signIn' }));

    // Wait for the asynchronous action to complete
    await waitFor(() => {
      // Check if the login action was dispatched with the expected payload
      const expectedActions = [{ type: 'LOGIN_SUCCESS', payload: { token: 'mocked Token' } }];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
}); */
