Pages:

Home page should be protected (only accessible to authenticated users). STATUS: DONE

Contact Us page (not protected) contains basic contact information. STATUS: DONE

Signup page allows user registration with email and password; resembles Figure 1a. STATUS: DONE

Login page allows registered user login with email and password; contains button to redirect to signup page; resembles Figure 1b. STATUS: DONE



Signup/Login Functionality:

Signup page sends credentials to server; server checks if user exists, inserts if not, generates JWT, and returns it. STATUS: DONE

Login page successfully authenticates user and receives JWT. STATUS: DONE



Home Page Features:

Automatically fetches and displays all posts from the database. STATUS: DONE

Each post is clickable and redirects to the “a post” page. STATUS:

Logout button logs out user and redirects to login page. STATUS: DONE

Add post button redirects to add post page. STATUS:

Delete all button deletes all posts from the database. STATUS: DONE

Home page resembles Figure 2. STATUS:



Add Post Page:

Only accessible to logged-in users. STATUS: DONE

Allows adding a post with a body (post date handled automatically). STATUS:

Page resembles Figure 3. STATUS:



A Post Page:

Fetches and displays specific post clicked from home page. STATUS:

Update button updates the post in the database. STATUS:

Delete button deletes the post from the database. STATUS:

Page resembles Figure 4. STATUS: DONE

Only accessible to logged-in users. STATUS: DONE



Back-end Requirements:

Handles all required CRUD operations for front-end requests. STATUS:

Works only with JSON data (no static files like images). STATUS: DONE



Security:

Authentication handled using JWT techniques only. STATUS: DONE



Database:

All required tables are automatically created when the back-end runs. STATUS: DONE