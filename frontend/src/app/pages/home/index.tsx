import { useState } from "react";
import { CreatePost } from "../../../components/posts/create";
import { PostList } from "../../../components/posts/list";
import { LeftSidebar } from "../../../components/sidebar/leftSidebar";
import { RightSidebar } from "../../../components/sidebar/rightSidebar";
import { Stories } from "../../../components/stories";

export const HomePage = () => {

  const [postCursor, setCPostCursor] = useState<string | null>(null);

  return (
    <div className="_layout_inner_wrap">
      <div className="row">
        <LeftSidebar />

        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <div className="_layout_middle_wrap">
            <div className="_layout_middle_inner">

              <Stories />

              <CreatePost cursor={postCursor} />

              <PostList cursor={postCursor} setCursor={setCPostCursor} />

            </div>
          </div>
        </div>

        <RightSidebar />
      </div>
    </div>
  );
};
