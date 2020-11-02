import * as React from "react";
import EditableInput from "./EditableInput";
import CustomListSearchOptions from "./CustomListSearchOptions";
import SearchIcon from "./icons/SearchIcon";
import { LanguagesData, LibraryData } from "../interfaces";
import { Button, Panel, Form } from "library-simplified-reusable-components";

export interface CustomListSearchProps {
  search: (searchTerms: string, sortBy: string, language: string) => void;
  entryPoints?: string[];
  getEntryPointsElms?: (entryPoints: string[]) => {};
  startingTitle?: string;
  library: LibraryData;
  languages: LanguagesData;
}

export interface CustomListSearchState {
  sortBy?: string;
  language: string;
}

export default class CustomListSearch extends React.Component<CustomListSearchProps, CustomListSearchState> {
  constructor(props: CustomListSearchProps) {
    super(props);
    this.submitSearch = this.submitSearch.bind(this);
    this.sort = this.sort.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.state = { sortBy: null, language: "" };
  }

  componentDidMount() {
    if (this.props.startingTitle) {
      (this.refs["searchTerms"] as HTMLInputElement).value = this.props.startingTitle;
      this.submitSearch();
    }
  }

  submitSearch() {
    const searchTerms = encodeURIComponent((this.refs["searchTerms"] as HTMLInputElement).value);
    const {sortBy, language} = {...this.state};
    this.props.search(searchTerms, sortBy, language);
  }

  sort(sortBy: string) {
    this.setState({ sortBy });
  }

  setLanguage(language: string) {
    this.setState({ language });
  }

  renderSearchBox(): JSX.Element {
    return (
      <fieldset key="search">
        <legend className="visuallyHidden">Search for titles</legend>
        {
          this.props.entryPoints?.length ? (
            <div className="entry-points">
              <span>Select the entry point to search for:</span>
              <div className="entry-points-selection">
                {this.props.getEntryPointsElms(this.props.entryPoints)}
              </div>
            </div>
          ) : null
        }
        <input
          aria-label="Search for a book title"
          className="form-control"
          ref="searchTerms"
          type="text"
          placeholder="Enter a search term"
        />
      </fieldset>
    );
  }

  render(): JSX.Element {
    const searchOptions = (
      <CustomListSearchOptions
        updateSortBy={this.sort}
        updateLanguage={this.setLanguage}
        sortBy={this.state.sortBy}
        library={this.props.library}
        languages={this.props.languages}
      />
    );

    const searchForm = (
      <Form
        onSubmit={this.submitSearch}
        content={[
          this.renderSearchBox(),
          searchOptions
        ]}
        buttonClass="left-align"
        buttonContent={<span>Search<SearchIcon /></span>}
        className="search-titles"
      />
    );

    return (
      <Panel
        headerText="Search for titles"
        id="search-titles"
        openByDefault={true}
        onEnter={this.submitSearch}
        content={searchForm}
      />
    );
  }
}
