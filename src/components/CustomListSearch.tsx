import * as React from "react";
import EditableInput from "./EditableInput";
import CustomListSearchBox from "./CustomListSearchBox";
import CustomListSearchOptions from "./CustomListSearchOptions";
import SearchIcon from "./icons/SearchIcon";
import { LanguagesData, LibraryData } from "../interfaces";
import { Panel, Form } from "library-simplified-reusable-components";

export interface CustomListSearchProps {
  search: (searchTerms: string, sortBy: string, language: string) => void;
  entryPoints?: string[];
  getEntryPointsElms?: (entryPoints: string[]) => {};
  startingTitle?: string;
  library: LibraryData;
  languages: LanguagesData;
}

export interface CustomListSearchState {
  searchTerms?: string;
  sortBy?: string;
  language: string;
}

export default class CustomListSearch extends React.Component<CustomListSearchProps, CustomListSearchState> {
  constructor(props: CustomListSearchProps) {
    super(props);
    this.submitSearch = this.submitSearch.bind(this);
    this.setSearchTerms = this.setSearchTerms.bind(this);
    this.sort = this.sort.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.state = { searchTerms: this.props.startingTitle || "", sortBy: null, language: "" };
  }

  componentDidMount() {
    if (this.props.startingTitle) {
      this.setState({ searchTerms: this.props.startingTitle });
      this.submitSearch();
    }
  }

  submitSearch() {
    const { searchTerms, sortBy, language } = {...this.state};
    this.props.search(searchTerms, sortBy, language);
  }

  setSearchTerms(searchTerms: string) {
    this.setState({ searchTerms });
  }

  sort(sortBy: string) {
    this.setState({ sortBy });
  }

  setLanguage(language: string) {
    this.setState({ language });
  }

  render(): JSX.Element {
    const searchBox = (
      <CustomListSearchBox
        entryPoints={this.props.entryPoints}
        getEntryPointsElms={this.props.getEntryPointsElms}
        updateSearchTerms={this.setSearchTerms}
        startingTitle={this.state.searchTerms}
      />
    );

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
        content={[searchBox, searchOptions]}
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
