import { expect } from "chai";
import { stub } from "sinon";

import * as React from "react";
import { shallow, mount } from "enzyme";

import { BookDetailsEditor } from "../BookDetailsEditor";
import { Button } from "library-simplified-reusable-components";
import BookEditForm from "../BookEditForm";
import ErrorMessage from "../ErrorMessage";

describe("BookDetailsEditor", () => {
  let fetchBook;
  let fetchRoles;
  let fetchMedia;
  let fetchLanguages;
  let editBook;
  let dispatchProps;

  beforeEach(() => {
    fetchBook = stub();
    fetchRoles = stub();
    fetchMedia = stub();
    fetchLanguages = stub();
    editBook = stub();
    dispatchProps = {
      fetchBook, fetchRoles, fetchMedia, fetchLanguages, editBook
    };
  });

  it("loads admin book url, roles, languages, and media on mount", () => {
    let permalink = "works/1234";
    let wrapper = shallow(
      <BookDetailsEditor
        bookUrl={permalink}
        {...dispatchProps}
        csrfToken={"token"}
        />
    );

    expect(fetchBook.callCount).to.equal(1);
    expect(fetchBook.args[0][0]).to.equal("admin/works/1234");
    expect(fetchRoles.callCount).to.equal(1);
    expect(fetchMedia.callCount).to.equal(1);
    expect(fetchLanguages.callCount).to.equal(1);
  });

  it("loads admin book url when given a new book url", () => {
    let permalink = "works/1234";
    let newPermalink = "works/5555";
    let element = document.createElement("div");
    let wrapper = shallow(
      <BookDetailsEditor
        bookUrl={permalink}
        {...dispatchProps}
        csrfToken={"token"}
        />
    );
    wrapper.setProps({ bookUrl: newPermalink });
    wrapper.update();

    expect(fetchBook.callCount).to.equal(2);
    expect(fetchBook.args[1][0]).to.equal("admin/works/5555");
  });

  it("shows title", () => {
    let wrapper = shallow(
      <BookDetailsEditor
        bookData={{ id: "id", title: "title" }}
        bookUrl="url"
        csrfToken="token"
        {...dispatchProps}
        />
    );

    let header = wrapper.find("h2");
    expect(header.text()).to.contain("title");
  });

  it("shows button form for hide link", () => {
    let hideLink = {
      href: "href", rel: "http://librarysimplified.org/terms/rel/hide"
    };
    let wrapper = shallow(
      <BookDetailsEditor
        bookData={{ id: "id",  title: "title", hideLink: hideLink }}
        bookUrl="url"
        csrfToken="token"
        {...dispatchProps}
        />
    );
    let hide = (wrapper.instance() as any).hide;

    let hideButton = wrapper.find(Button);
    expect(hideButton.prop("content")).to.equal("Hide");
    expect(hideButton.prop("callback")).to.equal(hide);
  });

  it("shows button form for restore link", () => {
    let restoreLink = {
      href: "href", rel: "http://librarysimplified.org/terms/rel/restore"
    };
    let wrapper = shallow(
      <BookDetailsEditor
        bookData={{ id: "id", title: "title", restoreLink: restoreLink }}
        bookUrl="url"
        csrfToken="token"
        {...dispatchProps}
        />
    );
    let restore = (wrapper.instance() as any).restore;

    let restoreButton = wrapper.find(Button);
    expect(restoreButton.prop("content")).to.equal("Restore");
    expect(restoreButton.prop("callback")).to.equal(restore);
  });

  it("shows button form for refresh link", () => {
    let refreshLink = {
      href: "href", rel: "http://librarysimplified/terms/rel/refresh"
    };
    let wrapper = shallow(
      <BookDetailsEditor
        bookData={{ id: "id", title: "title", refreshLink: refreshLink }}
        bookUrl="url"
        csrfToken="token"
        {...dispatchProps}
        />
    );
    let refresh = (wrapper.instance() as any).refreshMetadata;

    let refreshButton = wrapper.find(Button);
    expect(refreshButton.prop("content")).to.equal("Refresh Metadata");
    expect(refreshButton.prop("callback")).to.equal(refresh);
  });

  it("shows fetch error message", () => {
    let fetchError = {
      status: 500,
      response: "response",
      url: ""
    };
    let wrapper = shallow(
      <BookDetailsEditor
        bookData={{ id: "id", title: "title" }}
        bookUrl="url" csrfToken="token"
        fetchError={fetchError}
        {...dispatchProps}
        />
    );

    let editForm = wrapper.find(BookEditForm);
    expect(editForm.length).to.equal(0);
    let error = wrapper.find(ErrorMessage);
    expect(error.prop("error")).to.equal(fetchError);
  });

  it("shows edit error message with form", () => {
    let editError = {
      status: 500,
      response: "response",
      url: ""
    };
    let editLink = {
      href: "href", rel: "http://librarysimplified.org/terms/rel/edit"
    };
    let wrapper = shallow(
      <BookDetailsEditor
        bookData={{ id: "id", title: "title", editLink: editLink }}
        bookUrl="url"
        csrfToken="token"
        editError={editError}
        {...dispatchProps}
        />
    );

    let editForm = wrapper.find(BookEditForm);
    expect(editForm.length).to.equal(1);
    let error = wrapper.find(ErrorMessage);
    expect(error.prop("error")).to.equal(editError);
  });

  it("shows book edit form", () => {
    let roles = {
      "aut": "Author",
      "nar": "Narrator"
    };
    let media = {
      "http://schema.org/AudioObject": "Audio",
      "http://schema.org/Book": "Book"
    };
    let languages = {
      "eng": ["English"],
      "spa": ["Spanish", "Castilian"]
    };
    let editLink = {
      href: "href", rel: "http://librarysimplified.org/terms/rel/edit"
    };
    let wrapper = shallow(
      <BookDetailsEditor
        bookData={{ id: "id", title: "title", editLink }}
        bookUrl="url"
        csrfToken="token"
        {...dispatchProps}
        roles={roles}
        media={media}
        languages={languages}
      />
    );

    let editForm = wrapper.find(BookEditForm);
    expect(editForm.length).to.equal(1);
    expect(editForm.prop("title")).to.equal("title");
    expect(editForm.prop("roles")).to.equal(roles);
    expect(editForm.prop("media")).to.equal(media);
    expect(editForm.prop("languages")).to.equal(languages);
  });
});
