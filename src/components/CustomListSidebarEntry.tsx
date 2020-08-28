import * as React from "react";
import PencilIcon from "./icons/PencilIcon";
import TrashIcon from "./icons/TrashIcon";
import { Button } from "library-simplified-reusable-components";
import { CustomListData } from "../interfaces";
import { Link } from "react-router";

export interface CustomListSidebarEntryProps {
  list: CustomListData;
  library: string;
  identifier?: string;
  isLibraryManager: boolean;
  deleteCustomList: (list: CustomListData) => Promise<void>;
}

export default class CustomListSidebarEntry extends React.Component <CustomListSidebarEntryProps, {}> {
  renderInfo(): JSX.Element {
    return (
      <div className="custom-list-info">
        <p>{ this.props.list.name }</p>
        <p>Books in list: { this.props.list.entry_count }</p>
        <p>ID-{ this.props.list.id }</p>
      </div>
    );
  }

  renderButtons(isActive: boolean): JSX.Element {
    let alreadyEditing = (
      <Button
        disabled={true}
        content="Editing"
        className="left-align small"
      />
    );
    let editLink = (
      <Link
        to={"/admin/web/lists/" + this.props.library + "/edit/" + this.props.list.id}
        className="btn left-align small"
      >
        <span>Edit<PencilIcon /></span>
      </ Link>
    );
    let editButton = isActive ? alreadyEditing : editLink;

    let deleteButton: JSX.Element;
    if (this.props.isLibraryManager) {
      deleteButton = (
        <Button
          callback={() => this.props.deleteCustomList(this.props.list)}
          content={<span>Delete<TrashIcon /></span>}
          className="right-align small danger"
        />
      );
    }

    return (
      <div className = "custom-list-buttons">
        { editButton }
        { deleteButton }
      </div>
    );
  }

  render(): JSX.Element {
    let { list, identifier } = this.props;
    let isActive = identifier && identifier.toString() === list.id.toString();
    return (
      <li key={list.id} className={isActive ? "active" : "" }>
        { this.renderInfo() }
        { this.renderButtons(isActive) }
      </li>
    );
  }
}
