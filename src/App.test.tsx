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

test("initialised app with firstname correctly", async () => {
  render(<App />);
  const linkElement = await screen.findByText("First Person");
  expect(linkElement).toBeInTheDocument();
});

test("if the API returns Status Code 500 display errormessage Oops... something went wrong, try again 🤕", async () => {
  server.use(
    rest.get("https://swapi.dev/api/people", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<App />);
  const linkElement = await screen.findByText(
    "Oops... something went wrong, try again 🤕"
  );
  expect(linkElement).toBeInTheDocument();
});
test("if the API returns Status Code 418 display errormessage I'm a tea pot 🫖, silly", async () => {
  server.use(
    rest.get("https://swapi.dev/api/people", (req, res, ctx) => {
      return res(ctx.status(418));
    })
  );
  render(<App />);
  const linkElement = await screen.findByText("I'm a tea pot 🫖, silly");
  expect(linkElement).toBeInTheDocument();
});
