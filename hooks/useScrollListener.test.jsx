import { render } from "@testing-library/react";
import useScrollListener from "./useScrollListener";

// Helper to mock the DOM properties for scrolling
const setupScrollMocks = (scrollY, windowHeight, documentHeight) => {
  // mock window properties
  Object.defineProperty(window, "scrollY", { value: scrollY, writable: true });
  Object.defineProperty(window, "innerHeight", {
    value: windowHeight,
    writable: true,
  });

  // mock document properties
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: documentHeight,
    writable: true,
  });
};

// Helper function to dispatch a scroll event
const triggerScroll = () => {
  window.dispatchEvent(new Event("scroll"));
};

// A simple test component to consume the hook
const TestComponent = ({ onFetch }) => {
  useScrollListener({ onFetch });
  return <div> </div>;
};

describe("useScrollListener test suite", () => {
  const mockOnFetch = jest.fn();
  const SCROLL_BUFFER = 200; // Value from your hook

  beforeEach(() => {
    // clear all mocks before each test
    mockOnFetch.mockClear();

    // reset mocks to their original implementation between tests
    jest.clearAllMocks();

    // set up default DOM values for a standard page (not scrolled yet)
    setupScrollMocks(0, 1000, 2000); // 0 scrollY, 1000 window height, 2000 document height
  });

  it("should not call onFetch when initially rendered and not scrolled", () => {
    render(<TestComponent onFetch={mockOnFetch} />);

    // check after initial render (no scroll event triggered yet)
    expect(mockOnFetch).not.toHaveBeenCalled();
  });

  it("should call onFetch when scrolled past the threshold", () => {
    // Page: windowHeight=1000, documentHeight=2000. Threshold = 2000 - 1000 - 200 = 800
    // set scroll position just *over* the threshold
    const SCROLL_Y_BEYOND_THRESHOLD = 900;
    setupScrollMocks(SCROLL_Y_BEYOND_THRESHOLD, 1000, 2000);

    render(<TestComponent onFetch={mockOnFetch} />);

    // simulate scroll event
    triggerScroll();

    expect(mockOnFetch).toHaveBeenCalledTimes(1);
  });

  it("should not call onFetch when scrolled *before* the threshold", () => {
    // Page: windowHeight=1000, documentHeight=2000. Threshold = 800
    // set scroll position just *before* the threshold
    const SCROLL_Y_BEFORE_THRESHOLD = 799;
    setupScrollMocks(SCROLL_Y_BEFORE_THRESHOLD, 1000, 2000);

    render(<TestComponent onFetch={mockOnFetch} />);

    // simulate scroll event
    triggerScroll();

    expect(mockOnFetch).not.toHaveBeenCalled();
  });

  it("should clean up the event listener when the component unmounts", () => {
    // mock window.removeEventListener
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<TestComponent onFetch={mockOnFetch} />);

    // unmount the component
    unmount();

    // expect removeEventListener to have been called with 'scroll'
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );

    // IMPORTANT: Restore the original function to prevent interference with other tests
    removeEventListenerSpy.mockRestore();
  });
});
