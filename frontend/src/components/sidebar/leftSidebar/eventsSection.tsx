import React from 'react';

const events = [
  { id: 1, title: "No more terrorism no more cry", day: "10", month: "Jul", going: 17, image: "/images/feed_event1.png" },
  { id: 2, title: "No more terrorism no more cry", day: "10", month: "Jul", going: 17, image: "/images/feed_event1.png" },
];

const EventsSection: React.FC = () => {
  return (
    <div className="_left_inner_area_event _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
      <div className="_left_inner_event_content">
        <h4 className="_left_inner_event_title _title5">Events</h4>
        <span className="_left_inner_event_link cursor">See all</span>
      </div>

      {events.map((event) => (
        <div key={event.id} className="_left_inner_event_card_link cursor">
          <div className="_left_inner_event_card">
            <div className="_left_inner_event_card_iamge">
              <img src={event.image} alt="Event" className="_card_img" />
            </div>
            <div className="_left_inner_event_card_content">
              <div className="_left_inner_card_date">
                <p className="_left_inner_card_date_para">{event.day}</p>
                <p className="_left_inner_card_date_para1">{event.month}</p>
              </div>
              <div className="_left_inner_card_txt">
                <h4 className="_left_inner_event_card_title">{event.title}</h4>
              </div>
            </div>
            <hr className="_underline" />
            <div className="_left_inner_event_bottom">
              <p className="_left_iner_event_bottom">{event.going} People Going</p>
              <a href="#0" className="_left_iner_event_bottom_link">Going</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsSection;