const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  commentRepository = new CommentRepository();

  findAllComment = async (postId) => {
    const allComment = await this.commentRepository.findAllComment(postId);
    return allComment;
  };

  createComment = async (postId, commentId, username) => {
    const createCommentData = await this.commentRepository.createComment(
      postId,
      commentId,
      username
    );
    return {
      comment: createCommentData.comment,
      username: createCommentData.username,
      createdAt: createCommentData.createdAt,
    };
  };

  updateComment = async (commentId, username) => {
    const updateCommentData = await this.commentRepository.updateComment(
      commentId,
      username
    );
    return updateCommentData;
  };

  deleteComment = async (commentId, username) => {
    const deleteCommentData = await this.commentRepository.deleteComment(
      commentId,
      username
    );
    return deleteCommentData;
  };
}

module.exports = CommentService;
