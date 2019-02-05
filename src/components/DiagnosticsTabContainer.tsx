import * as React from "react";
import { Store } from "redux";
import { connect } from "react-redux";
import ActionCreator from "../actions";
import { DiagnosticsData } from "../interfaces";
import { State } from "../reducers/index";
import DiagnosticsServiceType from "./DiagnosticsServiceType";
import { TabContainer, TabContainerProps, TabContainerContext } from "./TabContainer";

export interface DiagnosticsTabContainerDispatchProps {
  fetchDiagnostics: () => Promise<any>;
}

export interface DiagnosticsTabContainerOwnProps extends TabContainerProps {
  store: Store<State>;
  goToTab: (tabName: string) => void;
}

export interface DiagnosticsTabContainerStateProps {
  diagnostics?: DiagnosticsData;
}

export interface DiagnosticsTabContainerProps extends DiagnosticsTabContainerDispatchProps, DiagnosticsTabContainerStateProps, DiagnosticsTabContainerOwnProps {};

export class DiagnosticsTabContainer extends TabContainer<DiagnosticsTabContainerProps> {

  DISPLAY_NAMES = {
    coverage_provider: "Coverage Providers",
    monitor: "Monitors",
    script: "Scripts",
    other: "Other"
  };

  componentWillMount() {
    this.props.fetchDiagnostics();
  }

  handleSelect(event) {
    let tab = event.currentTarget.dataset.tabkey;
    this.props.goToTab(tab);
  }

  tabDisplayName(name) {
    if (this.DISPLAY_NAMES[name]) {
      return this.DISPLAY_NAMES[name];
    } else {
      return super.tabDisplayName(name);
    }
  }

  tabs() {
    let tabs = {};
    if (this.props.diagnostics) {
      ["coverage_provider", "monitor", "script", "other"].map((serviceType) => {
        tabs[serviceType] = <DiagnosticsServiceType type={serviceType} services={this.props.diagnostics[serviceType]} />;
      });
    }
    return tabs;
  }
}

function mapStateToProps(state, ownProps: DiagnosticsTabContainerOwnProps) {
  return {
    diagnostics: state.editor.diagnostics && state.editor.diagnostics.data
  };
}

function mapDispatchToProps(dispatch: Function) {
  let actions = new ActionCreator();
  return {
    fetchDiagnostics: () => dispatch(actions.fetchDiagnostics())
  };
}

const ConnectedDiagnosticsTabContainer = connect<DiagnosticsTabContainerStateProps, DiagnosticsTabContainerDispatchProps, DiagnosticsTabContainerOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(DiagnosticsTabContainer);

export default ConnectedDiagnosticsTabContainer;
