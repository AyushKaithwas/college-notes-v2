"use client";
import * as React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/upload-file-dropzone";
import { Greetings } from "@/lib/greetings";
import { useEdgeStore } from "@/lib/edgestore";
import institutionData from "@/public/combined_institutions_sorted.json";
import courseData from "@/public/courses.json";
import subjectData from "@/public/subjects.json";

type FileDetailsType = {
  url: string;
  size: number;
  uploadedAt: Date;
  metadata: Record<string, never>;
  path: Record<string, never>;
  pathOrder: string[];
};

export default function UploadPage(): JSX.Element {
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }
  const [time, setTime] = useState("");
  const [salutation, setSalutation] = useState("");
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const fileDetails = React.useRef<FileDetailsType | null>(null);
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
  const handleUpload = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    const formValues = {};

    for (const [key, value] of formData.entries()) {
      formValues[key] = value;
    }
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
          fileDetails.current = res;
        } catch (err) {
          updateFileProgress(fileState.key, "ERROR");
        }
      })
    );
    if (fileDetails.current) {
      const { size, uploadedAt, url } = fileDetails.current;
      const postData = { ...formData, size, uploadedAt, url };
      axios
        .post("/api/upload-note", postData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    console.log(formValues);
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
          <h1 className="font-black text-4xl py-1">{time}</h1>
          <p className=" text-2xl">
            <strong>{salutation}</strong>, {session.user?.name}
          </p>
        </div>
        <div className="w-[40vw] min-w-[300px] border border-tertiary rounded-md p-10">
          <form className="flex flex-col gap-3" onSubmit={handleUpload}>
            <MultiFileDropzone
              onChange={(files) => {
                setFileStates(files);
              }}
              onFilesAdded={(addedFiles) => {
                setFileStates((prev) => [...prev, ...addedFiles]);
              }}
              value={fileStates}
            />
            <div>
              <h2 className="font-bold text-white">Title</h2>
              <input
                className="bg-transparent border border-secondary rounded-lg p-3 w-full text-white"
                name="title"
                placeholder="Enter title"
                type="text"
              />
            </div>
            <div>
              <h2 className="font-bold text-white">Description</h2>
              <textarea
                className="bg-transparent border border-secondary rounded-lg p-3 w-full h-[100px] text-white"
                name="description"
                placeholder="Enter description"
              />
            </div>
            <div>
              <h2 className="font-bold text-white">Institution</h2>
              <select
                className="w-full text-white bg-[#101010] border border-secondary rounded-lg p-3"
                name="institution"
                onChange={(e) => setSelectedInstitution(e.target.value)}
                value={selectedInstitution || institutionData[0].institution}
              >
                <option value="Other">Other</option>
                {institutionData.map((institution) => (
                  <option key={institution.id} value={institution.institution}>
                    {institution.institution}
                  </option>
                ))}
              </select>
              {selectedInstitution === "Other" && (
                <input
                  className="bg-transparent border border-secondary rounded-lg p-3 w-full mt-2 text-white"
                  name="institution"
                  placeholder="Enter other institution"
                  type="text"
                />
              )}
            </div>
            <div>
              <label htmlFor="fieldOfStudy" className="font-bold text-white">
                Field of Study
              </label>
              <select
                className="w-full text-white bg-[#101010] border border-secondary rounded-lg p-3"
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={selectedCourse || courseData[0].course}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="Other">Other</option>
                {courseData.map((course) => {
                  return (
                    <option key={course.id} value={course.course}>
                      {course.course}
                    </option>
                  );
                })}
              </select>
              {selectedCourse === "Other" && (
                <input
                  className="bg-transparent border border-secondary rounded-lg p-3 w-full mt-2 text-white"
                  name="fieldOfStudy"
                  placeholder="Enter other field of study"
                  type="text"
                />
              )}
            </div>
            <div>
              <h2 className="font-bold text-white">Semester</h2>
              <input
                className="bg-transparent border border-secondary rounded-lg p-3 w-full text-white"
                name="semester"
                placeholder="Enter 0 if not applicable"
                type="number"
              />
            </div>
            <div>
              <h2 className="font-bold text-white">Subject</h2>
              <select
                className="w-full text-white bg-[#101010] border border-secondary rounded-lg p-3"
                name="subject"
                onChange={(e) => setSelectedSubject(e.target.value)}
                value={selectedSubject || subjectData[0].subject} // Default to id: 1
              >
                <option value="Other">Other</option>{" "}
                {subjectData.map((subject) => (
                  <option key={subject.id} value={subject.subject}>
                    {subject.subject}
                  </option>
                ))}
                {/* Option to select 'Other' */}
              </select>
              {/* Input box to appear if "Other" is selected */}
              {selectedSubject === "Other" && (
                <input
                  className="bg-transparent border border-secondary rounded-lg p-3 w-full mt-2 text-white"
                  name="subject"
                  placeholder="Enter other subject"
                  type="text"
                />
              )}
            </div>
            <button
              className="inline-flex items-center justify-center text-black font-bold text-sm py-2 px-5 bg-primary rounded-lg hover:bg-hover hover:text-white"
              type="submit"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
