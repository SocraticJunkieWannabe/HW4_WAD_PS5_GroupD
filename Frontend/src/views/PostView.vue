<template>

  <div class="post" style="width: 300px;"> <!-- default width-->
    <div class="post-content">
      <img class="post-image" :src="getImage(post.image)"> 
      <textarea class="post-description" v-model="postBody" style="width: 300px; height: 100px;">{{post.body}}</textarea>
    </div>

    <div class="post-footer">
        <input type="image" :src="likeImg" width="50" height="50" @click="increaseLikes(post.id)"> 
        <p class="likes">{{post.likes}}</p>
    </div>
  </div>

</template>

<script>
  export default {
  name: 'PostView',

  methods: {
    async post(id) {
      const response = await fetch("http://localhost:3000/post/get/${id}");
      const data = await response.json();
          
      this.post = data;
      console.log(data);
    },
    UpdatePost: function(id) {
        fetch('/post/update/${id}', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: this.postBody
            })
        });
    },
    DeletePost: function(id) {
        fetch('/post/delete/${id}', {
            method: "DELETE"
        });
    }, 
    mounted() {
      this.post();  // fetch posts when component mounts
    },
    data() {
      return {
        post: {},
        postBody
      };
    }
  }

}
    
</script>