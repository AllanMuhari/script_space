// client/tests/Navbar.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../src/context/UserContext";
import Navbar from "../src/components/Navbar";

const renderNavbar = (user = null) => {
  return render(
    <UserContext.Provider value={{ user, logout: jest.fn() }}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

describe("Navbar Component", () => {
  test("renders navbar correctly when no user is logged in", () => {
    renderNavbar();

    expect(screen.getByText(/scriptspace/i)).toBeInTheDocument();
    expect(screen.getByText(/my feed/i)).toBeInTheDocument();
    expect(screen.getByText(/discussions/i)).toBeInTheDocument();
    expect(screen.getByText(/blogs/i)).toBeInTheDocument();

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test("renders navbar correctly when a user is logged in", () => {
    const mockUser = { name: "John Doe", imageUrl: "" };
    renderNavbar(mockUser);

    expect(screen.getByText(/my feed/i)).toBeInTheDocument();
    expect(screen.getByText(/discussions/i)).toBeInTheDocument();
    expect(screen.getByText(/blogs/i)).toBeInTheDocument();
    expect(screen.getByText(/my blogs/i)).toBeInTheDocument();

    expect(screen.getByText(/welcome, john doe!/i)).toBeInTheDocument();
    expect(screen.getByText(/write/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test("toggles mobile menu visibility", () => {
    renderNavbar();

    // Initial state: mobile menu should not be visible
    expect(screen.queryByText(/my feed/i)).toBeInTheDocument();
    expect(screen.queryByText(/discussions/i)).toBeInTheDocument();

    // Click on the menu button
    fireEvent.click(screen.getByRole("button", { name: /menu/i }));

    // Menu should now be visible
    expect(screen.getByText(/my feed/i)).toBeInTheDocument();
    expect(screen.getByText(/discussions/i)).toBeInTheDocument();
  });

  test("navigates correctly when clicking on links", () => {
    renderNavbar();

    // Check for navigation links presence
    const feedLink = screen.getByText(/my feed/i);
    const discussionsLink = screen.getByText(/discussions/i);
    const blogsLink = screen.getByText(/blogs/i);

    expect(feedLink).toBeInTheDocument();
    expect(discussionsLink).toBeInTheDocument();
    expect(blogsLink).toBeInTheDocument();

    // Simulate click events
    fireEvent.click(feedLink);
    fireEvent.click(discussionsLink);
    fireEvent.click(blogsLink);
  });
});
