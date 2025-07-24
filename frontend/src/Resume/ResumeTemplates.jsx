import React from "react";
import { useState } from "react";

function ResumeTemplates() {
  const [theme, setTheme] = useState({
    template: "",
    headingcolor: "",
    linkcolor: "",
    underlinelink: "",
    underlineheading: "",
  });

  const selectTemplate = (e) => {
    setTheme({
      ...theme,
      template: e.target.attributes[0]?.nodeValue,
    });
  };
  const submitHandler = (e) => {
    setTheme({
      ...theme,
      [e.target.name]: e.target.value,
    });
  };
  const sumb = (e) => {
    e.preventDefault();
    console.log(theme);
  };
  const resume = {
    projArr: [
      {
        name: "Hiven",
        desc: "hievn is a user friendly Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa molestias dolores obcaecati doloribus dignissimos sed eum commodi assumenda mollitia cumque?",
        projLink: "hivenproducts.in",
      },
        {
        name: "Hiven",
        desc: "hievn is a user friendly Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa molestias dolores obcaecati doloribus dignissimos sed eum commodi assumenda mollitia cumque?",
        projLink: "hivenproducts.in",
      },
    ],
    personalDetailsArr: [
      {
        fullname: "Sonia",
        City: "Lucknow",
        Country: "India",
        Portfolio: "Portfolio",
        Github: "Github",
        Linkedin: "Linkedin",
        Email: "Email",
      },
    ],
    techSkillsArr: [{ skillName: "react.js" },{ skillName: "react.js" }],
    softSkillsArr: [{ skillName: "teamwork" },{ skillName: "teamwork" }],
    courseWareArr: [{ skillName: "java " },{ skillName: "java " }],
    educationArr: [
      {
        Degree: "btech",
        CName: "srimt",
        Date: "2025",
        Specialization: "cse",
        percentage: "95",
      },
      {
        Degree: "btech",
        CName: "srimt",
        Date: "2025",
        Specialization: "cse",
        percentage: "95",
      },
    ],
    certificatesArr: [{ certName: "python", driveLink: "fssf" },{ certName: "python", driveLink: "fssf" },{ certName: "python", driveLink: "fssf" }],
    objective:
      "Seeking a challenging engineering role that fosters innovation and growth while allowing me to apply my academic knowledge and project experience.",
  };
  return (
    <>
      {/* <h2 className="text-2xl text-center font-bold">Select your Template</h2>
      <form action="" onSubmit={sumb}>
        <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-600 gap-2 mt-1 mb-5 p-2">
          <img
            src="/template1.webp"
            alt=""
            width={300}
            onClick={selectTemplate}
            className="mx-5 hover:cursor-pointer"
          />
          <img
            src="/template2.png"
            alt=""
            width={300}
            onClick={selectTemplate}
            className="mx-5 hover:cursor-pointer"
          />
          <img
            src="/template3.png"
            alt=""
            width={300}
            onClick={selectTemplate}
            className="mx-5 hover:cursor-pointer"
          />
        </div>
        <div className="bg-gray-200 p-5 border-2 border-gray-400 rounded shadow-md mx-2 shadow-gray-500 md:w-[50%] md:mx-auto">
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-3">
              <label htmlFor="hc"> Enter your Heading color:</label>
              <label htmlFor="lc"> Enter your Link's color:</label>
              <label htmlFor="uh"> You want to underline your headings:</label>
              <label htmlFor="ul"> You want to underline your Links:</label>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="color"
                name="headingcolor"
                id="hc"
                className="border-2 border-gray-500 hover:shadow-md hover:shadow-black  hover:cursor-pointer w-20"
                onChange={submitHandler}
              />
              <input
                type="color"
                name="linkcolor"
                id="lc"
                className="border-2 border-gray-500 hover:shadow-md hover:shadow-black  hover:cursor-pointer w-20"
                onChange={submitHandler}
              />
              <select
                name="underlineheading"
                id="uh"
                className="border-2 border-gray-500 hover:shadow-md hover:shadow-black hover:cursor-pointer w-20"
                onChange={submitHandler}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <select
                name="underlinelink"
                id="ul"
                className="border-2 border-gray-500 hover:shadow-md hover:shadow-black hover:cursor-pointer w-20"
                onChange={submitHandler}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>
        <button className="bg-black text-white px-5 py-3 m-5">Submit</button>
      </form> */}

<div className="flex flex-col md:mx-28">

  {/* Personal Details */}
  {resume.personalDetailsArr.map((detail, idx) => (
    <div key={idx}>
      <h2 className="text-center text-2xl font-bold">{detail.fullname}</h2>
      <div className="flex align-middle justify-center p-1">
        <h2 className="text-sm font-medium">{detail.City}, {detail.Country}</h2>
        <h2 className="text-sm font-medium"> | {detail.Email}</h2>
      </div>
      <div className="flex justify-center p-1 border-b-2 border-black mx-2">
        <h2 className="text-sm font-medium">{detail.Linkedin}</h2>
        <h2 className="text-sm font-medium"> | {detail.Github}</h2>
        <h2 className="text-sm font-medium"> | {detail.Portfolio}</h2>
      </div>
    </div>
  ))}

  {/* Education */}
  <h2 className="text-xl font-bold">Education</h2>
  {resume.educationArr.map((edu, idx) => (
    <div key={idx} className="border-b-2 border-black">
      <div className="flex justify-between">
        <h2 className="text-sm font-medium">{edu.CName}</h2>
        <h2 className="text-sm font-medium">{edu.Date}</h2>
      </div>
      <div className="flex justify-between">
        <h2 className="text-sm font-medium">{edu.Degree}</h2>
        <h2 className="text-sm font-medium">{edu.Specialization}</h2>
      </div>
      <h2 className="text-sm font-medium">Scored Percentage: {edu.percentage}</h2>
    </div>
  ))}

  {/* Projects */}
  <h2 className="text-xl font-bold">Projects</h2>
  {resume.projArr.map((proj, idx) => (
    <div key={idx} className="border-b-2 border-black">
      <h2 className="text-sm font-medium">{proj.name}</h2>
      <p>{proj.desc}</p>
      <span className="text-xs font-bold p-1">Live Link - </span>
      <span className="text-xs">{proj.projLink}</span>
    </div>
  ))}

  {/* Skills */}
  <h2 className="text-xl font-bold">SKILLS</h2>
  <div className="flex justify-evenly border-b-2 border-black">
    <ul>
      {resume.techSkillsArr.map((skill, idx) => (
        <li key={idx} className="text-sm list-disc font-medium">{skill.skillName}</li>
      ))}
    </ul>
    <ul>
      {resume.softSkillsArr.map((skill, idx) => (
        <li key={idx} className="text-sm list-disc font-medium">{skill.skillName}</li>
      ))}
    </ul>
    <ul>
      {resume.courseWareArr.map((skill, idx) => (
        <li key={idx} className="text-sm list-disc font-medium">{skill.skillName}</li>
      ))}
    </ul>
  </div>

  {/* Achievements & Certificates */}
  <h2 className="text-xl font-bold">Achievements and Certificates</h2>
  <div className="border-b-2 border-black">
    <ul className="pl-5">
      {resume.certificatesArr.map((cert, idx) => (
        <li key={idx} className="text-sm list-disc font-medium">{cert.certName}</li>
      ))}
    </ul>
  </div>

</div>
    </>
  );
}

export default ResumeTemplates;
