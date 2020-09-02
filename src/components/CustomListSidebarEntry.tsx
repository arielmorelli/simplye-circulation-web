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

export default function CustomListSidebarEntry(props: CustomListSidebarEntryProps): JSX.Element {
  let renderInfo = ((): JSX.Element =>  {
    return (
      <div className="custom-list-info">
        <p>{ props.list.name }</p>
        <p>Books in list: { props.list.entry_count }</p>
        <p>ID-{ props.list.id }</p>
      </div>
    );
  });

  let renderButtons = ((isActive: boolean): JSX.Element => {
    let alreadyEditing = (
      <Button
        disabled={true}
        content="Editing"
        className="left-align small"
      />
    );
    let editLink = (
      <Link
        to={`/admin/web/lists/${props.library}/edit/${props.list.id}`}
        className="btn left-align small"
      >
        <span>Edit<PencilIcon /></span>
      </ Link>
    );
    let editButton = isActive ? alreadyEditing : editLink;

    let deleteButton: JSX.Element;
    if (props.isLibraryManager) {
      deleteButton = (
        <Button
          callback={() => props.deleteCustomList(props.list)}
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
  });

  let render = ((): JSX.Element => {
    let { list, identifier } = props;
    let isActive = identifier && identifier.toString() === list.id.toString();
    return (
      <li key={list.id} className={isActive ? "active" : "" }>
        { renderInfo() }
        { renderButtons(isActive) }
      </li>
    );
  });

  return render();
}
