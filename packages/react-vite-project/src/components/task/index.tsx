import { useReducer, useState } from 'react';
import { taskReducer, RouteType } from './hooks';

let id = 4;
const initRoute: RouteType[] = [
  {
    id: 1,
    name: '参观卡夫卡博物馆',
    done: true
  },
  {
    id: 2,
    name: '看木偶戏',
    done: false
  },
  {
    id: 3,
    name: '打卡列侬墙',
    done: false
  }
];

export default function TaskManager() {
  const [routes, dispatch] = useReducer(taskReducer, initRoute);
  const [editIndex, setEditIndex] = useState(-1);
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');

  function onAddTask() {
    const newObj = { id: id++, name: text, done: false };
    dispatch({ type: 'add', ...newObj });
    setText('');
  }

  function onDeleteTask(id: number) {
    dispatch({ type: 'delete', id });
  }

  function onEdit({ name, id }: { name: string; id: number }) {
    setEditIndex(id);
    setEditText(name);
  }

  function onEditTask(item: RouteType) {
    dispatch({ type: 'edit', id: item.id, name: editText, done: item.done });
    setEditIndex(-1);
  }

  function changeCheckStatus(item: RouteType) {
    dispatch({ type: 'edit', ...item });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <div>
        <input
          type="text"
          placeholder="添加任务"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={onAddTask}>添加</button>
      </div>
      <ul>
        {routes.map((item: RouteType) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={(e) =>
                changeCheckStatus({
                  done: e.target.checked,
                  id: item.id,
                  name: item.name
                })
              }
            />

            {editIndex === item.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => onEditTask(item)}>确认</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => onEdit(item)}>编辑</button>
              </>
            )}
            <button onClick={() => onDeleteTask(item.id)}>删除</button>
          </li>
        ))}
      </ul>
    </>
  );
}
