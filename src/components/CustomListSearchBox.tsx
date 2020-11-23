import * as React from "react";
import EditableInput from "./EditableInput";

export interface CustomListSearchBoxProps {
  entryPoints?: string[];
  updateSearchTerms: (searchTerms: string) => void;
  startingTitle?: string;
  entryPointSelected?: string;
  changeEntryPoint?: (entryPoint: string) => void;
}

function CustomListSearchBox(props: CustomListSearchBoxProps) {
  const getEntryPointsElms = (entryPoints) => {
    const entryPointsElms = [];
    !entryPoints.includes("All") && entryPoints.unshift("All");
    entryPoints.forEach((entryPoint) =>
      entryPointsElms.push(
        <EditableInput
          key={entryPoint}
          type="radio"
          name="entry-points-selection"
          checked={
            entryPoint === props.entryPointSelected ||
            entryPoint.toLowerCase() === props.entryPointSelected
          }
          label={entryPoint}
          value={entryPoint}
          onChange={() => props.changeEntryPoint(entryPoint)}
        />
      )
    );

    return entryPointsElms;
  };
  return (
    <fieldset key="search">
      <legend className="visuallyHidden">Search for titles</legend>
      {props.entryPoints?.length ? (
        <div className="entry-points">
          <span>Select the entry point to search for:</span>
          <div className="entry-points-selection">
            {getEntryPointsElms(props.entryPoints)}
          </div>
        </div>
      ) : null}
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
}

export default CustomListSearchBox;
