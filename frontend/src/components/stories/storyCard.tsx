import { FC } from 'react';
import { ty_story_item } from '../../types/story.type';


export const StoryCard: FC<ty_story_item> = ({ name, avatar, storyImage, isYourStory = false }) => {
  return (
    <div className={isYourStory ? "_feed_inner_profile_story _b_radious6" : "_feed_inner_public_story _b_radious6"}>
      <div className="_feed_inner_public_story_image">
        <img src={storyImage} alt={name} className={isYourStory ? "_profile_story_img" : "_public_story_img"} />
        
        {isYourStory ? (
          <div className="_feed_inner_story_txt">
            <div className="_feed_inner_story_btn">
              <button className="_feed_inner_story_btn_link">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                  <path stroke="#fff" strokeLinecap="round" d="M.5 4.884h9M4.884 9.5v-9" />
                </svg>
              </button>
            </div>
            <p className="_feed_inner_story_para">Your Story</p>
          </div>
        ) : (
          <>
            <div className="_feed_inner_pulic_story_txt">
              <p className="_feed_inner_pulic_story_para">{name}</p>
            </div>
            <div className="_feed_inner_public_mini">
              <img src={avatar} alt={name} className="_public_mini_img" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};