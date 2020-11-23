import { expect } from "chai";
import { spy, stub } from "sinon";
import * as React from "react";
import { mount } from "enzyme";
import CustomListSearch from "../CustomListSearch";
import CustomListSearchOptions from "../CustomListSearchOptions";

describe("CustomListSearch", () => {
  let wrapper;
  let search;
  const library = {
    uuid: "uuid",
    name: "name",
    short_name: "short_name",
    settings: {
      large_collections: ["eng", "fre", "spa"],
    },
  };

  const languages = {
    eng: ["English"],
    spa: ["Spanish", "Castilian"],
    fre: ["French"],
  };
  beforeEach(() => {
    search = stub();
    wrapper = mount(
      <CustomListSearch
        search={search}
        library={library}
        languages={languages}
      />
    );
  });
  it("renders the CustomListSearchOptions component", () => {
    const options = wrapper.find(CustomListSearchOptions);
    expect(options.length).to.equal(1);
    expect(options.props().updateSortBy).to.eql(wrapper.instance().sort);
    expect(options.props().updateLanguage).to.eql(
      wrapper.instance().setLanguage
    );
    expect(options.props().sortBy).to.equal(wrapper.state().sortBy);
    expect(options.props().library).to.equal(wrapper.props().library);
    expect(options.props().languages).to.equal(wrapper.props().languages);
  });
  it("searches", () => {
    wrapper.setState({ searchTerms: "test" });
    const searchForm = wrapper.find("form");
    searchForm.simulate("submit");

    expect(search.callCount).to.equal(1);
    expect(search.args[0][0]).to.equal("test");
    expect(search.args[0][1]).to.be.null;
    expect(search.args[0][2]).to.equal("");
  });
  it("sorts", () => {
    expect(wrapper.state().sortBy).to.be.null;
    let searchForm = wrapper.find("form");
    searchForm.simulate("submit");
    let sortByArg = search.args[0][1];
    expect(sortByArg).to.be.null;

    wrapper.instance().sort("author");
    expect(wrapper.state().sortBy).to.equal("author");
    searchForm = wrapper.find("form");
    searchForm.simulate("submit");
    sortByArg = search.args[1][1];
    expect(sortByArg).to.equal("author");
  });
  it("filters by language", () => {
    expect(wrapper.state().language).to.equal("");
    let searchForm = wrapper.find("form");
    searchForm.simulate("submit");
    let languageArg = search.args[0][2];
    expect(languageArg).to.equal("");

    wrapper.instance().setLanguage("fre");
    expect(wrapper.state().language).to.equal("fre");
    searchForm = wrapper.find("form");
    searchForm.simulate("submit");
    languageArg = search.args[1][2];
    expect(languageArg).to.equal("fre");
  });
  it("automatically searches if there is a startingTitle prop", () => {
    const search = stub();
    wrapper = mount(
      <CustomListSearch
        startingTitle="test"
        search={search}
        library={library}
        languages={languages}
      />
    );
    expect(search.callCount).to.equal(1);
    expect(search.args[0][0]).to.equal("test");
    expect(search.args[0][1]).to.be.null;
  });
});
