import { expect } from "chai";
import { stub } from "sinon";

import * as React from "react";
import * as Enzyme from "enzyme";
import { CustomListData } from "../../interfaces";
import CustomListsSidebar from "../CustomListsSidebar";
import CustomListSidebarEntry from "../CustomListSidebarEntry";
import { Link } from "react-router";
import { Button } from "library-simplified-reusable-components";

describe("CustomListsSidebar", () => {
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  let lists: CustomListData[];
  let deleteCustomList = stub();
  let changeSort = stub();

  beforeEach(() => {
    lists = [
      { id: 1, name: "First List", entry_count: 5 },
      { id: 2, name: "Second List", entry_count: 10 }
    ];
    wrapper = Enzyme.mount(
      <CustomListsSidebar
        lists={lists}
        library="library_name"
        identifier="123"
        isLibraryManager={true}
        deleteCustomList={deleteCustomList}
        changeSort={changeSort}
        sortOrder="asc"
      />
    );
  });

  it("renders a sidebar with a header and a create button", () => {
    expect(wrapper.render().hasClass("custom-lists-sidebar")).to.be.true;
    expect(wrapper.find("h2").text()).to.equal("List Manager");
    let createButton = wrapper.find(Link).at(0);
    expect(createButton.text()).to.equal("Create New List");
    expect(createButton.prop("to")).to.equal("/admin/web/lists/library_name/create");
  });

  it("renders sort buttons", () => {
    let sortButtons = wrapper.find("fieldset");
    let asc = sortButtons.find(".form-group").at(0);
    let desc = sortButtons.find(".form-group").at(1);
    expect(asc.text()).to.equal("Sort A-Z");
    expect(asc.find("input").prop("checked")).to.be.true;
    expect(desc.text()).to.equal("Sort Z-A");
    expect(desc.find("input").prop("checked")).to.be.false;

    wrapper.setProps({ sortOrder: "desc" });
    sortButtons = wrapper.find("fieldset");
    asc = sortButtons.find(".form-group").at(0);
    desc = sortButtons.find(".form-group").at(1);

    expect(desc.find("input").prop("checked")).to.be.true;
    expect(asc.find("input").prop("checked")).to.be.false;
  });

  it("renders a list of custom list info items, and passes the delete function to them", () => {
    let listOfLists = wrapper.find("ul");
    expect(listOfLists.length).to.equal(1);
    let firstList = listOfLists.find(CustomListSidebarEntry).at(0);
    expect(firstList.props().list).to.eql(lists[0]);

    let firstListEdit = firstList.find(Link).at(0);
    let firstListDelete = firstList.find(Button).at(0);
    expect(firstListEdit.text()).to.contain("Edit");
    expect(firstListEdit.prop("to")).to.equal(`/admin/web/lists/${wrapper.props().library}/edit/${lists[0].id}`);
    expect(firstListDelete.text()).to.contain("Delete");
    firstListDelete.simulate("click");
    expect(deleteCustomList.callCount).to.equal(1);

    let secondList = listOfLists.find(CustomListSidebarEntry).at(1);
    expect(secondList.props().list).to.eql(lists[1]);

    let secondListEdit = secondList.find(Link).at(0);
    let secondListDelete = secondList.find(Button).at(0);
    expect(secondListEdit.text()).to.contain("Edit");
    expect(secondListEdit.prop("to")).to.equal(`/admin/web/lists/${wrapper.props().library}/edit/${lists[1].id}`);
    expect(secondListDelete.text()).to.contain("Delete");
    secondListDelete.simulate("click");
    expect(deleteCustomList.callCount).to.equal(2);
  });
});
