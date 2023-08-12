export interface RouteType {
  id: number;
  name: string;
  done: boolean;
}

type actionType = Partial<RouteType> & {
  type: 'add' | 'delete' | 'edit';
};

export function taskReducer(
  routes: RouteType[],
  action: actionType
): RouteType[] {
  switch (action.type) {
    case 'add': {
      return [
        ...routes,
        { id: (action.id as number)++, name: action.name, done: false }
      ] as RouteType[];
    }
    case 'delete': {
      return routes.filter((r) => r.id !== action.id);
    }
    case 'edit': {
      return routes.map((item) => {
        if (item.id === action.id) {
          return { ...item, name: action.name, done: action.done };
        } else {
          return item;
        }
      }) as RouteType[];
    }
    default: {
      throw new Error('error');
    }
  }
}
