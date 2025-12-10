<template>
  <nav>
    <div class="navbar-left">
      <router-link to="/">Home</router-link>
      <li> | </li>
      <router-link to="/about">Contact Us</router-link>
      <li> | </li>
      <!-- Show Logout only if logged in AND not on signup/about -->
      <button v-if="showLogout" @click="logout">
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',

  props: {
    msg: String
  },

  computed: {
    // Is user logged in
    isLoggedIn() {
      return !!localStorage.getItem('token')
    },

    // Should we show the Logout button?
    showLogout() {
      const hiddenRoutes = ['signup', 'about']
      return this.isLoggedIn && !hiddenRoutes.includes(this.$route.name)
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/signup')
    }
  }
}
</script>

<style scoped>
:root {
  --pale-dogwood: rgb(202, 210, 235);
  --bistre: #2C2418ff;
  --mountbatten-pink: #8F7FA3ff;
  --silver-lake-blue: #6991C2ff;
  --powder-blue: rgb(6, 7, 7);
}

/* navigation */
nav {
  display: flex;
  justify-content: center;
  background-color: var(--pale-dogwood, #b6b5b5);
  padding: 30px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-right,
.navbar-left {
  list-style: none;
  display: flex;
  gap: 20px;

  color: var(--silver-lake-blue);
  text-decoration: none;
  font-weight: bold;
  font-size: 19px;
  transition: color 0.2s ease;
}

nav div a {
  color: var(--silver-lake-blue);
  text-decoration: none;
  font-weight: bold;
  font-size: 19px;
  transition: color 0.2s ease;
}

nav div a:hover {
  color: var(--bistre);
}

nav img {
  border-radius: 50%;
}

/* LOGOUT BUTTON STYLED LIKE THE LINKS */
.navbar-left button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;

  color: var(--silver-lake-blue);
  font-weight: bold;
  font-size: 19px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.navbar-left button:hover {
  color: var(--bistre);
}

/* Dropdown container */
.dropdown-container {
  position: relative;
  display: inline-block;
}

/* The button that shows the avatar (top right) */
.dropButton {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  border-radius: 50%;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* The avatar image inside the button */
.dropButton img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid var(--bistre);
  object-fit: cover;
}

/* The dropdown menu panel */
.dropdown-menu {
  display: none;

  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;

  min-width: 180px;
  background-color: var(--pale-dogwood);
  color: var(--bistre);

  border: 1px solid var(--bistre);
  border-radius: 8px;

  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 1000;

  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter", Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  overflow: hidden;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-menu a {
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  background-color: transparent;
  color: var(--bistre);
  word-break: break-word;
  white-space: normal;
  font-weight: 500;
  transition: background-color 0.2s;
}

.dropdown-menu a[href] {
  cursor: pointer;
  color: var(--silver-lake-blue);
  font-weight: bold;
}

.dropdown-menu a[href]:hover {
  background-color: rgba(0,0,0,0.07);
}

.dropdown-menu a:first-child {
  border-radius: 8px 8px 0 0;
}

.dropdown-menu a:last-child {
  border-radius: 0 0 8px 8px;
}
</style>