import ListRestaurants from '../view/pages/list-restaurants';
import Detail from '../view/pages/detail';
import Favorite from '../view/pages/favorite';

const routes = {
  '/': ListRestaurants,
  '/list-restaurant': ListRestaurants,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;