import * as React from "react";
import EditableInput from "./EditableInput";
import { Panel } from "library-simplified-reusable-components";
import { LanguagesData, LibraryData } from "../interfaces";

export interface CustomListSearchOptionsProps {
  updateSortBy: (sortBy: string) => void;
  updateLanguage: (language: string) => void;
  sortBy: string;
  library?: LibraryData;
  languages?: LanguagesData;
}

function CustomListSearchOptions(props?: CustomListSearchOptionsProps) {
  const updateLanguage = (e) => {
    props.updateLanguage(e.target.value);
  };

  const getLanguageName = (languageAbbreviation: string) => {
    return props.languages && props.languages[languageAbbreviation].join("; ");
  };

  const renderInput = (k: string, v: string) => {
    return (
      <EditableInput
        type="radio"
        name={v}
        value={v}
        label={k}
        checked={v === props.sortBy}
        onChange={() => props.updateSortBy(v)}
      />
    );
  };

  // let renderSortBy = () => {
  //    const sortBy = { "Relevance (default)": null, "Title": "title", "Author": "author" };
  //    const info: string[] = [
  //      "Note: currently, you can sort only by attributes which you have enabled in this library's Lanes & Filters configuration.",
  //      "Selecting \"Title\" or \"Author\" will automatically filter out less relevant results."
  //    ];
  //    return (
  //      <fieldset key="sortBy" className="well search-options">
  //        <legend>Sort by:</legend>
  //        <ul>
  //          { Object.keys(sortBy).map(x => <li key={x}>{renderInput(x, sortBy[x])}</li>) }
  //        </ul>
  //        { info.map(x => <p><i>{x}</i></p>) }
  //      </fieldset>
  //    );
  // };

  const renderLanguageFilter = () => {
    const settings = props.library?.settings;
    const languageFields =
      settings && Object.keys(settings).filter((x) => x.match(/_collections/));
    const languages = [].concat(...languageFields?.map((x) => settings[x]));
    return (
      <fieldset key="languages" className="well search-options">
        <legend>Filter by language:</legend>
        <section>
          <select onBlur={updateLanguage}>
            <option value="all" aria-selected={false}>
              All
            </option>
            {languages.map((x) => (
              <option key={x} value={x} aria-selected={false}>
                {getLanguageName(x)}
              </option>
            ))}
          </select>
        </section>
      </fieldset>
    );
  };

  return (
    <Panel
      id="advanced-search-options"
      key="advanced-search-options"
      style="instruction"
      headerText="Advanced search options"
      content={[
        // renderSortBy(),
        renderLanguageFilter(),
      ]}
    />
  );
}

export default CustomListSearchOptions;
