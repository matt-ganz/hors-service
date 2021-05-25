<template>
  <v-row justify="center">
    <v-col cols="6" sm="5" md="6">
      <v-card>
        <v-card-title class="headline">
          OUT-OF-SERVICE
        </v-card-title>
        <v-card-text>
          <audio src="~/assets/gong.wav" crossorigin="anonymous"></audio>
          <p>
            I can no longer be of service to you, I am malfunctioning. All avenues
            available to the stable person are no longer viable options to me. Through
            this anonymous confession I purge myself of any ill will so I can continue
            on through my day/night without overheating.
          </p>
          <p>
            Though I cannot tell you to your face I will commit my comments
            below in the hopes that it will relieve me of some of my stress. I promise
            nothing to you and, as usual, expect nothing in return -- because that is all that
            I have ever gotten...and what I now come to expect.
          </p>
          <v-textarea
            auto-grow
            autofocus
            background-color="#333"
            color="#fff">
          </v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            @click="onSubmit()"
          >
            Confess
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="7" sm="8" md="6">
      <div class="text-center">
      </div>
      <v-card>
        <v-card-title class="headline">
          CONFESSIONS
        </v-card-title>
        <v-card class="mb-8" v-for="post in posts.data" :key="post.id">
          <v-card-text>
            {{post.text}}
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  components: {},
  // async asyncData({$axios}) {
  //   let {data} = await $axios.get("/posts");
  //   return {posts: data.data}
  // },
  data: () => ({
    posts:[]
  }),
  mounted(){
    this.getPosts();
  },
  methods: {
    async getPosts() {
      console.log('getPosts()');
      let res = await this.$store.dispatch('getPosts');
      this.posts = res;
    },
    onSubmit: function(){
      // send message to server
      // play sound
      this.playSound();
      // refresh messages
    },
    playSound: function(){
        var playPromise = document.querySelector('audio').play();
        // In browsers that don’t yet support this functionality,
        // playPromise won’t be defined.
        if (playPromise !== undefined) {
          playPromise.then(function() {
            // Automatic playback started!
          }).catch(function(error) {
            // Automatic playback failed.
            // Show a UI element to let the user manually start playback.
          });
        }
    }
  }
}
</script>

 