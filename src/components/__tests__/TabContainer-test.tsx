import { expect } from "chai";
import { stub } from "sinon";

import * as React from "react";
import { mount } from "enzyme";

import buildStore from "../../store";
import { TabContainer } from "../TabContainer";
import Editor from "../Editor";
import Classifications from "../Classifications";
import Complaints from "../Complaints";
import { mockRouterContext } from "./routing";

let initialState = {
  book: {
    url: null,
    data: null,
    isFetching: false,
    fetchError: null,
    editError: null
  },
  complaints: {
    url: null,
    data: null,
    isFetching: false,
    fetchError: null
  }
};

describe("TabContainer", () => {
  let wrapper;
  let context;
  let push;
  let store;

  beforeEach(() => {
    store = buildStore();
    push = stub();
    context = mockRouterContext(push);
    wrapper = mount(
      <TabContainer
        bookUrl="book url"
        collectionUrl="collection url"
        tab={null}
        csrfToken="token"
        refreshCatalog={stub()}
        store={store}
        >
        <div className="bookDetails">Moby Dick</div>
      </TabContainer>,
      { context }
    );
  });

  it("shows book details", () => {
    let details = wrapper.find(".bookDetails");
    expect(details).to.be.ok;
  });

  it("shows details, edit, classifications, and complaints tabs", () => {
    let links = wrapper.find("ul.nav-tabs").find("a");
    let linkTexts = links.map(link => link.text());
    expect(linkTexts).to.contain("Details");
    expect(linkTexts).to.contain("Edit");
    expect(linkTexts).to.contain("Classifications");
    expect(linkTexts).to.contain("Complaints");
  });

  it("shows Editor", () => {
    let editor = wrapper.find(Editor);
    expect(editor.props().csrfToken).to.equal("token");
    expect(editor.props().bookUrl).to.equal("book url");
  });

  it("shows classifications", () => {
    let classifications = wrapper.find(Classifications);
    expect(classifications.props().bookUrl).to.equal("book url");
  });

  it("shows Complaints", () => {
    let complaints = wrapper.find(Complaints);
    expect(complaints.props().bookUrl).to.equal("book url");
  });

  it("uses router to navigate when tab is clicked", () => {
    let tabs = wrapper.find("ul.nav-tabs").find("a");
    tabs.at(1).simulate("click", { target : { dataset: { tabkey: "edit" } } });
    let label = tabs.at(1).text();
    expect(push.callCount).to.equal(1);
    expect(push.args[0][0]).to.equal(context.pathFor("collection url", "book url", label));
  });

  it("shows complaints count", () => {
    wrapper.setProps({ complaintsCount: 5 });

    let links = wrapper.find("ul.nav-tabs").find("a");
    let linkTexts = links.map(link => link.text());
    expect(linkTexts).to.contain("Complaints (5)");
  });

  it("clears book data when receiving new book url", () => {
    let clearBook = stub();
    wrapper.setProps({ clearBook });
    wrapper.setProps({ bookUrl: "new book url" });
    expect(clearBook.callCount).to.equal(1);
  });

  it("clears book data on unount", () => {
    let clearBook = stub();
    wrapper.setProps({ clearBook });
    wrapper.unmount();
    expect(clearBook.callCount).to.equal(1);
  });
});