import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MidArea from './components/MidArea';
import PreviewArea from './components/PreviewArea';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_LIST } from './redux/midarea/listSlicer';

function App() {
  const complist = useSelector((rootReducer) => rootReducer?.list);
  const AllReducer = useSelector((rootReducer) => rootReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(AllReducer);
  }, []);

  // Update Lists of Mid Area
  const onDragEnd = (result) => {
    let element = result.draggableId.split('-')[0];

    let old_list = complist?.midAreaLists;
    let source_index = old_list?.findIndex((x) => x.id === result.source.droppableId);
    if (source_index > -1) {
      let comp_list = old_list[source_index].comps;
      let data = [];
      data = data.concat(comp_list);
      data.splice(result.source.index, 1);
      let updatedData = [{ ...old_list[source_index], comps: data }];
      dispatch(ADD_LIST(updatedData));
    }

    let dest_index = old_list?.findIndex((x) => x.id === result.destination.droppableId);

    if (dest_index > -1) {
      let dest_comp_list = old_list[dest_index].comps;
      let data = [];
      data = data.concat(dest_comp_list);
      data.push({
        type: `${element}`,
        value: 0,
      });
      let updatedData = [{ ...old_list[dest_index], comps: data }];
      dispatch(ADD_LIST(updatedData));
    }
  };
  return (
    <div className='h-screen overflow-hidden flex flex-row pt-6'>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2'>
          <Sidebar />

          <MidArea />
        </div>
        <div className='w-1/3 relative h-screen overflow-scroll flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2'>
          <PreviewArea />
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
