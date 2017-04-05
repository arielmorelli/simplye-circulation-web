import * as React from "react";
import { Store } from "redux";
import AdminAuthServices from "./AdminAuthServices";
import { State } from "../reducers/index";

export interface SetupContext {
  editorStore: Store<State>;
  csrfToken: string;
}

export default class Setup extends React.Component<void, void> {
  context: SetupContext;

  static contextTypes: React.ValidationMap<SetupContext> = {
    editorStore: React.PropTypes.object.isRequired,
    csrfToken: React.PropTypes.string.isRequired
  };

  render(): JSX.Element {
    return (
      <AdminAuthServices
        store={this.context.editorStore}
        csrfToken={this.context.csrfToken}
        editOrCreate="create"
        />
    );
  }
}