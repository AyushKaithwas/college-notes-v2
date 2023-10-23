"use client";
import * as React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/upload-file-dropzone";
import { Greetings } from "@/lib/greetings";
import { useEdgeStore } from "@/lib/edgestore";
import institutionData from "@/public/institution-database.json";

export default function UploadPage(): JSX.Element {
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }
  const [time, setTime] = useState("");
  const [salutation, setSalutation] = useState("");
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  const handleUpload = async () => {
    await Promise.all(
      fileStates.map(async (fileState) => {
        try {
          const res = await edgestore.publicFiles.upload({
            file: fileState.file,
            onProgressChange: async (progress) => {
              updateFileProgress(fileState.key, progress);
              if (progress === 100) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                updateFileProgress(fileState.key, "COMPLETE");
              }
            },
          });
          console.log(res);
        } catch (err) {
          updateFileProgress(fileState.key, "ERROR");
        }
      })
    );
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- Greetings return type is [string, string] so it's safe to destructure
    const [timeNow, salutationNow]: [string, string] = Greetings();
    setTime(timeNow);
    setSalutation(salutationNow);
  }, []);
  return (
    <div className="w-[100vw] flex flex-col items-center">
      <div className="flex flex-col w-[40vw] min-w-[300px] items-left justify-center py-10 text-secondary ">
        <div className="pb-5 pl-3 ">
          <h1 className="font-black text-3xl">{time}</h1>
          <p>
            <strong>{salutation}</strong>, {session.user?.name}
          </p>
        </div>
        <div className="w-[40vw] min-w-[300px] border border-tertiary rounded-md p-10">
          <form className="flex flex-col gap-3" action="">
            <MultiFileDropzone
              value={fileStates}
              onChange={(files) => {
                setFileStates(files);
              }}
              onFilesAdded={(addedFiles) => {
                setFileStates((prev) => [...prev, ...addedFiles]);
              }}
            />
            <div>
              <h2 className="font-bold text-white">Title</h2>
              <input
                className="bg-transparent border border-secondary rounded-lg p-2 w-full text-white"
                placeholder="Enter title"
                type="text"
              />
            </div>
            <div>
              <h2 className="font-bold text-white">Description</h2>
              <textarea
                className="bg-transparent border border-secondary rounded-lg p-2 w-full h-[100px] text-white"
                placeholder="Enter description"
              />
            </div>
            <div>
              <h2 className="font-bold text-white">Institution</h2>
              <select
                className="w-full text-white bg-[#101010] border border-secondary rounded-lg p-2"
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
              >
                {institutionData.map((institution) => (
                  <option key={institution.id} value={institution.institution}>
                    {institution.institution}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h2 className="font-bold text-white">Field of Study</h2>
              <input
                className="bg-transparent border border-secondary rounded-lg p-2 w-full text-white"
                placeholder="Enter title"
                type="text"
              />
            </div>
            <div>
              <h2 className="font-bold text-white">Semester</h2>
              <input
                className="bg-transparent border border-secondary rounded-lg p-2 w-full text-white"
                placeholder="Enter semester"
                type="number"
              />
            </div>
            <div>
              <h2 className="font-bold text-white">Subject</h2>
              <input
                className="bg-transparent border border-secondary rounded-lg p-2 w-full text-white"
                placeholder="Enter subject"
                type="text"
              />
            </div>
            <button
              className="inline-flex items-center justify-center text-black font-bold text-sm py-2 px-5 bg-primary rounded-lg hover:bg-hover hover:text-white"
              onClick={handleUpload}
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
