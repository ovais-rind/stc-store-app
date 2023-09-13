import { createReducer, on } from '@ngrx/store';
import { loadProductsSuccess } from './product.actions';
import { Product } from './product.model';

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  }))
);
