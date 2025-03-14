/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Test from "../packages/frontend/src/pages/Test";

describe("Testing Jest", () => {
    it("renders the Hi on the Test page", () => {
        render(<Test />);
        expect(screen.getByText("Hi")).toBeInTheDocument();
    });
});
