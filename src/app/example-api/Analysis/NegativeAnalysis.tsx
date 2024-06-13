import React from "react";

const data = {
  impact_negative: [
    {
      data: "Non Future-Proof Education",
      description:
        "Students at the end of the school are not ready for a future in a rapidly changing environment (AI, geopolitical impacts on the raw materials market)",
    },
    {
      data: "Non Future-Proof Jobs",
      description:
        "Students are formed to pursue jobs (e.g. furniture makers, interior consultants) for which demand will decrease with the progressive materials scarcity and the advent of disruptive technologies",
    },
    {
      data: "Dis-Alignment from Industry’s Future Requirements ",
      description:
        "Requirements the lack of vision and of a future perspective maintains the disconnect from climate change and its impacts on building, manufacturing, and materials",
    },
    {
      data: "Endless Procedures",
      description:
        "The gap of a vision for the long term and of the courage to be disruptive may be replaced by endless coordination procedure sat the micro level in which the organization gets stuck",
    },
    {
      data: "Lack of Initiative",
      description:
        "Lack of vision and courage affect negatively the sense of movement and action within the organization, leading to stagnation.. too often initiatives are confronted with cinism.",
    },
  ],
  opportunities: [
    {
      data: "The Future of Learning and Work",
      description:
        "With courage and critical thinking we could embrace our desire to express more freedom and openness in envisioning the future of learning and work",
    },
    {
      data: "A Stronger Curriculum",
      description:
        "Vision and courage, critical thinking, are the best skills to equip our students with: it creates hope, the capacity to solve difficult problems, get involved with the world, and to innovate.",
    },
    {
      data: "Good Jobs",
      description:
        "Rather than jobs which will soon be obsolete, we can focus on training our students in becoming circular consultants, for interiors and constructions a like, or perfecting an original trade with unique skills.",
    },
  ],
  ideas: [
    {
      data: "Whole School Approach",
      description: [
        "Embracing sustainability and circularity, across the curriculum, the school recruitment campaigns, the teachers training, the external and internal communication, the materials adopted, including the providers",
        "Adopt future oriented tools, resources and methodologies, from AI to bio-materials, and more personal and individual assessment criteria",
        "Encourage a broader base for research, allocating time to dedicate consistently to envisioning, deep thinking, complexity and long term planning.",
      ],
    },
  ],
};

export default function NegativeAnalysis() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg grow bg-white p-6 mb-3">
        <h2 className="font-semibold text-base mb-2.5">Impact Negative</h2>
        <ul className="list-disc ms-5">
          {data.impact_negative.map((list: any, key: number) => (
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
          <h2 className="font-semibold text-base mb-2.5">Opportunities</h2>
          <ul className="list-disc ms-5">
            {data.opportunities.map((list: any, key: number) => (
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
            {data.ideas.map((list: any, key: number) => (
              <li
                key={key}
                className="font-normal text-sm leading-6	text-justify mb-3"
              >
                <p className="mb-2.5 font-semibold">{list.data}</p>
                <p>
                  {typeof list.description === "string" ? (
                    list.description
                  ) : (
                    <ol className="list-decimal ms-4">
                      {list.description.map(
                        (description: string, index: number) => (
                          <li
                            key={index}
                            className="font-normal text-sm leading-6	text-justify mb-3"
                          >
                            {description}
                          </li>
                        )
                      )}
                    </ol>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
