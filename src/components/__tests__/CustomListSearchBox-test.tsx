import { expect } from "chai";
import { spy, stub } from "sinon";
import * as React from "react";
import { mount } from "enzyme";
import CustomListSearchBox from "../CustomListSearchBox";

describe("CustomListSearchBox", () => {
  let wrapper;
  let entryPoints;
  let updateSearchTerms;
  let startingTitle;
  let entryPointSelected;
  let changeEntryPoint;

  beforeEach(() => {
    entryPoints = ["Book", "Audio"];
    updateSearchTerms = stub();
    changeEntryPoint = stub();
    startingTitle = "";
    entryPointSelected = "all";
    wrapper = mount(
      <CustomListSearchBox
        entryPoints={entryPoints}
        updateSearchTerms={updateSearchTerms}
        startingTitle={startingTitle}
        entryPointSelected={entryPointSelected}
        changeEntryPoint={changeEntryPoint}
      />
    );
  });

  it("renders the entry points", () => {
    const entryPoints = wrapper.find(".entry-points-selection EditableInput");
    expect(entryPoints.length).to.equal(3);

    const all = entryPoints.at(0);
    expect(all.text()).to.equal("All");
    expect(all.prop("checked")).to.be.true;

    const book = entryPoints.at(1);
    expect(book.text()).to.equal("Book");
    book.props().onChange();
    expect(changeEntryPoint.callCount).to.equal(1);
    expect(changeEntryPoint.args[0][0]).to.equal("Book");

    const audio = entryPoints.at(2);
    expect(audio.text()).to.equal("Audio");
    audio.props().onChange();
    expect(changeEntryPoint.callCount).to.equal(2);
    expect(changeEntryPoint.args[1][0]).to.equal("Audio");
  });

  it("renders the search box", () => {
    const box = wrapper.find("input[type='text']");
    expect(box.length).to.equal(1);
    expect(box.props().value).to.equal("");
  });

  it("prepopulates the search box if there is a starting title", () => {
    wrapper.setProps({ startingTitle: "test title" });
    expect(wrapper.find("input[type='text']").props().value).to.equal(
      "test title"
    );
  });

  it("updates", () => {
    const box = wrapper.find("input[type='text']");
    const boxElement = box.getDOMNode();
    boxElement.value = "test title";
    box.simulate("change");
    expect(updateSearchTerms.callCount).to.equal(1);
    expect(updateSearchTerms.args[0][0]).to.equal("test title");
  });
});
