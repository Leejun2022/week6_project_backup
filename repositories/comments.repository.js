const { Comments } = require("../models");

class CommentRepository {
  findAllComment = async (postId) => {
    const comments = await Comments.findAll(
      { where: { postId } },
      { order: [["createdAt", "DESC"]] }
    );
    //
    return comments;
  };

  findOneComment = async (commentId) => {
    const comments = await Comments.findByPk(commentId);
    return comments;
  };

  createComment = async (postId, comment, username) => {
    const createCommentData = await Comments.create({
      postId,
      comment,
      username,
    });

    return createCommentData;
  };

  updateComment = async (commentId, comment, username) => {
    const updateCommentData = await Comments.update(
      { comment: comment },
      { where: { commentId, username } }
    );
    return updateCommentData;
  };

  deleteComment = async (commentId, username) => {
    const deleteCommentData = await Comments.destroy({
      where: { commentId, username },
    });
    return deleteCommentData;
  };
}

module.exports = CommentRepository;
