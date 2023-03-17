import React from "react";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";

const server = setupServer(
  rest.get("https://swapi.dev/api/people", (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          { name: "First Person" },
          { name: "Second Person" },
          { name: "Third Person" },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders learn react link", async () => {
  render(<App />);
  const linkElement = await screen.findByText("First Person");
  expect(linkElement).toBeInTheDocument();
});
