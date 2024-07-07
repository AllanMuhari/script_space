import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
// import { describe, it, expect } from "vitest";
import { describe, it, expect, beforeEach } from "@jest/globals";
import Navbar from "../Navbar";
import { UserContext } from "../../context/UserContext";

describe("Navbar Component", () => {
  const user = { name: "John Doe", imageUrl: "https://via.placeholder.com/30" };
  const logout = jest.fn(); // Mock logout function

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

  it("navigates to login page when login button is clicked", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, logout }}>
          <Navbar />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    expect(screen.getByText("Login Page Title")).toBeInTheDocument(); // Adjust this based on your actual login page title or content
  });

  it("navigates to sign up page when sign up button is clicked", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, logout }}>
          <Navbar />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);
    expect(screen.getByText("Sign Up Page Title")).toBeInTheDocument(); // Adjust this based on your actual sign up page title or content
  });
});
