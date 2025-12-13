<template>
  <div class=posts-container id="posts-container">
      <div class="post" v-for = "post in posts" :key="post.id" style="width: 300px;" @click="openPost(post.id)"> <!-- default width-->
          <div class="post-header">
            <div class="post-header-right">
                <img class="post-author-pfp" :src="getImage(post.profile_picture)" width="50" height="50"> 
                <p class="username"> {{post.author}}</p>
            </div>
            <div class="post-header-left">
                <p class="post-date">{{ formatDate(post.create_time) }}</p>
            </div>
          </div>

          <div class="post-content">
            <img class="post-image" :src="getImage(post.image)"> 
            <p class="post-description"> {{post.body}}</p>
          </div>

          <div class="post-footer">
              <input type="image" :src="likeImg" width="50" height="50" @click="increaseLikes(post.id)"> 
              <p class="likes">{{post.likes}}</p>
          </div>
      </div>
  </div>
</template>

<script>
import likeImg from '@/assets/imgs/like.png';

export default {
  name: 'Posts',
  props: {
    msg: String
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    getImage(filename) {
      if (filename != "" && filename != undefined){
        return require(`@/assets/${filename}`);
      }
      return "";
    },
    increaseLikes(id){
      this.$store.dispatch("IncreaseLikesAct", id)
    },
    openPost(id) {
      console.log("Clicked post:", id);
      this.$router.push({ name: 'post', params: { id } });
    },
    async postList(){
      const response = await fetch("http://localhost:3000/posts/getAll");
      const data = await response.json();
          
      this.posts = data;
      console.log(data);
    },
  },
  mounted() {
    this.postList();  // fetch posts when component mounts
  },
  data() {
    return {
      likeImg,
      posts: []  
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#posts-container {
    display: flex;              /* enable flexbox */
    flex-direction: column;    /* center horizontally */
    align-items: center;        /* center vertically */
}

.post{
    display: flex;              /* enable flexbox */
    flex-direction: column;    /* center horizontally */
    align-items: center;        /* center vertically */

    margin-top: 120px;

    background: rgb(180, 176, 176); 
    padding: 40px;
    border-radius: 30px;
}

img[src=""] {
  display: none;
}

.post-header{
    display: flex;
    justify-content: space-between; /* pushes items to edges */
    width: 100%; /* send to both sides */
    align-items: center;  

    margin-bottom: 30px;
}

.post-header img {
    border-radius: 30px;
}

.post-content img + p {
    font-size: 15px;
}

.post-content img ~ p {
    font-family: "Lucida Console", "Courier New", monospace;
}

.post-content img {
  max-width: 100%;   /* never bigger than its container */
  border-radius: 10px;
}

.post-footer input:hover{
    box-shadow: 0px 5px 5px #585757;
}

.post-footer input:active {
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.post-footer{
    display: flex;
    justify-content: space-between; /* pushes items to edges */
    width: 100%; /* send to both sides */
}

.post-footer > input {
    border-radius: 30px;
}


</style>
