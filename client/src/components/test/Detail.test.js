import { render, screen } from "@testing-library/react";
import axios from "axios";
import Detail from "../Detail";

jest.mock("axios");

const data = {
  broj_cipa: "123",
  vrsta: "pas",
  pasmina: "ovčar",
  spol: "M",
  stanje: "Zdrav",
  datum_rodenja: "2023-01-01",
};

test("Prikaži životinju", async () => {
  axios.get.mockResolvedValue({ data: data });
  render(<Detail data={data} />);

  const cip = screen.getByTestId("cip");
  const vrsta = screen.getByTestId("vrsta");
  const pasmina = screen.getByTestId("pasmina");
  const spol = screen.getByTestId("spol");
  const stanje = screen.getByTestId("stanje");
  const datum = screen.getByTestId("datum");

  expect(cip.textContent).toBe("123");
  expect(vrsta.textContent).toBe("pas");
  expect(pasmina.textContent).toBe("ovčar");
  expect(spol.textContent).toBe("M");
  expect(stanje.textContent).toBe("Zdrav");
  expect(datum.textContent).toBe("2023-01-01");
});
