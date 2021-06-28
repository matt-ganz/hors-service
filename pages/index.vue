<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="headline">
              <i>When Therapy Fails</i>
            </v-card-title>
            <v-card-text>
              <audio src="~/assets/gong.wav" crossorigin="anonymous"></audio>
              <p>
                I created this site for me. I've been to therapy on and off for years, with my spouse and/or
                by myself. It saved my marriage many times. But over time, I found that I wasn't being
                entirely honest in those sessions. I thought I was being honest but sometimes I'm the most honest
                when I'm scared or late at night. 
              </p>
              <p>
                Where therapy fails to address your feelings as they occur, this tool helps you
                let the pain out when it happens....in a safe and anonymous way. 
                </p>
              <v-textarea
                id="zing"
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
              <i>Confessions</i>
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
    clear(){
      const input = document.querySelector('textarea');
      input.focus();
      input.value = '';
    },
    onSubmit() {
      const input = document.querySelector('textarea').value;
      const res = this.savePost(input); // send message to server
      
      res 
        .then((res) => {
          this.playSound(); // play sound
          this.getPosts(); // refresh messages
          this.clear();
        })
        .catch((err) => {
          console.log(`Error saving new post: ${err}`);
        });
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

 