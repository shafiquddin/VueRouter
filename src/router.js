import { createRouter, createWebHistory } from "vue-router";
import TeamList from "./components/teams/TeamsList.vue";
import UsersList from "./components/users/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import TeamFooter from "./components/teams/TeamsFooter.vue";
import UsersFooter from "./components/users/UsersFooter.vue";
import NotFound from "./components/nav/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/teams" },
    {
      name: "teams",
      path: "/teams",
      components: { default: TeamList, footer: TeamFooter },
      children: [
        {
          name: "teams-members",
          path: ":teamId",
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      name: "users",
      path: "/users",
      components: { default: UsersList, footer: UsersFooter },
      beforeEnter(to,from,next){
        console.log('user route');
        console.log(to,from);
        next();
      },
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach')
  console.log(to, from);
  // if(to.name==='teams-members'){
  //   next();
  // }else{
  //   next({name:'teams-members', params:{teamId:'t2'}});
  // }
  next();
});

router.afterEach(function(to,from){
  console.log('Global afterEach');
  console.log(to,from);
})

export default router;
