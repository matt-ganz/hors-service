<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="headline">
              <i>Out-of-Service</i>
            </v-card-title>
            <v-card-text>
              <audio src="~/assets/gong.wav" crossorigin="anonymous"></audio>
              <p>
                I am malfunctioning. All avenues available to the stable person are no longer 
                viable options for me. Active listening, compromise and empathy
                -- ALL, out the window. Communication has deteriorated to such a point that all I can do is vent
                my most raw thoughts here in the hopes that flushing it down the abyss of anonymity will purge me of
                my demons. Where therapy fails, a virtual word toilet will serve as a sufficient replacement. 
              </p>
              <p>
                When it comes to you, and me-and-you, this is me at my most merciful.  
              </p>
              <v-textarea
                auto-grow
                autofocus
                background-color="#333"
                color="#fff"
                v-model="confession">
              </v-textarea>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="normal"
                nuxt
                @click="onSubmit()"
                :disabled="!confession.length"
              >
                Purge
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-center">
          </div>
          <v-card>
            <v-card-title class="headline">
              CONFESSIONS
            </v-card-title>
            <v-list max-height="85vh" class="overflow-y-auto">
              <v-card class="mb-8" v-for="post in posts.data" :key="post.id">
                <v-card-text>
                  {{post.body}}
                </v-card-text>
              </v-card>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  components: {},
  data: () => ({
    posts:[],
    confession: ""
  }),
  mounted(){
    this.getPosts();
  },
  methods: {
    async getPosts() {
      let res = await this.$store.dispatch('getPosts');
      this.posts = res;
    },
    async savePost(payload) {
      let res = await this.$store.commit('savePost', payload)
      return res;
    },
    onSubmit() {
      const input = document.querySelector('textarea').value.textContent;
      console.log(input);
      // const res = this.savePost(input); // send message to server
      // res 
      //   .then((res) => {
      //     this.playSound(); // play sound
      //     this.getPosts(); // refresh messages
      //   })
      //   .catch((err) => {
      //     console.log(`Error saving new post: ${err}`);
      //   });
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

 