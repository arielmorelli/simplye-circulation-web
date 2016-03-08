import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Root from "./components/Root";
const OPDSBrowser = require("opds-browser");
import Editor from "./components/Editor";

require("bootstrap/dist/css/bootstrap.css");

class CirculationWeb {

  constructor(csrfToken: string) {
    let div = document.createElement("div");
    div.id = "opds-browser";
    document.getElementsByTagName("body")[0].appendChild(div);

    function getParam(name) {
      let match = RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
      return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    };

    function serializeParams(params) {
      if (Object.keys(params).length === 0) {
        return "";
      }

      return "?" + Object.keys(params).reduce((keys, key) => {
        if (params[key]) {
          keys.push(key + "=" + encodeURIComponent(params[key]));
        }
        return keys;
      }, []).join("&");
    };

    function historyArgs(app, collectionUrl, bookUrl) {
      let params = {
        collection: collectionUrl,
        book: bookUrl,
        app: app
      };

      return [params, "", serializeParams(params)];
    }

    window.onpopstate = (event) => {
      let collection = null,
          book = null,
          app = null;

      if (event.state) {
        collection = event.state.collection || null;
        book = event.state.book || null;
        app = event.state.app || "browser";
      }

      // call loadCollectionAndBook with skipOnNavigate = true
      // so that state isn't pushed every time it's popped
      web.setApp(app);
      web.setCollectionAndBook(collection, book);
    };

    function pushHistory(app, collectionUrl, bookUrl) {
      window.history.pushState.apply(window.history, historyArgs(app, collectionUrl, bookUrl));
    };

    let startCollection = getParam("collection");
    let startBook = getParam("book");
    let startApp = getParam("app") || "browser";

    let web;
    ReactDOM.render(
      <Root
        ref={c => web = c}
        collection={startCollection}
        book={startBook}
        app={startApp}
        onNavigate={pushHistory} />,
      document.getElementById("opds-browser")
    );

    if (startApp || startCollection || startBook) {
      window.history.replaceState.apply(window.history, historyArgs(startApp, startCollection, startBook));
    }

    // let pathFor = function(collectionUrl, bookUrl) {
    //   if (collectionUrl) {
    //     return "#/browser/collection/" + encodeURIComponent(collectionUrl);
    //   } else if (bookUrl) {
    //     return "#/browser/book/" + encodeURIComponent(bookUrl);
    //   } else {
    //     return "#/browser";
    //   }
    // }
    //
    // let BrowserWrapper = React.createClass({
    //   render: function () {
    //     return (
    //       <OPDSBrowser
    //         pathFor={pathFor}
    //         onNavigate={(collectionUrl, bookUrl) => console.log(collectionUrl, bookUrl)}
    //         collection={this.props.params.collectionUrl}
    //         book={this.props.params.bookUrl} />
    //     );
    //   }
    // });
    //
    // let app = ReactDOM.render(
    //   <Router history={hashHistory}>
    //     <Route path="browser/collection/:collectionUrl" component={BrowserWrapper} />
    //     <Route path="editor" component={Editor} />
    //   </Router>,
    //   document.getElementById("opds-browser")
    // );
  }
}

export = CirculationWeb;