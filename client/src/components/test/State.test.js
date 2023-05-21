import { render, screen, waitFor } from "@testing-library/react";
import States from "../States";
import axios from "axios";

jest.mock("axios");

const data = [
  { id: 1, stanje: "Zdrav" },
  { id: 2, stanje: "Ozlijeđen" },
  { id: 3, stanje: "Buhe" },
  { id: 4, stanje: "Opasan" },
];

test("Prikaži stanja", async () => {
  axios.get.mockResolvedValue({ data: data });
  render(<States data={data} />);

  const stateList = await waitFor(() => screen.findAllByTestId("state"));

  expect(stateList).toHaveLength(4);
});
