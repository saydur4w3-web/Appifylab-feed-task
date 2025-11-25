import React, { useEffect, useRef, useState } from "react";
import { useGetReactions } from "../../../../hooks/reactQuery/reactions";
import { DEFAULT_IMG_USER } from "../../../../constants/app.constant";
import { ty_posts_api_res } from "../../../../types/post.type";
import { ty_CommentReaction } from "../../../../types/reactions.type";

interface ReactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  type: "post" | "comment";
  reactionSummary: { reaction_id: number; icon: string; count: number }[];
}

export const ReactionModal: React.FC<ReactionModalProps> = ({
  isOpen,
  onClose,
  itemId,
  type,
  reactionSummary,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<number | "all">("all");
  const [page, setPage] = useState(1);
  const [pageTrack, setPageTack] = useState(1);
  const [reactionList, setReactionList] = useState<(ty_posts_api_res | ty_CommentReaction)[]>([])

  // Fetch reaction data
  const { data, isLoading, refetch } = useGetReactions({
    id: itemId,
    type,
    reactionId: activeTab === "all" ? undefined : activeTab,
    page,
  });

  // Close modal on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  const pagination = data?.pagination;


  useEffect(() => {

    if(!data) return;

        const users = data?.reactions
    ? Array.isArray(data.reactions)
      ? data.reactions
      : [data.reactions]
    : [];

    if(page !== pageTrack) {
      setReactionList([...users, ...reactionList]);
      setPageTack(page);
    }
    else {
      setReactionList([...users]);
    }

  }, [data])



  // Reset page when changing tab
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          display: isOpen ? "block" : "none",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 999,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        style={{
          display: isOpen ? "block" : "none",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: isOpen ? "translate(-50%, -50%)" : "translate(-50%, -45%)",
          transition: "all 0.25s ease",
          background: "#fff",
          maxWidth: "450px",
          width: "100%",
          height: "500px",
          borderRadius: "10px",
          overflow: "hidden",
          zIndex: 1000,
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="m-0">Reactions</h5>
          <button className="btn btn-light btn-sm" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Tabs with counts */}
        <div className="px-3 pt-2 border-bottom">
          <div className="d-flex gap-1 flex-wrap">
            <button
              className={`btn btn-sm ${
                activeTab === "all" ? "btn-primary" : "btn-light"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All ({reactionSummary.reduce((a, r) => a + r.count, 0)})
            </button>
            {reactionSummary.map((r) =>
              r.count > 0 ? (
                <button
                  key={r.reaction_id}
                  onClick={() => setActiveTab(r.reaction_id)}
                  className={`btn btn-sm d-flex ${
                    activeTab === r.reaction_id ? "btn-primary" : "btn-light"
                  }`}
                >
                  <img src={r.icon} style={{ width: '20px', height: '20px', marginRight: '4px' }} alt="" /> ({r.count})
                </button>
              ) : null
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ height: "380px", overflowY: "auto", padding: "10px" }}>
          {isLoading ? (
            <p className="text-center mt-4">Loading...</p>
          ) : reactionList.length ? (
            <>
              {reactionList.map((u: any) => (
                <div key={u.user.id} className="d-flex align-items-center mb-3">
                  <img
                    src={u.user.profile_img || DEFAULT_IMG_USER}
                    alt=""
                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  />
                  <div className="mx-2 flex-grow-1">
                    {u.user.first_name} {u.user.last_name}
                  </div>
                  <img
                    alt=""
                    src={
                      reactionSummary.find((r) => r.reaction_id === u.reaction_id)
                        ?.icon
                    }
                    style={{ width: "20px" }}
                  />
                </div>
              ))}

              {/* Pagination */}
              {pagination?.hasMore && (
                <div className="text-center mt-2">
                  <button
                    className="btn btn-sm btn-link"
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-center mt-4">No reactions found</p>
          )}
        </div>
      </div>
    </>
  );
};
