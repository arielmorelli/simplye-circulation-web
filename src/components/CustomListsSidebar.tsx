import * as React from "react";
import { CustomListData } from "../interfaces";
import EditableInput from "./EditableInput";
import { Link } from "react-router";
import CustomListSidebarEntry from "./CustomListSidebarEntry";

export interface CustomListsSidebarProps {
  lists: CustomListData[];
  library: string;
  identifier?: string;
  isLibraryManager: boolean;
  deleteCustomList: (list: CustomListData) => Promise<void>;
  changeSort: () => void;
  sortOrder: string;
}


export default function CustomListsSidebar(props: CustomListsSidebarProps): JSX.Element {
  let render = ((): JSX.Element => {
    return(
      <div className="custom-lists-sidebar">
        <h2>List Manager</h2>
        <Link
          className="btn create-button"
          to={"/admin/web/lists/" + props.library + "/create"}>
            Create New List
        </Link>
        {
          props.lists && props.lists.length > 0 &&
          <div>
            {renderSortButtons()}
            <ul>
              {props.lists.map(list => renderEntry(list))}
            </ul>
          </div>
        }
      </div>
    );
  });

  let renderSortButtons = ((): JSX.Element => {
    let sortOrders = [["A-Z", "asc"], ["Z-A", "desc"]];
    return(
      <fieldset>
        <legend className="visuallyHidden">Select list sort type</legend>
        {
          sortOrders.map((order) => {
            let isChecked = props.sortOrder === order[1];
            return (<EditableInput
              key={order[1]}
              type="radio"
              label={`Sort ${order[0]}`}
              name="sort"
              onChange={props.changeSort}
              checked={isChecked}
              disabled={false}
            />);
          })
        }
      </fieldset>
    );
  });

  let renderEntry = ((list: CustomListData): JSX.Element => {
    let { library, identifier, isLibraryManager, deleteCustomList } = props;
    return (
      <CustomListSidebarEntry
        key={list.id}
        list={list}
        library={library}
        identifier={identifier}
        isLibraryManager={isLibraryManager}
        deleteCustomList={deleteCustomList}
      />
    );
  });

  return render();
}
