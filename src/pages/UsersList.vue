<template>
  <button @click="SavedChanges">Save Changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data(){
    return {
      change:false,
    }
  },
  methods:{
    SavedChanges(){
      this.change =true;
    }
  },
  beforeRouteEnter(to,from,next){
    console.log("In component Enter");
    console.log(to,from);
    next();
  },
  beforeRouteLeave(to,from,next){
    console.log("When Route Leave");
    console.log(to,from);
    if(this.change){
      const msg=confirm('Are you sure want to Leave?')
      next(msg);
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