<script>export default {
  name: 'PostView',
  components: {
    PostsCompo
  },

  methods: {
    UpdatePost: function(id, newBody) {
        fetch('/posts/update/${id}', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: newBody
            })
        });
    }
  }

}
    
</script>