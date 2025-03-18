import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import gameService from "../../services/gameService.js";
import CommentsShow from "../comments-show/CommentsShow.jsx";
import CommentsCreate from "../comments-create/CommentsCreate.jsx";
import commentService from "../../services/commentService.js";
import { UserContext } from "../../contexts/UserContext.js";
import { useGame } from "../../api/gameApi.js";

export default function GameDetails() {
  const { email } = useContext(UserContext)
  const [comments, setComments] = useState([]);
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { game } = useGame(gameId);

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

    await gameService.delete(game._id);

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
