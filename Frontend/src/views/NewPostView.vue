<template>
  <div class="NewPost_page">
    <NewPost />
  </div>
</template>

<script>
// @ is an alias to /src
import NewPost from "@/components/NewPost.vue"

export default {
  name: 'NewPostView',
  components: {
    NewPost
  },

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
