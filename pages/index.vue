<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="headline">
              <!-- <i>Therapy isn't for everyone</i> -->
            </v-card-title>
            <v-card-text>
              <audio ref="gong" src="~/assets/gong.wav" crossorigin="anonymous"></audio>
              <p>
                <b>Therapy isn't for everyone.</b> People can't afford it or make time for it. 
                Some things are too private or shameful to say out loud. There are many barriers 
                to effective therapy. 
              </p>
              <p>
                This tool has no barriers. The service this site provides is allowing you to say those things 
                that you want to say...so badly...out loud. The things you cannot say to anyone, or are afraid to; 
                if you have no one to say it to, or if the truth is too painful. 
              </p>
              <p>
                Unexpressed feelings are trapped inside you, eating away at you. When you let it out, 
                they are gone for the time being. This is a tool for temporary relief. 
              </p>
              <v-textarea
                ref="confession"
                auto-grow
                autofocus
                background-color="#ccc"
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
                Expel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-center">
          </div>
          <v-card flat color="transparent">
            <!-- <v-card-title class="headline">
              <i>Confessions</i>
            </v-card-title> -->
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
      let res = await this.$store.commit('savePost', payload);
      return res;
    },
    clear(){
      this.confession = "";
    },
    focusInput() {
      this.$refs.confession.focus();
    },
    onSubmit() {
      this
        .savePost(this.confession.trim())
        .then((result) => {
          this.playSound(); 
          this.getPosts();
          this.clear();
          this.focusInput();
        });
    },
    playSound: function(){
        var playPromise = this.$refs.gong.play();
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

 