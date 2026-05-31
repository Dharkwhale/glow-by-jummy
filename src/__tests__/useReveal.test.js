import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useReveal from '../hooks/useReveal';

let observerCallback;

beforeEach(() => {
  global.IntersectionObserver = class {
    constructor(cb) { observerCallback = cb; }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('useReveal', () => {
  it('starts not visible', () => {
    const { result } = renderHook(() => useReveal());
    expect(result.current.isVisible).toBe(false);
  });

  it('becomes visible when intersection fires with isIntersecting=true', () => {
    const { result } = renderHook(() => useReveal());
    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });
    expect(result.current.isVisible).toBe(true);
  });

  it('stays visible after element leaves viewport (triggerOnce=true default)', () => {
    const { result } = renderHook(() => useReveal());
    act(() => { observerCallback([{ isIntersecting: true }]); });
    act(() => { observerCallback([{ isIntersecting: false }]); });
    expect(result.current.isVisible).toBe(true);
  });

  it('hides again when triggerOnce=false and element leaves viewport', () => {
    const { result } = renderHook(() => useReveal({ triggerOnce: false }));
    act(() => { observerCallback([{ isIntersecting: true }]); });
    act(() => { observerCallback([{ isIntersecting: false }]); });
    expect(result.current.isVisible).toBe(false);
  });
});
