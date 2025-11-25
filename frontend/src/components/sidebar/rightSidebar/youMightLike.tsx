import { FC } from 'react';

interface SuggestedUser {
  id: string;
  name: string;
  title: string;
  image: string;
  profileUrl: string;
}

const suggestedUsers: SuggestedUser[] = [
  {
    id: 'radovan',
    name: 'Radovan SkillArena',
    title: 'Founder & CEO at Trophy',
    image: '/images/Avatar.png',
    profileUrl: 'profile.html'
  }
];

export const YouMightLike: FC = () => {
  return (
    <div className="_right_inner_area_info _padd_t24 _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
      <div className="_right_inner_area_info_content _mar_b24">
        <h4 className="_right_inner_area_info_content_title _title5">You Might Like</h4>
        <span className="_right_inner_area_info_content_txt">
          <span className="_right_inner_area_info_content_txt_link cursor">See All</span>
        </span>
      </div>
      <hr className="_underline" />

      {suggestedUsers.map((user) => (
        <div key={user.id} className="_right_inner_area_info_ppl">
          <div className="_right_inner_area_info_box">
            <div className="_right_inner_area_info_box_image">
              <span className='cursor' >
                <img src={user.image} alt={user.name} className="_ppl_img" />
              </span>
            </div>
            <div className="_right_inner_area_info_box_txt">
              <span className='cursor' >
                <h4 className="_right_inner_area_info_box_title">{user.name}</h4>
              </span>
              <p className="_right_inner_area_info_box_para">{user.title}</p>
            </div>
          </div>
          <div className="_right_info_btn_grp">
            <button type="button" className="_right_info_btn_link">Ignore</button>
            <button type="button" className="_right_info_btn_link _right_info_btn_link_active">
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};