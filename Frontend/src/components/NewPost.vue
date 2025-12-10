<template>
    <div class="new-post">
        <h1>Create a New Post</h1>
        <form>
        <div>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required />
        </div>
        <div>
            <label for="content">Content:</label>
            <textarea id="content" name="content" required></textarea>
        </div>
        <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
  name: 'NewPost',
  props: {
    msg: String
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