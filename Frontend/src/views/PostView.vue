<script>export default {
  name: 'PostView',

  methods: {
    async post(id) {
      const response = await fetch("http://localhost:3000/post/get/${id}");
      const data = await response.json();
          
      this.post = data;
      console.log(data);
    },
    UpdatePost: function(id, newBody) {
        fetch('/post/update/${id}', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: newBody
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
        post: {}
      };
    }
  }

}
    
</script>