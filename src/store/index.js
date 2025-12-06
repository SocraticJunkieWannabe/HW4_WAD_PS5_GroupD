import { createStore } from 'vuex'

export default createStore({
  state: {
      postList:[
    {
        id: 1,
        body: "Debate of the day: Võiga või võita ?",
        author_name: "Jean Dupont",
        create_time : "2025-10-26T18:25:43.511Z",
        profile_picture: "imgs/blank_profile.webp",
        likes: 0,
        img: ""
    },
    {
        id: 2,
        body: "Bunch of bricks nothing much...",
        author_name: "Jean Doe",
        create_time : "2025-10-26T18:25:43.511Z",
        profile_picture: "imgs/blank_profile.webp",
        likes: 0,
        img: "imgs/posts_media/cathedral.jpg"
    },
    {
        id: 3,
        body: "New year not new me :(",
        author_name: "Jeanne Dupont",
        create_time : "2025-10-26T18:25:43.511Z",
        profile_picture: "imgs/blank_profile.webp",
        likes: 0,
        img: "imgs/posts_media/ulikool.jpeg"
    },
    {
        id: 4,
        body: "Slava Urkaini",
        author_name: "Jean Doe",
        create_time : "2025-10-26T18:25:43.511Z",
        profile_picture: "imgs/blank_profile.webp",
        likes: 0,
        img: "imgs/posts_media/bridge.jpeg"
    },
    {
        id: 5,
        body: "Anyone got milk, I just ran out ...",
        author_name: "John Doe",
        create_time : "2025-10-26T18:25:43.511Z",
        profile_picture: "imgs/blank_profile.webp",
        likes: 0,
        img: ""
    },
    {
        id: 6,
        body: "Party Tonight at Moku @20h00",
        author_name: "Jean Doe",
        create_time : "2025-10-26T18:25:43.511Z",
        profile_picture: "imgs/blank_profile.webp",
        likes: 0,
        img: "imgs/posts_media/city_center.jpeg"
    },
    {
        id: 7,
        body: "World Hello",
        author_name: "Jean Dupont",
        create_time : "2025-10-26T18:25:43.511Z",
        profile_picture: "imgs/blank_profile.webp",
        likes: 0,
        img: "imgs/posts_media/bridge.jpeg"
    },
    {
        id: 8,
        body: "Yee Haw",
        author_name: "Jeanne Dupont",
        create_time : "2025-10-26T18:25:43.511Z",
        profile_picture: "imgs/blank_profile.webp",
        likes: 0,
        img: ""
    },
    {
        id: 9,
        body: "Tere Tere !",
        author_name: "Jean Dupont",
        create_time : "2025-10-26T18:25:43.511Z",
        profile_picture: "imgs/blank_profile.webp",
        likes: 0,
        img: ""
    },
    {
        id: 10,
        body: "Hello World",
        author_name: "John Doe",
        create_time : "2025-10-26T18:25:43.511Z",
        profile_picture: "imgs/blank_profile.webp",
        likes: 0,
        img: ""
    }
      ]
  },
  getters: {
      postList: state => {
          var postList = state.postList.map(post => {
              return {
                  id: post.id,
                  author: post.author_name,
                  timestamp: post.create_time,
                  body: post.body,
                  likes: post.likes,
                  image: post.img,
                  profile_picture: post.profile_picture
              }
          });
          return postList
      },
  },
  mutations: {
    IncreaseLikes: (state, postId) => {
      state.postList.forEach(post => {
            if (post.id == postId)
                post.likes += 1; 
        })
    },
    ResetLikes: state => {
          state.postList.forEach(product => {
              product.likes = 0;
        })
    }
  },
  actions: {
    IncreaseLikesAct: (act, postId) => {
        setTimeout(function() {
            act.commit("IncreaseLikes", postId)
        }, 100)
    },
    ResetLikesAct: act => {
        setTimeout(function() {
            act.commit("ResetLikes")
        }, 100)
    }
  },
  modules: {
  }
})
