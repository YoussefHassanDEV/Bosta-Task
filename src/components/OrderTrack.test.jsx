import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import OrderTracking from "./OrderTracking";
import { describe, it, expect, beforeEach } from "vitest";

// Mock react-i18next to prevent i18n errors
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key, // Simple mock translation function
    i18n: { changeLanguage: vi.fn(), language: "en" }, // Mock i18n object
  }),
}));

// Mock fetch API
window.fetch = vi.fn();

describe("OrderTracking Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders the search bar", () => {
    render(<OrderTracking />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows loading state when searching", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    render(<OrderTracking />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "12345" } });
    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  it("displays tracking data on success", async () => {
    const mockData = {
      CurrentStatus: { state: "Delivered" },
    };
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockData) });

    render(<OrderTracking />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "12345" } });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(screen.getByText("Delivered")).toBeInTheDocument());
  });

  it("shows error message when tracking number is not found", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    render(<OrderTracking />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "12345" } });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(screen.getByText("trackingNumberNotFound")).toBeInTheDocument());
  });
});
