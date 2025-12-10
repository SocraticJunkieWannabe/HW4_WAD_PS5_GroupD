<template>
    <div class="post-content">
      <h1>Body </h1> 
      <textarea class="post-description" v-model="postBody" style="width: 300px; height: 100px;">{{post.body}}</textarea>
      <div class="buttons">
        <button class="update" v-on:click="UpdatePost">Update Post</button>
        <button class="delete" v-on:click="DeletePost">Delete Post</button>
      </div>
    </div>

</template>

<script>
  export default {
  name: 'PostView',
  methods: {
    async post() {
      const response = await fetch("http://localhost:3000/post/get/${this.postId }");
      const data = await response.json();
          
      this.post = data;
      console.log(data);
    },
    UpdatePost: function() {
        fetch('/post/update/${this.postId }', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: this.postBody
            })
        });
    },
    DeletePost: function() {
        fetch('/post/delete/${this.postId }', {
            method: "DELETE"
        });
    }, 
    mounted() {
      this.postId = this.$route.params.id
      console.log(this.postId)
      this.post();  // fetch posts when component mounts
    },
    data() {
      return {
        post: {},
        postId,
        postBody
      };
    }
  }

}
    
</script>

<style scoped>
.post-content {
    display: flex;              /* enable flexbox */
    flex-direction: column;    /* center horizontally */
    align-items: center;        /* center vertically */
}
.buttons {
  display: flex;  
  justify-content: space-between;
}
</style>