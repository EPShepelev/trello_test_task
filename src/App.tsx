import "./App.css";
import { Board } from "./components/Board/Board";
import { useEffect, useState } from "react";
import { NameCard } from "./components/NameCard/NameCard";
import { v4 as uuidv4 } from "uuid";

function App() {
  const initialState = [
    {
      listTitle: "TODO",
      cards: [],
    },
    {
      listTitle: "In progress",
      cards: [],
    },
    {
      listTitle: "Testing",
      cards: [],
    },
    {
      listTitle: "Done",
      cards: [],
    },
  ];

  const [userName, setUserName] = useState(
    localStorage["userName"]
      ? JSON.parse(localStorage.getItem("userName") || "")
      : ""
  );

  const [columns, setColumns] = useState(
    JSON.parse(localStorage.getItem("columns") || JSON.stringify(initialState))
  );

  useEffect(() => {
    localStorage.setItem("userName", JSON.stringify(userName));
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  const onUserNameAdd = (name: string) => {
    setUserName(name);
  };

  const onColumTitleChange = (index: number, title: string) => {
    const newColumns = [...columns];
    newColumns[index].listTitle = title;
    setColumns(newColumns);
  };

  const addCard = (index: number, title: string, text: string) => {
    const newColumns = [...columns];
    const newCard = {
      id: uuidv4(),
      title: title,
      text: text,
      comments: [],
      author: userName,
    };
    newColumns[index].cards.push(newCard);
    setColumns(newColumns);
  };

  const deleteCard = ( listIndex: number, id: string) => {
    const newColumns = [...columns];
    newColumns[listIndex].cards = newColumns[listIndex].cards.filter(
      (card: any) => card.id !== id
    );
    setColumns(newColumns);
  };

  const editCard = ( listIndex: number, id: string, title: string, text: string) => {
    const newColumns = [...columns];
    const editedCard = newColumns[listIndex].cards.find((card: any) => card.id === id)
    editedCard.title = title
    editedCard.text = text
    setColumns(newColumns)
  };

  const addComment = (listIndex: number, id: string, text: string) => {
    const newColumns = [...columns];
    const newCommnet = {
      commentId: uuidv4(),
      text: text,
      author: userName,
    };
    const editedCard = newColumns[listIndex].cards.find((card: any) => card.id === id)
    editedCard.comments.push(newCommnet)
    setColumns(newColumns)
  };

  const editComment = ( listIndex: number, id: string, commentId: string, text: string) => {
    const newColumns = [...columns];
    const editedCard = newColumns[listIndex].cards.find((card: any) => card.id === id)
    const editedComment = editedCard.comments.find((comment: any) => comment.commentId === commentId)
    editedComment.text = text
    setColumns(newColumns)
  };

  const deleteComment = ( listIndex: number, id: string, commentId: string) => {
    const newColumns = [...columns];
    const editedCard = newColumns[listIndex].cards.find((card: any) => card.id === id)
    const newCommets = editedCard.comments.filter((comment: any) => comment.commentId !== commentId)
    editedCard.comments = newCommets
    setColumns(newColumns)
  };

  return (
    <div className="App">
      <div className="container">
        <h3 className="card-header header">React Trello Test Task</h3>
        {(!userName && <NameCard onUserNameAdd={onUserNameAdd} />) || (
          <Board
            columns={columns}
            onColumTitleChange={onColumTitleChange}
            addCard={addCard}
            deleteCard={deleteCard}
            editCard={editCard}
            addComment={addComment}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        )}
      </div>
    </div>
  );
}

export default App;
