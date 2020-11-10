import * as React from "react";
import SearchIcon from "./icons/SearchIcon";

export interface CustomListSearchBoxProps {
  entryPoints?: string[];
  getEntryPointsElms?: (entryPoints: string[]) => {};
  updateSearchTerms: (searchTerms: string) => void;
  startingTitle?: string;
}

export default function CustomListSearchBox(props: CustomListSearchBoxProps) {
  let render = () => {
    return (
      <fieldset key="search">
        <legend className="visuallyHidden">Search for titles</legend>
        {
          props.entryPoints?.length ? (
            <div className="entry-points">
              <span>Select the entry point to search for:</span>
              <div className="entry-points-selection">
                {props.getEntryPointsElms(props.entryPoints)}
              </div>
            </div>
          ) : null
        }
        <input
          aria-label="Search for a book title"
          className="form-control"
          type="text"
          placeholder="Enter a search term"
          value={props.startingTitle || ""}
          onChange={(e) => props.updateSearchTerms(e.target.value)}
        />
      </fieldset>
    );
  };

  return render();
}
