import React from "react";
import { render } from "react-dom";
import { actions } from "./Actions";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import ChildComponent from "./Child/ChildComponent";

const App = observer(() => {
  // binding output goes here
  const [viewModel, setViewModel] = React.useState({});

  React.useEffect(() => {
    async function load() {
      observe(actions, "viewModel", obj => {
        setViewModel(obj.newValue);
      });

      await actions.load();
    }

    load();
  }, []);

  return (
    <>
      <h3>Reactive Parent Component (1-way [up & down])</h3>
      {viewModel.formattedString}

      <br />
      <br />

      <input
        value={viewModel.fName}
        onChange={e => {
          setViewModel({ ...viewModel, fName: e.target.value });
        }}
      />

      <input
        value={viewModel.lName}
        onChange={e => {
          setViewModel({ ...viewModel, lName: e.target.value });
        }}
      />

      <button
        onClick={() => {
          actions.submit(viewModel);
        }}
      >
        Save
      </button>

      <ChildComponent />
    </>
  );
});

const rootElement = document.getElementById("root");
render(<App />, rootElement);
