<template>
    <div class="new-post">
        <h1>Create a New Post</h1>
        <form @submit.prevent="handleSubmit">
        <div>
            <label for="content">Content:</label>
            <textarea v-model="content" id="content" name="content" required></textarea>
        </div>
        <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
  name: 'NewPost',
  data() {
    return {
      content: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        // Get JWT token from localStorage (saved during login)
        const token = localStorage.getItem('token');
        
        if (!token) {
          alert('You must be logged in to create a post');
          this.$router.push('/signup');
          return;
        }

        const response = await fetch('http://localhost:3000/posts/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Send JWT token
          },
          body: JSON.stringify({
            body: this.content
          })
        });

        if (response.ok) {
          alert('Post created successfully!');
          this.content = '';
          // Optionally redirect to home page
          // this.$router.push('/');
        } else {
          const error = await response.json();
          alert(`Failed to create post: ${error.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Error creating post');
      }
    }
  }
}

//integrate code for dropdown menu

</script>

<style scoped>
.new-post {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.new-post h1 {
  text-align: center;
  color: #333;
}
.new-post form div {
  margin-bottom: 15px;
}
.new-post label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.new-post input[type="text"],
.new-post textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
.new-post button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
.new-post button:hover {
  background-color: #45a049;
}
</style>