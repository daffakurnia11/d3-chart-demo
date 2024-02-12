import React from "react";

const data = {
  overview:
    "The respondents generally expressed concerns about the organization's culture, particularly in terms of its lack of flexibility and openness to change. They noted that the organization's culture was resistant to change, and that it was difficult to shift key constructs, behaviors, and mental models. Respondents also expressed concerns over a lack of awareness and understanding, a lack of direction, and a lack of interest in long-term action planning. They noted that the organization was not progressing well with its goals and intentions, which could lead to the loss of talented people in critical roles, and ultimately result in the business becoming irrelevant, stagnating, and dying. Respondents also expressed concerns about a focus on the wrong things, which could result in the loss of credibility and trust among clients and employees. Other concerns included reputational and financial risks, the risk of losing valuable employees if they don't feel a sense of belonging, and the risk of everyone being out for their own goals, which makes the team weaker than when they pull together towards one goal that would benefit them all. Respondents also expressed concerns about a lack of creative ideas and team cohesiveness, information hoarding, people being stuck in their ways, and a negative working environment. They noted that if these issues are not addressed, the organization will not retain the best talent, will fall behind competitors, and may ultimately cease to exist.",
  impact: [
    {
      title: "Risks for the Impact on Sustainability",
      lists: [
        "We fail to make the intended positive contribution to people and planet.",
        "We further exacerbate the social, economic, and institutional problems in the world.",
        "The business will not be sustainable.",
        "We will not have time to spend working on greater good initiatives as internal skills gaps become barriers.",
        "We will become more isolated in what we do, leading to a sense of loneliness that can be demotivating.",
      ],
    },
    {
      title: "Risks for the Culture",
      lists: [
        "Loss of talented people in critical roles.",
        "Lack of creative ideas and team cohesiveness.",
        "Information hoarding.",
        "Negative working environment.",
        "Lack of connectedness.",
      ],
    },
    {
      title: "Risks for the Business",
      lists: [
        "Our business will become irrelevant, stagnate, and 'die'.",
        "Focus on the wrong things and loss of credibility and trust of clients and employees.",
        "High turnover.",
        "Disengagement from staff.",
        "Loss of talent.",
      ],
    },
  ],
};

export default function OverviewAnalysis() {
  return (
    <>
      <div className="rounded-lg bg-white p-6 mb-3">
        <h2 className="font-semibold text-base mb-2.5">Overview</h2>
        <p className="font-normal text-sm leading-6	text-justify">
          {data.overview}
        </p>
      </div>
      <div className="rounded-lg bg-white p-6 mb-3">
        <h2 className="font-semibold text-base mb-2.5">
          Impact: The Identified Risk can be categorized as follows
        </h2>
        {data.impact.map((impact: any, key: number) => (
          <div key={key} className="mb-2.5">
            <p className="font-normal text-sm leading-6	text-justify">
              {impact.title}:
            </p>
            <ul className="list-disc ms-5">
              {impact.lists.map((list: string, index: number) => (
                <li
                  key={index}
                  className="font-normal text-sm leading-6	text-justify"
                >
                  {list}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
