import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import SideBars from "./src/components/UI/Sidebars";

describe("SideBars Component", () => {
  it("has an h2 tag", () => {
    const component = ReactTestUtils.renderIntoDocument(<SideBars />);
    const a = ReactTestUtils.findRenderedDOMComponentWithTag(
      component, 'a'
    );
  });

  it("is wrapped inside a title class", () => {
    //Test here
  });
}); 
