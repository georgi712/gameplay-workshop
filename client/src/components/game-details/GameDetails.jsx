import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import CommentsShow from "../comments-show/CommentsShow.jsx";
import CommentsCreate from "../comments-create/CommentsCreate.jsx";
import commentService from "../../services/commentService.js";
import { useDeleteGame, useGame } from "../../api/gameApi.js";

export default function GameDetails() {
  const navigate = useNavigate();
  const { email } = useState();
  const [comments, setComments] = useState([]);
  const { gameId } = useParams();
  const { game } = useGame(gameId);
  const { deleteGame } = useDeleteGame()

  useEffect(() => {
    commentService.getAll(gameId)
      .then(setComments);
  }, [gameId]);

  const gameDeleteClickHandler = async () => {
    const hasConfirmed = confirm(
      `Are you sure you want to delete ${game.title} game?`
    );

    if (!hasConfirmed) {
      return;
    }

    await deleteGame(game._id);

    navigate("/games");
  };

  const commentCreateHandler = (newComment) => {
    setComments(state => [...state, newComment])
  };

  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">
        <div className="game-header">
          <img className="game-img" src={game.imageUrl} />
          <h1>{game.title}</h1>
          <span className="levels">MaxLevel: {game.maxLevel}</span>
          <p className="type">{game.category}</p>
        </div>

        <p className="text">{game.summary}</p>

        {/* Bonus ( for Guests and Users ) */}

        <CommentsShow comments={comments} />

        {/* Edit/Delete buttons ( Only for creator of this game )  */}
        <div className="buttons">
          <Link to={`/games/${gameId}/edit`} className="button">
            Edit
          </Link>
          <button onClick={gameDeleteClickHandler} className="button">
            Delete
          </button>
        </div>
      </div>

      {/* Bonus */}
      {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}

      <CommentsCreate 
        email={email} 
        gameId={gameId} 
        onCreate={commentCreateHandler}
      />
    </section>
  );
}
