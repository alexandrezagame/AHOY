import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../stylesheets/dashboard.css';
import '../stylesheets/index.css';
import Sidebar from '../components/layout/Sidebar';
import MyTeam from '../components/widgets/MyTeam';
import LatestHires from '../components/widgets/LatestHires';
import Fika from '../components/widgets/Fika';
import Pong from '../components/widgets/Pong';
import Faq from '../components/widgets/Faq';
import MyDepartment from '../components/widgets/MyDepartment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Dashboard = ({ auth, profile }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const [cards, setCards] = useState([
    <LatestHires profiles={profile} />,
    <MyTeam profile={profile} />,
    <MyDepartment profile={profile} />,
    <Fika />,
    <Pong />,
    <Faq />,
    <Fika />,
    <Pong />,
    <Faq />,
  ]);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const items = reorder(cards, source.index, destination.index);

    setCards(items);
  }

  const addCard = (card) => {
    setCards((cards) => [...cards, card]);
  };

  const deleteCard = (e) => {
    setCards(cards.filter((card, i) => cards[i] !== cards[e]));
  };

  return (
    <main className="main">
      <button
        style={{
          backgroundColor: 'green',
          color: 'white',
          fontSize: '20px',
        }}
        onClick={() => addCard(<Faq />)}
      >
        FAQ
      </button>
      <button
        style={{ backgroundColor: 'blue', color: 'white', fontSize: '20px' }}
        onClick={() => addCard(<Pong />)}
      >
        PONG
      </button>
      <button
        style={{ backgroundColor: 'orange', color: 'white', fontSize: '20px' }}
        onClick={() => addCard(<MyTeam profile={profile} />)}
      >
        TEAMS
      </button>
      <button
        style={{ backgroundColor: 'red', color: 'white', fontSize: '20px' }}
        onClick={() => addCard(<MyDepartment profile={profile} />)}
      >
        DEPARTMENT
      </button>
      <button
        style={{ backgroundColor: 'purple', color: 'white', fontSize: '20px' }}
        onClick={() => addCard(<Fika />)}
      >
        VIRTUAL FIKA
      </button>
      <button
        style={{ backgroundColor: 'green', color: 'white', fontSize: '20px' }}
        onClick={() => addCard(<LatestHires profiles={profile} />)}
      >
        LATEST HIRES
      </button>
      <section className="sidebar-layout">
        <Sidebar
          width={200}
          auth={auth}
          profile={profile}
          setSidebarIsOpen={setSidebarIsOpen}
        />
      </section>

      <DragDropContext onDragEnd={onDragEnd}>
        <section
          className={`dashboard-layout
            ${sidebarIsOpen ? 'dashboard-sidebar' : 'dashboard-fullscreen'}
          `}
        >
          {cards.map((content, index) => (
            <Droppable droppableId={`drop-zone-${index}`} key={index}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Draggable draggableId={`${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                      >
                        {content}
                        <button
                          style={{ backgroundColor: 'red', color: 'white' }}
                          onClick={(e) => {
                            deleteCard(
                              e.target.parentElement.dataset.rbdDraggableId
                            );
                          }}
                        >
                          DELETE
                        </button>
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </section>
      </DragDropContext>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Dashboard);
