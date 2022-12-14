import React from "react";
import { actions } from "../../Actions";
import { observe } from "mobx";

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
      <h3>Reactive Child Child Component (1-way [up])</h3>

      <input
        value={viewModel.fName}
        onChange={e => {
          setViewModel({ ...viewModel, fName: e.target.value });
        }}
      />

      <button
        onClick={() => {
          actions.submit(viewModel);
        }}
      >
        Save
      </button>
    </>
  );
};

export default ChildComponent;
