import { expect } from "chai";
import { stub } from "sinon";

import * as React from "react";
import * as Enzyme from "enzyme";
import { CustomListData } from "../../interfaces";
import CustomListSidebarEntry from "../CustomListSidebarEntry";
import { Link } from "react-router";
import { Button } from "library-simplified-reusable-components";

describe("CustomListSidebarEntry", () => {
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  let list: CustomListData;
  let library: string;
  let identifier: string;
  let deleteCustomList = stub();
  beforeEach(() => {
    list = { id: 1, name: "First List", entry_count: 5 };
    library = "lib1";
    identifier = "1";
    wrapper = Enzyme.mount(
      <CustomListSidebarEntry
        list={list}
        identifier={identifier}
        library={library}
        deleteCustomList={deleteCustomList}
        isLibraryManager={true}
      />
    );
  });
  it("renders list information", () => {
    let info = wrapper.find(".custom-list-info");
    expect(info.find("p").at(0).text()).to.equal(list.name);
    expect(info.find("p").at(1).text()).to.equal("Books in list: " + list.entry_count);
    expect(info.find("p").at(2).text()).to.equal("ID-" + list.id);
  });
  it("disables the edit button if the list is already being edited", () => {
    let editButton = wrapper.find(".custom-list-buttons .btn").at(0);
    expect(editButton.text()).to.equal("Editing");
    expect(editButton.props().disabled).to.be.true;
  });
  it("renders the edit button if the list is not already being edited", () => {
    wrapper.setProps({ list: {...list, ...{id: 2}} });
    let editButton = wrapper.find(".custom-list-buttons .btn").at(0);
    expect(editButton.text()).to.contain("Edit");
    expect(editButton.find(Link).props()["to"]).to.equal("/admin/web/lists/" + library + "/edit/" + wrapper.props().list.id);
  });
  it("renders the delete button and calls the delete function on click", () => {
    let deleteButton = wrapper.find(".custom-list-buttons .btn").at(1);
    expect(deleteButton.text()).to.contain("Delete");
    deleteButton.simulate("click");
    expect(deleteCustomList.callCount).to.equal(1);
    expect(deleteCustomList.args[0][0]).to.eql(list);
  });
  it("displays the delete button only to library managers", () => {
    let buttons = wrapper.find(".custom-list-buttons .btn");
    expect(buttons.length).to.equal(2);
    wrapper.setProps({ isLibraryManager: false });
    buttons = wrapper.find(".custom-list-buttons .btn");
    expect(buttons.length).to.equal(1);
    expect(buttons.at(0).text()).not.to.contain("Delete");
  });
});
