<template>
  <footer>
        <p>Authors: Loïc Delattre, Mattis Roellinger, Guillaume Le Chartier</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer{
    margin-top: 120px;

    background: #333;
    color: white;
    padding: 20px;

    position: relative;
    bottom: 0;
    font-size: 14px;
}
</style>
