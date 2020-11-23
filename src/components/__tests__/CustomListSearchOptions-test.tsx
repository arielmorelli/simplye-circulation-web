import { expect } from "chai";
import { spy, stub } from "sinon";
import * as React from "react";
import { mount } from "enzyme";
import CustomListSearchOptions from "../CustomListSearchOptions";

describe("CustomListSearchOptions", () => {
  let wrapper;
  let updateSortBy;
  let updateLanguage;
  let sortBy;
  let library;
  let languages;

  beforeEach(() => {
    updateSortBy = stub();
    updateLanguage = stub();
    sortBy = null;
    library = {
      uuid: "uuid",
      name: "name",
      short_name: "short_name",
      settings: {
        large_collections: ["eng", "fre", "spa"],
      },
    };
    languages = {
      eng: ["English"],
      spa: ["Spanish", "Castilian"],
      fre: ["French"],
    };
    wrapper = mount(
      <CustomListSearchOptions
        updateSortBy={updateSortBy}
        updateLanguage={updateLanguage}
        sortBy={sortBy}
        library={library}
        languages={languages}
      />
    );
  });
  it("sorts", () => {
    const sortOptions = wrapper.find(".search-options").find(".form-group");
    expect(sortOptions.length).to.equal(3);

    const relevance = sortOptions.at(0);
    expect(relevance.text()).to.equal("Relevance (default)");
    const relevanceRadio = relevance.find("input");
    expect(relevanceRadio.props().type).to.equal("radio");
    expect(relevanceRadio.props().name).to.be.null;
    expect(relevanceRadio.props().value).to.equal("");
    expect(relevanceRadio.props().checked).to.be.true;

    const title = sortOptions.at(1);
    expect(title.text()).to.equal("Title");
    const titleRadio = title.find("input");
    expect(titleRadio.props().type).to.equal("radio");
    expect(titleRadio.props().name).to.equal("title");
    expect(titleRadio.props().value).to.equal("title");
    expect(titleRadio.props().checked).to.be.false;

    const author = sortOptions.at(2);
    expect(author.text()).to.equal("Author");
    const authorRadio = author.find("input");
    expect(authorRadio.props().type).to.equal("radio");
    expect(authorRadio.props().name).to.equal("author");
    expect(authorRadio.props().value).to.equal("author");
    expect(authorRadio.props().checked).to.be.false;

    titleRadio.simulate("change");
    expect(wrapper.props().updateSortBy.callCount).to.equal(1);
    expect(wrapper.props().updateSortBy.args[0][0]).to.equal("title");

    authorRadio.simulate("change");
    expect(wrapper.props().updateSortBy.callCount).to.equal(2);
    expect(wrapper.props().updateSortBy.args[1][0]).to.equal("author");

    relevanceRadio.simulate("change");
    expect(wrapper.props().updateSortBy.callCount).to.equal(3);
    expect(wrapper.props().updateSortBy.args[2][0]).to.be.null;
  });

  it("filters by language", () => {
    const languageFieldset = wrapper.find("fieldset").at(1);
    expect(languageFieldset.find("legend").text()).to.equal(
      "Filter by language:"
    );
    const languageMenu = languageFieldset.find("select");
    const options = languageMenu.find("option");
    expect(options.at(0).prop("value")).to.equal("all");
    expect(options.at(0).text()).to.equal("All");
    expect(options.at(1).prop("value")).to.equal("eng");
    expect(options.at(1).text()).to.equal("English");
    expect(options.at(2).prop("value")).to.equal("fre");
    expect(options.at(2).text()).to.equal("French");
    expect(options.at(3).prop("value")).to.equal("spa");
    expect(options.at(3).text()).to.equal("Spanish; Castilian");

    languageMenu.getDOMNode().value = "fre";
    languageMenu.simulate("blur");
    expect(wrapper.props().updateLanguage.callCount).to.equal(1);
    expect(wrapper.props().updateLanguage.args[0][0]).to.equal("fre");
  });
});
