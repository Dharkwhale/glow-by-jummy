import { describe, it, expect } from 'vitest';
import { cartReducer } from '../context/CartContext';

const product = { id: 1, name: 'Test Cream', price: 10000, emoji: '🌿', category: 'skincare' };
const empty = { items: {}, isOpen: false };

describe('cartReducer', () => {
  it('ADD_ITEM inserts a new product with qty 1', () => {
    const next = cartReducer(empty, { type: 'ADD_ITEM', payload: product });
    expect(next.items[1]).toEqual({ ...product, qty: 1 });
  });

  it('ADD_ITEM increments qty for an existing product', () => {
    const withOne = { ...empty, items: { 1: { ...product, qty: 1 } } };
    const next = cartReducer(withOne, { type: 'ADD_ITEM', payload: product });
    expect(next.items[1].qty).toBe(2);
  });

  it('REMOVE_ITEM deletes the product entirely', () => {
    const withOne = { ...empty, items: { 1: { ...product, qty: 2 } } };
    const next = cartReducer(withOne, { type: 'REMOVE_ITEM', payload: 1 });
    expect(next.items[1]).toBeUndefined();
    expect(Object.keys(next.items)).toHaveLength(0);
  });

  it('UPDATE_QTY sets qty to the given value', () => {
    const withOne = { ...empty, items: { 1: { ...product, qty: 1 } } };
    const next = cartReducer(withOne, { type: 'UPDATE_QTY', payload: { id: 1, qty: 4 } });
    expect(next.items[1].qty).toBe(4);
  });

  it('UPDATE_QTY ignores qty less than 1', () => {
    const withTwo = { ...empty, items: { 1: { ...product, qty: 2 } } };
    const next = cartReducer(withTwo, { type: 'UPDATE_QTY', payload: { id: 1, qty: 0 } });
    expect(next.items[1].qty).toBe(2);
  });

  it('CLEAR_CART empties all items', () => {
    const withItems = { ...empty, items: { 1: { ...product, qty: 3 } } };
    const next = cartReducer(withItems, { type: 'CLEAR_CART' });
    expect(next.items).toEqual({});
  });

  it('TOGGLE_CART flips isOpen', () => {
    const opened = cartReducer(empty, { type: 'TOGGLE_CART' });
    expect(opened.isOpen).toBe(true);
    const closed = cartReducer(opened, { type: 'TOGGLE_CART' });
    expect(closed.isOpen).toBe(false);
  });
});
