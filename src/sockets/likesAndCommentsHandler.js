const { ItemRepository } = require("../repositories");
const checkItem = require("../helpers/checkItem");

module.exports = function (socket, webSocketServer) {
  const join = async (itemId) => {
    try {
      await checkItem(itemId);
      socket.join(itemId);
    } catch (error) {
      socket.emit("take-error", error.message);
    }
  };
  const addComment = async (comment, itemId) => {
    try {
      await checkItem(itemId);
      const item = await ItemRepository.getItem(itemId);

      const comments = JSON.parse(item.dataValues.comments);
      const updatedComments = [...comments, comment];
      await ItemRepository.addComment(updatedComments, itemId);
      webSocketServer.in(itemId).emit("update-comments", updatedComments);
    } catch (error) {
      socket.emit("take-error", error.message);
    }
  };
  const like = async (userId, itemId) => {
    try {
      await checkItem(itemId);
      const item = await ItemRepository.getItem(itemId);
      const likes = item.dataValues.likes;
      const indexOfLike = likes.findIndex((like) => like === userId);

      if (indexOfLike >= 0) {
        likes.splice(indexOfLike, 1);
      } else {
        likes.push(userId);
      }
      await ItemRepository.updateLikes(likes, itemId);
      webSocketServer.in(itemId).emit("update-likes", likes);
    } catch (error) {
      socket.emit("take-error", error.message);
    }
  };

  socket.on("join-item", join);
  socket.on("add-comment", addComment);
  socket.on("like", like);
};
