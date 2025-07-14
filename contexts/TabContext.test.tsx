import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { TabProvider, useTab } from "./TabContext";

// Test component that uses the TabContext
function TestComponent() {
  const { activeTab, setActiveTab } = useTab();

  return (
    <div>
      <span data-testid="active-tab">{activeTab}</span>
      <button data-testid="set-chat" onClick={() => setActiveTab("chat")}>
        Set Chat
      </button>
      <button data-testid="set-preview" onClick={() => setActiveTab("preview")}>
        Set Preview
      </button>
    </div>
  );
}

describe("TabContext", () => {
  it("should provide default tab value", () => {
    render(
      <TabProvider>
        <TestComponent />
      </TabProvider>,
    );

    expect(screen.getByTestId("active-tab")).toHaveTextContent("ads");
  });

  it("should allow changing tab", () => {
    render(
      <TabProvider>
        <TestComponent />
      </TabProvider>,
    );

    fireEvent.click(screen.getByTestId("set-chat"));
    expect(screen.getByTestId("active-tab")).toHaveTextContent("chat");

    fireEvent.click(screen.getByTestId("set-preview"));
    expect(screen.getByTestId("active-tab")).toHaveTextContent("preview");
  });

  it("should throw error when used outside provider", () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = () => {};

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useTab must be used within a TabProvider");

    console.error = originalError;
  });
});
