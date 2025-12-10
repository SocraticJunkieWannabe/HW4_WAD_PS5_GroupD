<template>

</template>

<script>
// @ is an alias to /src
import PostsCompo from "@/components/NewPost.vue"

export default {
  name: 'NewPostView',
  components: {
    NewPost
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
        this.$router.push('/post')
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
