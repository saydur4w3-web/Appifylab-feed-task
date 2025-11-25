import React from 'react';
import { storyList } from './storyList';

export const MobileStories: React.FC = () => {
  return (
    <div className="_feed_inner_ppl_card_mobile _mar_b16">
      <div className="_feed_inner_ppl_card_area">
        <ul className="_feed_inner_ppl_card_area_list">
          {/* Your Story */}
          <li className="_feed_inner_ppl_card_area_item">
            <a href="#0" className="_feed_inner_ppl_card_area_link">
              <div className="_feed_inner_ppl_card_area_story">
                <img src="/images/mobile_story_img.png" alt="Your Story" className="_card_story_img" />
                <div className="_feed_inner_ppl_btn">
                  <button className="_feed_inner_ppl_btn_link" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
                      <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="_feed_inner_ppl_card_area_link_txt">Your Story</p>
            </a>
          </li>

          {/* Other Stories (loop) */}
          {storyList.slice(1).map((story, idx) => (
            <li key={story.id} className="_feed_inner_ppl_card_area_item">
              <a href="#0" className="_feed_inner_ppl_card_area_link">
                <div className={idx % 2 === 0 ? "_feed_inner_ppl_card_area_story_active" : "_feed_inner_ppl_card_area_story_inactive"}>
                  <img
                    // src={idx % 2 === 0 ? "/images/mobile_story_img1.png" : "/images/mobile_story_img2.png"}
                    src={story.storyImageSm}
                    alt={story.name}
                    className="_card_story_img1"
                  />
                </div>
                <p className="_feed_inner_ppl_card_area_txt">{story.name.split(" ")[0]}...</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};