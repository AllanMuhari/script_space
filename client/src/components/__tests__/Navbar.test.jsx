import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Navbar from "../Navbar";
import { UserContext } from "../../context/UserContext";

describe("Navbar Component", () => {
  const user = { name: "John Doe", imageUrl: "https://via.placeholder.com/30" };
  const logout = vi.fn();
  it("renders login button", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, logout }}>
          <Navbar />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });

  it("renders sign up button", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, logout }}>
          <Navbar />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const signUpButton = screen.getByText("Sign Up");
    expect(signUpButton).toBeInTheDocument();
  });

  it("calls logout function when logout button is clicked", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user, logout }}>
          <Navbar />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
