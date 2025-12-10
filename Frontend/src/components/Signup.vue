<template>

    <!-- Usage of V-if to conditionally render forms and bubbles-->

    <!-- Usage of V- model in order to link the user input from the input field
     to a variable updated in real-time -->
    <main>
      <div class="form-section">
        <!-- Login Form -->
        <div v-if="currentForm === 'login'" id="container">
          <h2>Login</h2>
          <div>
            <div><input v-model="loginEmail" type="email" placeholder="Please enter an email address" required autofocus></div>
            <div><input v-model="loginPassword" type="password" placeholder="Please enter a password" required></div>
          </div>
          <div><button @click="handleLogin" :disabled="!isLoginValid">Login</button></div>
          <p>Don't have an account?</p>
          <button @click="showRegisterForm">Register</button>
        </div>

        <!-- Registration Form -->
        <div v-if="currentForm === 'register'" id="container">
          <h2>Register</h2>
          <div>

            <div class="inputs-wrapper">
              <div class="input-container">
                <input v-model="regEmail" type="email" placeholder="Email" required autofocus>

                <div v-if="regEmail && !isEmailValid" class="error-bubble">
                  {{ emailErrorMessage }}
                </div>
              </div>


              <div class="input-container">
                <input v-model="regPassword" type="password" placeholder="Password" required>

                <div v-if="regPassword && passwordErrors.length > 0" class="error-bubble">
                  <!-- Iterative display of password errors -->
                  <div v-for="(error, index) in passwordErrors" :key="index" class="error-item">
                    {{ error }}
                  </div>
                </div>
              </div>

              <div class="input-container">
                <input v-model="regConfirmPassword" type="password" placeholder="Confirm Password" required>
                <div v-if="regConfirmPassword && !passwordsMatch" class="error-bubble">
                  Passwords do not match
                </div>
              </div>
            </div>
          </div>


          <div><button @click="handleRegister" :disabled="!isRegistrationValid">Register</button></div>
          <button @click="showLoginForm">Back to Login</button>
        </div>

        <!-- Forgot Password Form -->
        <div v-if="currentForm === 'forgot'" id="container">
          <h2>Forgot Password</h2>
          <div>
            <div><input v-model="forgotEmail" type="email" placeholder="Please enter your email address" required autofocus></div>
            <button @click="handleResetPassword" :disabled="!isForgotPasswordValid">Reset Password</button>
            <button @click="showLoginForm">Back to Login</button>
          </div>
        </div>

        <button v-if="currentForm === 'login'" @click="showForgotPassword" id="forgot-password-button">Forgot password ?</button>
      </div>
    </main>

  
  <div v-if="authError" class="error-bubble">
  {{ authError }}
  </div>

</template>

<script>
export default {
  name: 'Signup',

  data() {
    return {
      currentForm: 'login',
      forgotEmail: '',
      loginEmail: '',
      loginPassword: '',
      regEmail: '',
      regPassword: '',
      regConfirmPassword: '',
      authError: ''           // to show backend errors
    };
  },

  computed: {
    isLoginValid() {
      return this.loginEmail.trim() !== '' && this.loginPassword.trim() !== '';
    },

    isRegistrationValid() {
      return (
        this.regEmailValid &&
        this.passwordErrors.length === 0 &&
        this.passwordsMatch
      );
    },

    regEmailValid() {
      return this.regEmail.trim() !== '' && this.regEmail.includes('@');
    },

    emailErrorMessage() {
      if (this.regEmail.trim() === '') {
        return 'Email is required';
      }
      if (!this.regEmail.includes('@')) {
        return 'Email must contain @';
      }
      return '';
    },

    // Password validation
    passwordErrors() {
      const errors = [];

      if (this.regPassword.trim() === '') {
        return errors;
      }

      if (!/^[A-Z]/.test(this.regPassword)) {
        errors.push('Must start with an uppercase letter');
      }
      if (this.regPassword.length < 8) {
        errors.push('Must be at least 8 characters');
      }
      if (this.regPassword.length > 15) {
        errors.push('Must be no more than 15 characters');
      }
      if (!/[A-Z]/.test(this.regPassword)) {
        errors.push('Must contain at least one uppercase letter');
      }
      if ((this.regPassword.match(/[a-z]/g) || []).length < 2) {
        errors.push('Must contain at least 2 lowercase letters');
      }
      if (!/\d/.test(this.regPassword)) {
        errors.push('Must contain at least one number');
      }
      if (!this.regPassword.includes('_')) {
        errors.push('Must contain an underscore (_)');
      }

      return errors;
    },

    passwordsMatch() {
      return (
        this.regPassword.trim() !== '' &&
        this.regPassword === this.regConfirmPassword
      );
    }
  },

  mounted() {
    if (this.$route.query.message) {
     this.authError = this.$route.query.message
     setTimeout(() => {
      this.authError = ''
      }, 4000);
    }
  },

  methods: {
    showLoginForm() {
      this.currentForm = 'login';
      this.authError = '';
    },
    showRegisterForm() {
      this.currentForm = 'register';
      this.authError = '';
    },
    showForgotForm() {
      this.currentForm = 'forgot';
      this.authError = '';
    },

    async handleLogin() {
      this.authError = '';
      try {
        const res = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.loginEmail,
            password: this.loginPassword
          })
        });

        const data = await res.json();

        if (!res.ok) {
          this.authError = data.message || 'Login failed';
          return;
        }

        // Save token and (optionally) user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);

        // Redirect to home (protected route)
        const redirectPath = this.$route.query.redirect || '/';
        this.$router.push(redirectPath);
      } catch (err) {
        console.error(err);
        this.authError = 'An error occurred during login';
      }
    },

    async handleRegister() {
      this.authError = '';
      try {
        const res = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.regEmail,
            password: this.regPassword
          })
        });

        const data = await res.json();

        if (!res.ok) {
          this.authError = data.message || 'Registration failed';
          return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        const redirectPath = this.$route.query.redirect || '/';
        this.$router.push(redirectPath);

      } catch (err) {
        console.error(err);
        this.authError = 'An error occurred during registration';
      }
    },

    handleResetPassword() {
      this.showLoginForm();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Root container - sticky footer layout */



h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.inputs-wrapper {

  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px auto;
  width: fit-content;
}

.input-container {
  position: relative;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: fit-content;
}

.error-bubble {
  position: absolute;
  background-color: #ff6b6b;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  top: 50%;
  left: 100%;
  margin-left: 10px;
  transform: translateY(-50%);
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(251, 246, 246, 0.15);
  z-index: 10;
}

/* Arrow point attached to the error bubble */
.error-bubble::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid #ff6b6b;
}

/* Styling of the individual error items */
.error-item {
  margin: 2px 0;
}

.error-item:first-child {
  margin-top: 0;
}

.error-item:last-child {
  margin-bottom: 0;
}



</style>
