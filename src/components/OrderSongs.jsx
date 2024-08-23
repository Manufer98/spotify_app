/* eslint-disable no-unused-vars */
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Link, useNavigate } from "react-router-dom";
import {
  ReorderTop5Redux,
  changeStatus,
  AddTop5sRedux,
} from "../redux/top5Sclice";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatusSongs from "./StatusSongs";

const OrderSongs = () => {
  const currArtist = useSelector((state) => state.top5.currentArtist);
  const dispatch = useDispatch();
  const top5 = useSelector((state) => state.top5.top5);
  const navigate = useNavigate();
  console.log(currArtist);

  const SaveTop5 = () => {
    const id = currArtist.id;
    const url = currArtist.url;
    const name = currArtist.name;

    const top54 = {
      id,
      url,
      name,
      top5,
    };
    console.log(top54);

    dispatch(AddTop5sRedux({ id, url, name }));
    navigate("/");
  };

  const Plus = (i) => {
    if (i !== 0) {
      const srcI = i - 1;
      const desI = i;

      dispatch(ReorderTop5Redux({ srcI, desI }));
    }
  };

  const Minus = (i) => {
    if (i !== 4) {
      const srcI = i + 1;
      const desI = i;

      dispatch(ReorderTop5Redux({ srcI, desI }));
    }
  };
  return (
    <div className="order_container">
      <StatusSongs />
      <h3>Order your top</h3>
      <button>
        {" "}
        <Link
          className="link"
          onClick={() => dispatch(changeStatus(1))}
          to={"/Artist/" + currArtist.id}
        >
          Back
        </Link>{" "}
      </button>
      <button onClick={SaveTop5}> Save </button>
      <div
        className="order_picture"
        style={{ backgroundImage: `url(${currArtist.url})` }}
      ></div>

      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;

          dispatch(ReorderTop5Redux({ desI, srcI }));
        }}
      >
        <div>
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div
                className="order_songs"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {top5.map((item, i) => (
                  <Draggable
                    key={item.songId}
                    draggableId={"draggable-" + item.songId}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <div
                        className="order_song"
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          boxShadow: snapshot.isDragging
                            ? "0 0 .4rem #666"
                            : "none",
                        }}
                      >
                        <div className="order_test">
                          <DehazeIcon className="order_icon" />

                          <span>
                            {i + 1} - {item.name}
                          </span>
                        </div>
                        <div className="order_buttons">
                          <button onClick={() => Plus(i)}>
                            <ExpandLessIcon className="order_button" />
                          </button>
                          <button onClick={() => Minus(i)}>
                            <ExpandMoreIcon className="order_button" />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default OrderSongs;
