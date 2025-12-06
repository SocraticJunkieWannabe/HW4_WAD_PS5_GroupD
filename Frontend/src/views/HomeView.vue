<template>
  <button class="resetButton" v-on:click="Logout"> Log out </button>
  <posts-compo></posts-compo>
  <button class="resetButton" v-on:click="ResetLikes"> Reset likes </button>
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
    ResetLikes: function() {
        this.$store.dispatch("ResetLikesAct")
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
</style>
