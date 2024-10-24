import * as React from "react";
import renderer from "react-test-renderer";
import { AppText } from "../AppText";

it(`renders correctly`, () => {
  const tree = renderer.create(<AppText text="Test" />).toJSON();

  expect(tree).toMatchSnapshot();
});
