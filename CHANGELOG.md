## Changelog

### v0.4.4
#### Fixed
- Fixed a bug that blocked creation of a new local analytics service with disabled patron neighborhood analytics.

### v0.4.3
#### Added
- Added a Metadata Services tab to the self-tests section of the Troubleshooting page.
#### Fixed
- Fixed a display bug on the List Manager page.
- Fixed the display color for the Terms & Conditions link in the footer.
- Fixed a bug where an empty book summary caused creating a DraftJS instance to crash the app.

### v0.4.2
#### Updated
- Updated the `opds-web-client` package to v0.3.2.
- Updated the ContextProvider based on the `opds-web-client`'s updated context APIs.

### v0.4.1
#### Fixed
- Fixed accessibility issues found by the `react-axe` package.

### v0.4.0
#### Updated
- Updated the `opds-web-client` package to v0.3.0.
- Updated Typescript to version 3.7.2 and updated other related packages to their latest version.

### v0.3.27
#### Updated
- Updated npm packages including chai, mocha, and sinon.
- Updated version of Node to run in Travis to Node v10.
#### Fixed
- Fixed tests that were passing in Node v8 but failing in Node v10. Specifically, stubbing window.confirm did not work on components that were fully mounted. A shallow mount helped fix this issue, but the tests needed to be updated accordingly.

### v0.3.26
#### Fixed
- Cosmetic fix for InputList items.

### v0.3.25
#### Fixed
- Cosmetic fixes for buttons on the Lists page.

### v0.3.24
#### Added
- Added `react-axe` to test for accessibility.
- Updated the `opds-web-client` package to version 0.2.10.

### v0.3.23
#### Fixed
- Implemented an automatic search for a title when the link from the book editor Lists tab to the Lists page is used.

### v0.3.22
#### Updated
- Streamlined the book editor Lists tab by implementing a dropdown menu option on the InputList component.

### v0.3.21
#### Updated
- Updated the StorageServices component to allow multiple storage services and also displaying each storage's name in the list of services.
#### Fixed
- Fixed an alignment issue in the WithRemoveButton component.

### v0.3.20
#### Fixed
- Fixed a bug where Firefox doesn't programmatically click on an anchor element created to download circulation events.

### v0.3.19
#### Fixed
- Fixed a bug where the catalog navigation links were not styled as "active" when they were on the correct page.

### v0.3.18
#### Added
- Created a Footer which displays a Terms of Service link.

### v0.3.17
#### Updated
- Streamlined the interfaces for configuring location analytics.

### v0.3.16
#### Updated
- Added a date end, event type, and locations input fields to the report form for circulation events in the Dashboard.

### v0.3.15
#### Updated
- Displayed additional terms-of-service information on the library registration form.

### v0.3.14
#### Updated
- Updated the catalog book default colors as well as book detail tabs and entrypoint tabs link color.
#### Fixed
- Ensured that the Self-tests page updates to display the most recent test results.

### v0.3.13
#### Updated
- Refactored the BookEditForm code.
- Made styling improvements to Book Details.
#### Fixed
- Prevented the addition of blank strings as contributor names.

### v0.3.12
#### Added
- Typedoc for generating code documentation.
#### Fixed
- Fixed an issue with the alignment of delete buttons in the Classifications Form.

### v0.3.11
#### Added
- Created a Troubleshooting page, comprising Diagnostics and Self-tests.
#### Updated
- Made the buttons, icons, and links on the catalog page visually consistent with the rest of the interface.
#### Fixed
- Fixed an issue with the alignment of delete buttons in the Input List component.

### v0.3.10
#### Updated
- Updating the scss files so they better match one-to-one with React component files.

### v0.3.9
#### Updated
- Using the Button components for elements that should be buttons instead of anchors or divs.
#### Fixed
- Styling for the book edit components and related buttons.

### v0.3.8
#### Added
- Added a basic WYSIWYG editor to the summary field in the book details form.
- Added `tslint-react-a11y` extension for tslint to fix accessibility issues in the React components.
#### Fixed
- Enabled scrolling through search results in the custom list editor.

### v0.3.7
##### Updated
- Updated Redux to v4, Typescript to v2.9, and the necessary type changes in the code.

### v0.3.6
#### Fixed
- Fixed a minor button styling bug in the Complaints tab.
- Improved formatting of complaint type names.
- Updated the the opds-feed-parser and opds-web-client.

### v0.3.5
#### Updated
- Integrated the Form component from the [https://github.com/NYPL-Simplified/reusable-components](library-simplified-reusable-components) package.

### v0.3.4
#### Updated
- Updated opds-web-client to the latest version, which improves the headings on the book details page.

### v0.3.3
#### Fixed
- Fixed a bug where new lists were unable to save even when new entries were added to them.
- Fixed a bug where saving a newly created list did not redirect to its edit page.

### v0.3.2
#### Fixed
- Deleting a list now also deletes any lanes which contained only that list. Previously, there was no functionality in place to edit or remove any custom lanes when all their custom lists had been deleted.
- Minor styling and bug fixes on the custom list page.

### v0.3.1
#### Fixed
- Fixed a bug involving loading a book cover preview from a URL.

### v0.3.0
#### Updated
- Using React 16 and Enzyme 3.9.

### v0.2.5
#### Updated
- Implemented new styling options for the reusable Button component.

### v0.2.4
#### Updated
- Refactored the Lanes code, and added a button to cancel resetting the lanes.

### v0.2.3
#### Updated
- Specified the node and npm version in package.json.

### v0.2.2
#### Updated
- Improved Nightwatch tests with Page Objects.
#### Fixed
- Alignment of the global search button and the layout for the complaints tab for a book, including updating an input to a Button component.

### v0.2.1
#### Updated
- Improved the performance of the custom lists tab by only fetching the full list of custom lists if they have not already been fetched.
#### Fixed
- Reintroduced Nightwatch and updated tests.

### v0.2.0
#### Updated
- Updated `typings` to `@types`, updated Typescript, updated Webpack, and updated unit tests with fetch-mock. These updates are needed to import the updated `opds-web-client` package.

### v0.1.12
#### Updated
- Updated `reusable-components` to v1.3.1, bringing in the reusable Button component.
- Implemented the new Panel customization option from v1.3.2 of `reusable-components`.

### v0.1.11
#### Fixed
- `package-lock.json` was not insynced with the latest build and caused installing and running test issues.
#### Updated
- Removed `nightwatch` temporarily and updated `reusable-components` to v1.3.0. `nightwatch` brought in `@types` which caused the tests to fail because of compilation issues. Should be brought in soon when other repos have webpack and Typescript updated.

### v0.1.10
#### Updated
- Displaying a different UI for deleted collections. When marked for deletion, a collection will be deleted in the background and this information needs to be conveyed in the UI.
#### Fixed
- Fixed a styling bug affecting the display of exceptions on the Diagnostics page.

### v0.1.9
#### Updated
- Replaced the Collapsible component with a reusable Panel component.

### v0.1.8
#### Updated
- Implemented a language autocomplete field in order to make it easier to set the languages for a library.

### v0.1.7
#### Updated
- Improved the UI for adding multiple inputs in a form.

### v0.1.6
#### Updated
- Improved the process for specifying a library's service and focus areas.

### v0.1.5
#### Fixed
- Fixed minor bug affecting the display for libraries for which registration has failed.

### v0.1.4
#### Added
- Required admins to agree to the terms and conditions before registering or updating a library with a discovery service.

### v0.1.3
#### Added
- Added self-tests for patron authentication integrations.

### v0.1.2
#### Added
- Added self-tests for the ElasticSearch integration.

### v0.1.1
#### Updated
- Improved appearance and readability of Diagnostics page.
- Listed Metadata Services by individual name rather than by protocol.

### v0.1.0
#### Added
- Created a Diagnostics page so that admins can view the output of log scripts which the server has been running behind the scenes.

### v0.0.99
#### Added
- Made it possible to change the order of lanes (within the same parent lane) by dragging and dropping on the lanes page.

### v0.0.98
#### Updated
- Further clarified wording about resetting Adobe IDs.

### v0.0.97
#### Added
- Made it possible for server-side configurations to specify that certain fields should be rendered as textarea elements.

### v0.0.96
#### Fixed
- Displayed initial empty audience and fiction classification values of a book if it didn't have any values. That way, an admin would know that they need to enter values instead of saving and thinking that the book had the correct values.
#### Updated
- Styling on the ClassificationsForm tab for an individual book.

### v0.0.95
#### Updated
- Documentation for the repo.

### v0.0.94
#### Note: this version contains an npm bug. Please upgrade to v0.0.95.
- There's been an issue found in this version of the npm package and we recommend not to use this version.

#### Updated
- Implemented a custom number validator for better error handling.

### v0.0.93
#### Updated
- Further subdivided library form for increased readability.
- Made copy about resetting Adobe IDs more accurate.

### v0.0.92
#### Updated
- Styling for active header nav link.
- Updating the opds-web-client package to 0.1.27 for global element focus color and updating the header focus ring color to white.

### v0.0.91
#### Added
Added a system configuration tab for external catalogs.

### v0.0.90
#### Fixed
- Only showing the "Inherit restrictions from parent lane" setting on the Lane config page when creating child lanes and not a new parent lane.
- Fixing the redirect to the edit Lane form when successfully creating a new Lane.
- Fixing the display message for errors when unsuccessfully creating a new Lane.

### v0.0.89
#### Updated
- Updated the opds-web-client package and passing down a prop to use all languages when doing submitting a search term.

### v0.0.88
#### Added
- Added a welcome message for admins who have no libraries yet.
#### Updated
- Improved the appearance and behavior of the sign-up form.

### v0.0.87
#### Added
- Grouped related fields together in order to make forms more readable.

### v0.0.86
#### Fixed
- Fixed a bug which prevented forms containing collapsible elements from being submitted on enter.

### v0.0.85
#### Fixed
- Fixed a bug involving registering libraries with a discovery service: once a
library is in the production state, the drop-down menu should not be displayed,
i.e. the admin should not be able to change it back to the testing state.
- Fixed the display of success messages on the CDN service form.
#### Added
- The library registration form now provides links to edit the libraries.

### v0.0.84
#### Added
- Updated the form input field labels to explicitly state if an input is required rather than optional. The optional text is now in a field's description. If there are any required fields left blank, they will have an error styling until they are updated. A submitted form with errors will also scroll to the top and focus to the error message so admins know what to fix.

### v0.0.83
#### Fixed
- Checking a flag to see if a setting configuration that supports library registration also supports a staging selection. If the configuration supports staging, the admin can choose between selecting a testing or production stage.

### v0.0.82
#### Fixed
- Fixed a bug involving submitting forms.

### v0.0.81
#### Note: this version contains a bug.  Please upgrade directly to v0.0.82.
#### Added
- Added success messages to configuration forms.
#### Updated
- Moved long configuration instructions into a collapsible panel component, making
the configuration forms easier to read.

### v0.0.80
#### Added
- Added a color picker setting type for configuring background and foreground colors for the web catalog.

### v0.0.79
#### Updated
- Updated how the custom lists in the List admin page are being read. They are now OPDS feeds which help the page load faster. There's now a "Load more" button to fetch more entries in an existing custom list.

### v0.0.78
#### Fixed
- Fixed a bug for new collections that could not correctly fetch self test results.

### v0.0.77
#### Added
- Added the ability for an admin to register a library in either the "testing" or "production" stage with the Library Registry.

### v0.0.76
#### Added
- Implemented the Patron Manager page, on which admins can look up patrons by their barcode and can reset their Adobe IDs.
