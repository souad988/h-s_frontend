import React from 'react';
import { Provider } from 'react-redux';
import {
  cleanup, findAllByTestId, fireEvent, render,
} from '@testing-library/react';
import mock from '../__mocks__/axios';
import Home from '../views/home';
import store from '../__mocks__/redux';

afterEach(cleanup);

describe('Product List', () => {
  it('displays list of product names on get products button clicked', async () => {
    mock.onGet('/api/products').reply(200, [{
      category: { name: 'Long Dress' },
      category_id: 4,
      deleted: false,
      description: 'Description for Long Dress 1',
      id: 5,
      images: [{
        name: 'Long Dress 1 Image', product_id: 5, default: true, color_id: 3,
      }],
      product_id: 5,
      like_count: 0,
      name: 'Long Dress 1',
      price: '59.99',
    }]); // Mock the API response

    const { getByRole } = render(
      // Provide the mock store to the component
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    // Click the login button
    fireEvent.click(getByRole('button', { name: 'getProducts' }));

    // Wait for the asynchronous action to complete
    await waitFor(() => {
      // Check if the login action was dispatched with the expected payload
      const products = findAllByTestId('product-item');
      expect(products).toBeInTheDocument();
    });
  });
});
