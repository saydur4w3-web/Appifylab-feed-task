import { FC } from "react";

interface Friend {
  id: string;
  name: string;
  title: string;
  image: string;
  profileUrl: string;
  isOnline: boolean;
  lastSeen?: string;
}

const friends: Friend[] = [
  {
    id: "1",
    name: "Steve Jobs",
    title: "CEO of Apple",
    image: "/images/people1.png",
    profileUrl: "profile.html",
    isOnline: false,
    lastSeen: "5 minute ago",
  },
  {
    id: "2",
    name: "Ryan Roslansky",
    title: "CEO of Linkedin",
    image: "/images/people2.png",
    profileUrl: "profile.html",
    isOnline: true,
  },
  {
    id: "3",
    name: "Dylan Field",
    title: "CEO of Figma",
    image: "/images/people3.png",
    profileUrl: "profile.html",
    isOnline: true,
  },
  {
    id: "4",
    name: "Steve Jobs",
    title: "CEO of Apple",
    image: "/images/people1.png",
    profileUrl: "profile.html",
    isOnline: false,
    lastSeen: "5 minute ago",
  },
  {
    id: "5",
    name: "Ryan Roslansky",
    title: "CEO of Linkedin",
    image: "/images/people2.png",
    profileUrl: "profile.html",
    isOnline: true,
  },
  {
    id: "6",
    name: "Dylan Field",
    title: "CEO of Figma",
    image: "/images/people3.png",
    profileUrl: "profile.html",
    isOnline: true,
  },
  {
    id: "7",
    name: "Dylan Field",
    title: "CEO of Figma",
    image: "/images/people3.png",
    profileUrl: "profile.html",
    isOnline: true,
  },
  {
    id: "8",
    name: "Steve Jobs",
    title: "CEO of Apple",
    image: "/images/people1.png",
    profileUrl: "profile.html",
    isOnline: false,
    lastSeen: "5 minute ago",
  },
];

const OnlineIndicator = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
  >
    <rect
      width="12"
      height="12"
      x="1"
      y="1"
      fill="#0ACF83"
      stroke="#fff"
      strokeWidth="2"
      rx="6"
    />
  </svg>
);

export const FriendsList: FC = () => {
  return (
    <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
      <div className="_feed_top_fixed">
        <div className="_feed_right_inner_area_card_content _mar_b24">
          <h4 className="_feed_right_inner_area_card_content_title _title5">
            Your Friends
          </h4>
          <span className="_feed_right_inner_area_card_content_txt">
            <span
              className="_feed_right_inner_area_card_content_txt_link cursor"
            >
              See All
            </span>
          </span>
        </div>

        <form className="_feed_right_inner_area_card_form">
          <svg
            className="_feed_right_inner_area_card_form_svg"
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            fill="none"
            viewBox="0 0 17 17"
          >
            <circle cx="7" cy="7" r="6" stroke="#666" />
            <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
          </svg>
          <input
            className="form-control me-2 _feed_right_inner_area_card_form_inpt"
            type="search"
            placeholder="input search text"
            aria-label="Search"
          />
        </form>
      </div>

      <div className="_feed_bottom_fixed">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className={`_feed_right_inner_area_card_ppl ${
              !friend.isOnline ? "_feed_right_inner_area_card_ppl_inactive" : ""
            }`}
          >
            <div className="_feed_right_inner_area_card_ppl_box">
              <div className="_feed_right_inner_area_card_ppl_image">
                <span className="cursor" >
                  <img
                    src={friend.image}
                    alt={friend.name}
                    className="_box_ppl_img"
                  />
                </span>
              </div>
              <div className="_feed_right_inner_area_card_ppl_txt">
                <span className="cursor" >
                  <h4 className="_feed_right_inner_area_card_ppl_title">
                    {friend.name}
                  </h4>
                </span>
                <p className="_feed_right_inner_area_card_ppl_para">
                  {friend.title}
                </p>
              </div>
            </div>

            <div className="_feed_right_inner_area_card_ppl_side">
              {friend.isOnline ? (
                <OnlineIndicator />
              ) : (
                <span>{friend.lastSeen}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
