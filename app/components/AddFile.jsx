import { db, storage } from "@/Config/firebaseConfig";

import { CloudContext } from "@/context/cloudContext";

import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

const AddFile = () => {
  const { data: session } = useSession();
  const { updateMessage, parentFolderId, update, updateChange, updateFiles } =
    useContext(CloudContext);

  const onFileUpload = async (file) => {
    updateMessage(`Uploading File....`);
    try {
      const fileRef = ref(storage, "files/" + file.name);

      uploadBytes(fileRef, file)
        .then((snapshot) => {
          console.log(file);
        })
        .then((res) => {
          getDownloadURL(fileRef).then(async (downloadURL) => {
            const docId = Date.now().toString();
            const newDoc = {
              id: docId,
              lastModified: file.lastModified,
              lastModifiedDate: file.lastModifiedDate,
              size: (file.size / (1024.0*1024.0)).toFixed(2),
              name: file.name,
              type: file.name.split(".")[1],
              parentFolder: parentFolderId,
              uploadedBy: session.user.email,
              image: downloadURL,
              stared: false,
            };
            await setDoc(doc(db, "files", docId), newDoc);

            updateFiles(newDoc);
            setTimeout(() => {
              updateMessage(`File Uploaded!`);
            }, 500);
            setTimeout(() => {
              updateMessage("");
            }, 6000);
            updateChange(update + 1);
          });
        });
    } catch (error) {
      console.log("My Error IS \n\n", error);
    }

    document.getElementById("my_modal_3").close();
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box bg-white  border-0 ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="flex items-center justify-center w-full  ">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-400 text-gray-800 text-center"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm ">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs ">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(event) => {
                  onFileUpload(event.target.files[0]);
                }}
              />
            </label>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddFile;
