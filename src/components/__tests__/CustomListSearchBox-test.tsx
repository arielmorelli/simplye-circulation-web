import { expect } from "chai";
import { spy, stub } from "sinon";
import * as React from "react";
import { mount } from "enzyme";
import CustomListSearchBox from "../CustomListSearchBox";

describe("CustomListSearchBox", () => {
  let wrapper;
  let entryPoints;
  let getEntryPointsElms;
  let updateSearchTerms;
  let startingTitle;

  beforeEach(() => {
    entryPoints = ["Book", "Audio"];
    getEntryPointsElms = stub();
    updateSearchTerms = stub();
    startingTitle = "";
    wrapper = mount(
      <CustomListSearchBox
        entryPoints={entryPoints}
        getEntryPointsElms={getEntryPointsElms}
        updateSearchTerms={updateSearchTerms}
        startingTitle={startingTitle}
      />
    );
  });

  it("renders the entry points", () => {
    let entryPoints = wrapper.find(".entry-points-selection");
    // console.log(entryPoints.debug());
  });

  it("renders the search box", () => {
    let box = wrapper.find("input");
    expect(box.length).to.equal(1);
    expect(box.props().value).to.equal("");
  });

  it("prepopulates the search box if there is a starting title", () => {
    wrapper.setProps({ startingTitle: "test title" });
    expect(wrapper.find("input").props().value).to.equal("test title");
  });

  it("updates", () => {
    let box = wrapper.find("input");
    let boxElement = box.getDOMNode();
    boxElement.value = "test title";
    box.simulate("change");
    expect(updateSearchTerms.callCount).to.equal(1);
    expect(updateSearchTerms.args[0][0]).to.equal("test title");
  });
});
