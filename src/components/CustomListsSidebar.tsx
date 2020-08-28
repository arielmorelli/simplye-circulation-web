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


export default class CustomListsSidebar extends React.Component<CustomListsSidebarProps, {}> {
  render(): JSX.Element {
    return(
      <div className="custom-lists-sidebar">
        <h2>List Manager</h2>
        <Link
          className="btn create-button"
          to={"/admin/web/lists/" + this.props.library + "/create"}>
            Create New List
        </Link>
        {
          this.props.lists && this.props.lists.length > 0 &&
          <div>
            {this.renderSortButtons()}
            <ul>
              {this.props.lists.map(list => this.renderEntry(list))}
            </ul>
          </div>
        }
      </div>
    );
  }

  renderSortButtons(): JSX.Element {
    let sortOrders = [["A-Z", "asc"], ["Z-A", "desc"]];
    return(
      <fieldset>
        <legend className="visuallyHidden">Select list sort type</legend>
        {
          sortOrders.map((order) => {
            let isChecked = this.props.sortOrder === order[1];
            return (<EditableInput
              key={order[1]}
              type="radio"
              label={`Sort ${order[0]}`}
              name="sort"
              onChange={this.props.changeSort}
              checked={isChecked}
              disabled={false}
            />);
          })
        }
      </fieldset>
    );
  }

  renderEntry(list: CustomListData): JSX.Element {
    let { library, identifier, isLibraryManager, deleteCustomList } = this.props;
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
  }
}
