import { render, screen, fireEvent } from "@testing-library/react";
import Topbar from "./Topbar";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"; // Import your i18n configuration
import { describe, it, expect, vi } from "vitest"; // Consolidated import
import "@testing-library/jest-dom"; // Ensure jest-dom matchers are available

describe("Topbar", () => {
  it("renders without crashing", () => {
    const mockChangeLanguage = vi.fn();
    const mockSetTrackingNumber = vi.fn();
    const mockHandleSearch = vi.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <Topbar
          changeLanguage={mockChangeLanguage}
          trackingNumber=""
          setTrackingNumber={mockSetTrackingNumber}
          handleSearch={mockHandleSearch}
        />
      </I18nextProvider>
    );

    // Check if elements render
    expect(screen.getByRole("combobox")).toBeInTheDocument(); // Language selector
    expect(screen.getByAltText("Logo")).toBeInTheDocument(); // Logo
    expect(screen.getByPlaceholderText(/enterOrderNumber/i)).toBeInTheDocument(); // Search input
  });

  it("calls the correct function on language change", () => {
    const mockChangeLanguage = vi.fn();
    const mockSetTrackingNumber = vi.fn();
    const mockHandleSearch = vi.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <Topbar
          changeLanguage={mockChangeLanguage}
          trackingNumber=""
          setTrackingNumber={mockSetTrackingNumber}
          handleSearch={mockHandleSearch}
        />
      </I18nextProvider>
    );

    const languageSelector = screen.getByRole("combobox");
    fireEvent.change(languageSelector, { target: { value: "ar" } });

    expect(mockChangeLanguage).toHaveBeenCalledWith("ar");
  });

  it("updates the tracking number input correctly", () => {
    const mockChangeLanguage = vi.fn();
    const mockSetTrackingNumber = vi.fn();
    const mockHandleSearch = vi.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <Topbar
          changeLanguage={mockChangeLanguage}
          trackingNumber=""
          setTrackingNumber={mockSetTrackingNumber}
          handleSearch={mockHandleSearch}
        />
      </I18nextProvider>
    );

    const trackingInput = screen.getByPlaceholderText(/enterOrderNumber/i); // Corrected placeholder text
    fireEvent.change(trackingInput, { target: { value: "12345" } });

    expect(mockSetTrackingNumber).toHaveBeenCalledWith("12345");
  });

  it("calls handleSearch when the search button is clicked", () => {
    const mockChangeLanguage = vi.fn();
    const mockSetTrackingNumber = vi.fn();
    const mockHandleSearch = vi.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <Topbar
          changeLanguage={mockChangeLanguage}
          trackingNumber="12345"
          setTrackingNumber={mockSetTrackingNumber}
          handleSearch={mockHandleSearch}
        />
      </I18nextProvider>
    );

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    expect(mockHandleSearch).toHaveBeenCalled();
  });
});
