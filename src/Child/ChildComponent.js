import React from "react";
import { actions } from "../Actions";
import { observe } from "mobx";
import ChildChildComponent from "./ChildChild/ChildChildComponent";

const ChildComponent = () => {
  // binding output goes here
  const [viewModel, setViewModel] = React.useState({});

  React.useEffect(() => {
    async function load() {
      observe(actions, "viewModel", obj => {
        setViewModel(obj.newValue);
      });
    }

    load();
  }, []);

  return (
    <>
      <h3>Reactive Child Component (1-way [down])</h3>
      {viewModel.formattedString}

      <ChildChildComponent />
    </>
  );
};

export default ChildComponent;
