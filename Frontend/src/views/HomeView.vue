<template>
  <posts-compo ref = "childComp"></posts-compo>
  <div class="post-actions">
    <button class="addPost" v-on:click="AddPost"> Add Post </button>
    <button class="deleteAllButton" v-on:click="DeleteAll"> Delete All </button>
  </div>
</template>

<script>
// @ is an alias to /src
import PostsCompo from "@/components/Posts.vue"

export default {
  name: 'HomeView',
  components: {
    PostsCompo
  },

  methods: {
    DeleteAll: function() {
        fetch('http://localhost:3000/posts/deleteAll', {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
          this.$refs.childComp.postList();
        })  
    },
    AddPost: function() {
        this.$router.push('/NewPost')
    },
    Logout: function(){

    }
  }

}
</script>

<style scoped>
button {
  margin-top: 75px;
  border-radius: 30px;
  width: fit-content;
  padding: 10px 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.post-actions 
{
  display: flex;
  justify-content: space-between;
}
</style>
