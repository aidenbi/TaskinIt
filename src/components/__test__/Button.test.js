import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button";
import isTSAnyKeyword from '@babel/types';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import renderer from "react-test-renderer";

afterEach(cleanup);


it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div)
})

it("renders button correctly", () => {

    const { getByTestId } = render(<Button color='red' text='Add' onClick={() => { true }}></Button>)
    expect(getByTestId('button')).toHaveTextContent('Add')
})

it("matches snapshot", () => {
    const tree = renderer.create(<Button color='red' text='Add' onClick={() => { true }}></Button>).toJSON();
    expect(tree).toMatchSnapshot()

})