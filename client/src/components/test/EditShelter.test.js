import { render, screen } from "@testing-library/react";
import EditShelterForm from "../EditShelterForm";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

const data = {
  naziv: "Sklonište zapad",
  adresa: "Bićanićeva 34",
  naziv_mjesta: "Varaždin",
};

const places = [
  { id: 1, naziv: "Varaždin" },
  { id: 2, naziv: "Dubrovnik" },
  { id: 3, naziv: "Split" },
];

test("popuni formu za uređivanje skloništa", async () => {
  axios.get.mockResolvedValue({ data: data });
  render(
    <BrowserRouter>
      <EditShelterForm data={data} places={places} />
    </BrowserRouter>
  );

  const nameInput = screen.getByTestId("nameInput");
  const addressInput = screen.getByLabelText("Adresa skloništa", {
    selector: "input",
  });
  const placeInput = screen.getByLabelText("Mjesto skloništa", {
    selector: "select",
  });

  expect(nameInput.value).toBe("Sklonište zapad");
  expect(addressInput.value).toBe("Bićanićeva 34");
  expect(placeInput.value).toBe("1");
});
