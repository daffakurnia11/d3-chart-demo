import React from "react";

const data = {
  impact_positive: [
    {
      data: "Position in the Sustainable Transition",
      description:
        "We consider it highly important to determine and embrace our role within the broader transition context. This requires cultivating qualities like openness and eagerness to learn, nurturing critical thinking and co-creation skills, and fostering long-term orientation and vision formation. The time and energy dedicated within our organization to collectively advancing theses kills will be directly proportional to the value we can bring to our students and society at large.",
    },
    {
      data: "Engage Critically with the Issues of Today",
      description:
        "By adopting an even more socially critical attitude (e.g. Questioning the sustainability of businesses applying for internships) will allow us to embrace fully our role as an Educational Institute, helping the world shaping the future and on the long term this will benefit the businesses we partner with.",
    },
    {
      data: "A stronger and more authentic sustainability profile",
      description:
        "Critical thinking and long term orientation will lead HMC to be a cradle for new professions, combine authentic craftsmanship with circularity and get students to design circularly and think critically about their future, also during internships, pushing the industry to innovate.",
    },
    {
      data: "In the Bigger Picture, Less is More",
      description:
        "In the Bigger Picture, Less is More By taking time to zoom out and determine direction, time to focus and think carefully, setting clear goals, more projects could be linked together, bringing simplicity and more job satisfaction.",
    },
  ],
  risk: [
    {
      data: "Becoming Obsolete",
      description:
        "Forming students to create and operate in the linear economy will not help climate change nor them. Research is critical to be truly connected tonew jobs, remaining attractive for students, teachers, maintaining competitive position and resilient for the changes ahead.",
    },
    {
      data: "Fragmentation",
      description:
        "Without a cohesive long term vision, we will continue working haphazardly on different small projects, that do not bear the overall fruit of ingraining sustainability in the curriculum, benefitting a few, but not truly becoming the genetic make up of everyone in the school.",
    },
    {
      data: "Losing Time, Opportunities, Connections",
      description:
        "Outdated knowledge and methods and many good intentions generate complacency without moving us at the speed and acceleration of current changes.",
    },
  ],
  strengths_in_support_of_transform: [
    {
      data: "The Sustainability Team Brings unique strengths to HMC, pivotal to foster and realize the change ahead",
      description:
        "A willingness to embrace change, exercise openness and curiosity, and grow; creativity to generate original ideas, also disrupting conventional patterns; the capacity to engage, determined and patient even when efforts take a long time to bear fruit; and a positive attitude, centered in hope and confidence in the possibility of meaningful change",
    },
  ],
};

export default function PositiveAnalysis() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg grow bg-white p-6 mb-3">
        <h2 className="font-semibold text-base mb-2.5">Impact Positive</h2>
        <ul className="list-disc ms-5">
          {data.impact_positive.map((list: any, key: number) => (
            <li
              key={key}
              className="font-normal text-sm leading-6	text-justify mb-3"
            >
              <p className="mb-2.5 font-semibold">{list.data}</p>
              <p>{list.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="grow">
        <div className="rounded-lg bg-white p-6 mb-3">
          <h2 className="font-semibold text-base mb-2.5">Risk</h2>
          <ul className="list-disc ms-5">
            {data.risk.map((list: any, key: number) => (
              <li
                key={key}
                className="font-normal text-sm leading-6	text-justify mb-3"
              >
                <p className="mb-2.5 font-semibold">{list.data}</p>
                <p>{list.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-white p-6 mb-3">
          <h2 className="font-semibold text-base mb-2.5">
            Individual Strengths in Support of Transformation
          </h2>
          <ul className="list-disc ms-5">
            {data.strengths_in_support_of_transform.map(
              (list: any, key: number) => (
                <li
                  key={key}
                  className="font-normal text-sm leading-6	text-justify mb-3"
                >
                  <p className="mb-2.5 font-semibold">{list.data}</p>
                  <p>{list.description}</p>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
