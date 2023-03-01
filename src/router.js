import { createRouter, createWebHistory } from "vue-router";
import TeamList from "./pages/TeamsList.vue";
import UsersList from "./pages/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import TeamFooter from "./pages/TeamsFooter.vue";
import UsersFooter from "./pages/UsersFooter.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/teams" },
    {
      name: "teams",
      path: "/teams",
      meta:{
        needsAuth:true
      },
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
        console.log('In Route Declartion');
        console.log(to,from);
        next();
      }
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
  linkActiveClass: "active",
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach(function (to, from, next) {
  console.log("Global navigation");
  console.log(to, from);
  // if(to.meta.needsAuth){
  //   console.log('needs meta data');
  //   next();
  // }else{
  //   next();
  // }
  next();
});

router.afterEach(function(to,from){
  console.log('Global Navigation');
  console.log(to,from);
})

export default router;
