import React from "react";

import { useFetch } from "hooks";
import { useParams } from "react-router";

import { BarLoaderSpinner, ErrorHandler } from "components";

import { RoadMapAdd } from "./RoadMapAdd";
import { RoadMapDisplay } from "./RoadMapDisplay";

// const initialState = [
//   {
//     stage_name: "name0",
//     hiring_manager: { value: "manager0", label: "manager0" },
//     interview_questions: "questions0",
//     remarks: "remarks0",
//   },
//   {
//     stage_name: "name1",
//     hiring_manager: { value: "manager1", label: "manager1" },
//     interview_questions: "questions1",
//     remarks: "remarks1",
//   },
//   {
//     stage_name: "name2",
//     hiring_manager: { value: "manager2", label: "manager2" },
//     interview_questions: "questions2",
//     remarks: "remarks2",
//   },
//   {
//     stage_name: "name3",
//     hiring_manager: { value: "manager3", label: "manager3" },
//     interview_questions: "questions3",
//     remarks: "remarks3",
//   },
// ];

const RoadMapMain = () => {
  // const [data, setData] = useState(initialState);
  const { id } = useParams();
  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `jobs/${id}/details/road-map`,
  });

  const onAdd = (newElement) => {
    setData((oldArray) => [...oldArray, newElement]);
  };

  const onEdit = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const onDelete = (id) => {
    setData((current) => current.filter((e) => e.id !== id));
  };

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      <div style={{ textAlign: "right" }} className="my-2">
        <RoadMapAdd onAdd={onAdd}>Add</RoadMapAdd>
      </div>

      {isLoading && <BarLoaderSpinner />}
      <RoadMapDisplay data={data} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
};

export { RoadMapMain };
