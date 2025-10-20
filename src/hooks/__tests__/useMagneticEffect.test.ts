import { renderHook, act } from '@testing-library/react';
import { useMagneticEffect } from '../useMagneticEffect';
import { waitFor } from '@testing-library/react';

describe('useMagneticEffect', () => {
  it('should not update spring values if mouse enters but does not move', () => {
    const { result } = renderHook(() => useMagneticEffect());
    act(() => {
      result.current.handleMouseEnter();
    });
    expect(result.current.x.get()).toBe(0);
    expect(result.current.y.get()).toBe(0);
  });

  it('should not update spring values if mouse moves but has not entered', () => {
    const { result } = renderHook(() => useMagneticEffect());

    const mockEvent = {
      clientX: 120,
      clientY: 130,
      currentTarget: {
        getBoundingClientRect: () => ({ left: 50, top: 50, width: 100, height: 100 }),
      },
    } as React.MouseEvent<HTMLElement>;

    act(() => {
      result.current.handleMouseMove(mockEvent);
    });

    expect(result.current.x.get()).toBe(0);
    expect(result.current.y.get()).toBe(0);
  });

  it('should update spring values on mouse move and reset on mouse leave', async () => {
    const { result } = renderHook(() => useMagneticEffect());

    // Mouse enter
    act(() => {
      result.current.handleMouseEnter();
    });

    // Mouse move
    const mockEvent = {
      clientX: 120,
      clientY: 130,
      currentTarget: {
        getBoundingClientRect: () => ({ left: 50, top: 50, width: 100, height: 100 }),
      },
    } as React.MouseEvent<HTMLElement>;

    act(() => {
      result.current.handleMouseMove(mockEvent);
    });

    // Assert values updated
    await waitFor(() => expect(result.current.x.get()).toBe(10));
    await waitFor(() => expect(result.current.y.get()).toBe(15));


    // Mouse leave
    act(() => {
      result.current.handleMouseLeave();
    });

    // Assert values reset
    await waitFor(() => expect(result.current.x.get()).toBe(0));
    await waitFor(() => expect(result.current.y.get()).toBe(0));
  });
});
