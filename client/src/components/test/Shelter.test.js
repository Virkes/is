import { render, screen } from "@testing-library/react";
import Shelter from "../Shelter";
import axios from "axios";

jest.mock("axios");

const data = {
  naziv: "Sklonište za pse",
  adresa: "Unska 3",
  naziv_mjesta: "Zagreb",
};

test("Prikaži sklonište", async () => {
  axios.get.mockResolvedValue({ data: data });
  render(<Shelter data={data} />);

  const name = screen.getByTestId("name");
  const address = screen.getByTestId("address");
  const place = screen.getByTestId("place");

  expect(name.textContent).toBe("Sklonište za pse");
  expect(address.textContent).toBe("Unska 3");
  expect(place.textContent).toBe("Zagreb");
});
