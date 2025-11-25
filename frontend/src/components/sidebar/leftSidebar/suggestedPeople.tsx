// src/components/LeftSidebar/SuggestedPeople.tsx
import React from 'react';

export interface SuggestedPerson {
  name: string;
  title: string;
  image: string;
  profileUrl: string;
}

export interface EventItem {
  id: number;
  title: string;
  date: string;
  month: string;
  goingCount: number;
  image: string;
}

const people: SuggestedPerson[] = [
  { name: "Steve Jobs", title: "CEO of Apple", image: "/images/people1.png", profileUrl: "profile.html" },
  { name: "Ryan Roslansky", title: "CEO of Linkedin", image: "/images/people2.png", profileUrl: "profile.html" },
  { name: "Dylan Field", title: "CEO of Figma", image: "/images/people3.png", profileUrl: "profile.html" },
];

export const SuggestedPeople: React.FC = () => {
  return (
    <div className="_left_inner_area_suggest _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
      <div className="_left_inner_area_suggest_content _mar_b24">
        <h4 className="_left_inner_area_suggest_content_title _title5">Suggested People</h4>
        <span className="_left_inner_area_suggest_content_txt">
          <span className="_left_inner_area_suggest_content_txt_link cursor">See All</span>
        </span>
      </div>

      {people.map((person) => (
        <div key={person.name} className="_left_inner_area_suggest_info">
          <div className="_left_inner_area_suggest_info_box">
            <div className="_left_inner_area_suggest_info_image">
              <span className='cursor'>
                <img src={person.image} alt={person.name} className={person.image.includes('people1') ? '_info_img' : '_info_img1'} />
              </span>
            </div>
            <div className="_left_inner_area_suggest_info_txt">
              <span className='cursor'>
                <h4 className="_left_inner_area_suggest_info_title">{person.name}</h4>
              </span>
              <p className="_left_inner_area_suggest_info_para">{person.title}</p>
            </div>
          </div>
          <div className="_left_inner_area_suggest_info_link">
            <span className="_info_link cursor">Connect</span>
          </div>
        </div>
      ))}
    </div>
  );
};