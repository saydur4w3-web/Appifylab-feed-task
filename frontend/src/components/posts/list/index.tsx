import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { usePostGetAll } from "../../../hooks/reactQuery/posts";
import { PostSingle } from "../singleItem";
import { ty_post_item } from "../../../types/post.type";

interface IComp {
  cursor: string | null;
  setCursor: Dispatch<SetStateAction<string | null>>;
}

export const PostList: FC<IComp> = ({ cursor, setCursor }) => {
  // const [allPosts, setAllPosts] = useState<ty_post_item[]>([]);

  const { status, data, isFetching } = usePostGetAll(cursor);

  const [modalData, setModalData] = useState<ty_post_item | null>(null);

  // useEffect(() => {
  //   if (data?.posts) {
  //     setAllPosts((prev) => [...prev, ...data.posts]);
  //   }
  // }, [data]);

  const loadMore = () => {
    if (
      data?.pagination?.hasMore &&
      data.pagination &&
      data.pagination.nextCursor
    ) {
      setCursor(data.pagination.nextCursor);
    }
  };

  if (status === "pending" || !data) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        {data.posts.map((el) => (
          <div key={el.id}>
            <PostSingle
              postData={el}
              setModalData={setModalData}
              cursor={cursor}
            />
          </div>
        ))}
      </div>

      {/* Load More button */}
      {data?.pagination?.hasMore && (
        <div className="text-center mt-3">
          <button
            className="btn btn-primary"
            onClick={loadMore}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* Modal */}
      {modalData && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          onClick={() => setModalData(null)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <PostSingle
                postData={modalData}
                setModalData={setModalData}
                isDetail={true}
                cursor={cursor}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
