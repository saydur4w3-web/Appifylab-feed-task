import { FC } from "react";
import { ty_post_item } from "../../../../types/post.type";
import { SERVER_STATIC_URL, SERVER_URL } from "../../../../constants/app.constant";


interface IComp {
  post: ty_post_item;
}


export const PostContent: FC<IComp> = ({ post }) => {
  return (
    <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
      {/* Post text/title */}

      <div style={{margin: '10px 0'}} >
              <div 
      dangerouslySetInnerHTML={{ __html: post.content }}
      className="_feed_inner_timeline_post_title"
    />
      </div>


      {/* Post image */}
      {
        post.image_url && (

      <div className="_feed_inner_timeline_image">
        <img
          src={`${SERVER_STATIC_URL}${post.image_url}`}
          alt="Healthy Tracking App"
          className="_time_img"
        />
      </div>
        )
      }
    </div>
  );
};