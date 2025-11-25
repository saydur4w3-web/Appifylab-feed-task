import { FC } from 'react';
import { ExploreMenu } from './exploreMenu';
import { SuggestedPeople } from './suggestedPeople';
import EventsSection from './eventsSection';

export const LeftSidebar: FC = () => {
  return (
    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
      <div className="_layout_left_sidebar_wrap">
        <div className="_layout_left_sidebar_inner">
          <ExploreMenu />
        </div>
        <div className="_layout_left_sidebar_inner">
          <SuggestedPeople />
        </div>
        <div className="_layout_left_sidebar_inner">
          <EventsSection />
        </div>
      </div>
    </div>
  );
};