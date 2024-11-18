import ListRestaurants from '../view/pages/list-restaurants';
import Detail from '../view/pages/detail';

const routes = {
  '/': ListRestaurants,
  '/list-restaurant': ListRestaurants,
  '/detail/:id': Detail,
};

export default routes;