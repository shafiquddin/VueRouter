<template>
  <button @click="SaveChanges">save changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data(){
    return{
      change:false,
    }
  },
  methods:{
    SaveChanges(){
      this.change=true;
    }
  },
  inject: ['users'],
  beforeRouteEnter(to,from,next){
    console.log('In component log');
    console.log(to,from);
    next();
  },
  beforeRouteLeave(to,from,next){
    console.log('Router leaves');
    console.log(to,from);
    if(this.change){
      const propMsg=confirm('Are you sure want leave');
      next(propMsg);
    }else{
    next();
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>