import { useResize } from '../../Hooks/useResize';
import Header from '../Header/Header';
import TaskForm from '../TaskForm/TraskForm';
import Task from './Task/Task';
import './Tasks.styles.css';

const Tasks = () => {
  const { isPhone } = useResize();

  const renderAllCards = () => {};
  return (
    <>
      <Header />
      <main>
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          {isPhone ? (
            <div className="list phone">{renderAllCards()}</div>
          ) : (
            <div className="list_group">
              <div className="list desk">
                <div className="list ">
                  <Task
                    description={
                      'asdAasd ASdasasdASd as asdASdasasdASdas a sdASdasasd  ASdasasd  A Sdas asdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasSdasasdAasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasSdasasdAasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasSdas'
                    }
                  />
                  <Task description={'asdASdas'} />
                  <Task description={'asdASdas'} />
                  <Task
                    description={
                      'asdAasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasSdas'
                    }
                  />
                  <Task description={'asdASdas'} />
                  <Task description={'asdASdas'} />
                  <Task description={'asdASdas'} />
                  <Task description={'asdASdas'} />
                </div>
              </div>
              <div className="list desk">
                <div className="list ">
                  <Task
                    description={
                      'asdAasd ASdasasdASd as asdASdasasdASdas a sdASdasasd  ASdasasd  A Sdas asdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasSdasasdAasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasSdasasdAasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasSdas'
                    }
                  />
                  <Task description={'asdASdas'} />
                  <Task description={'asdASdas'} />
                  <Task
                    description={
                      'asdAasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasSdas'
                    }
                  />
                  <Task description={'asdASdas'} />
                  <Task description={'asdASdas'} />
                  <Task description={'asdASdas'} />
                  <Task description={'asdASdas'} />
                </div>
              </div>
              <div className="list desk">
                <div className="list ">
                  <Task
                    description={
                      'asdAasd ASdasasdASd as asdASdasasdASdas a sdASdasasd  ASdasasd  A Sdas asdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasSdasasdAasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasSdasasdAasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasSdas'
                    }
                  />
                  <Task description={'asdASdas'} />
                  <Task description={'asdASdas'} />
                  <Task
                    description={
                      'asdAasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasasdASdasSdas'
                    }
                  />
                  <Task description={'asdASdas'} />
                  <Task description={'asdASdas'} />
                  <Task description={'asdASdas'} />
                  <Task description={'asdASdas'} />
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Tasks;
