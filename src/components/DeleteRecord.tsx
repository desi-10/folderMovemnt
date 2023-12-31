import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { invoke } from "@tauri-apps/api";
import { Newrecord } from "../context/DataContext";
import { toast } from "react-toastify";

interface IDeleteRecord {
  handleDeletePatientModal: () => void;
}

const DeleteRecord = ({ handleDeletePatientModal }: IDeleteRecord) => {
  const { deleteId, getAllRecords } = useContext(DataContext);
  const [deleteRecord, setDeleteRecord] = useState<Newrecord | undefined>();

  useEffect(() => {
    const getRecordById = async () => {
      try {
        const id = JSON.stringify(deleteId);
        const results: Newrecord = JSON.parse(
          await invoke("get_record_by_id_command", { id })
        );
        setDeleteRecord(results);
      } catch (error) {
        console.log(error);
      }
    };
    getRecordById();
  }, []);

  const deleteRecordById = async () => {
    try {
      const id = JSON.stringify(deleteId);
      await invoke("delete_record_by_id_command", { id });
      getAllRecords();
      handleDeletePatientModal();
      toast.success(`${deleteRecord?.opdnumber} was deleted succesfully`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="relative">
      <div className="fixed top-0 left-0 w-full h-full bg-black/90 z-10"></div>

      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex item-center justify-center z-20 bg-white p-5 rounded-lg dark:bg-gray-900">
        <div>
          <h2 className="text-2xl text-black font-bold text-center mb-5 dark:text-gray-300">
            Delete Record
          </h2>
          <p className="text-center">
            Are you sure you want to delete this record, <br />
            with the OPD Number :{" "}
            <span className="text-blue-600 font-bold">
              {deleteRecord?.opdnumber}
            </span>
          </p>
          <div className="flex justify-between items-center my-5">
            <button
              onClick={deleteRecordById}
              className=" bg-red-600 px-5 py-2 text-white border-2 border-red-600 rounded-lg shadow-lg dark:bg-red-700 dark:border-red-700"
            >
              <p className="">Delete Patient Record</p>
            </button>
            <button
              onClick={handleDeletePatientModal}
              className="border-2 bg-gray-500 border-gray-500 text-white px-5 py-2 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-700"
            >
              <p className="">Cancel</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteRecord;
