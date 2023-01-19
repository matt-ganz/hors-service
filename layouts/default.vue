<template>
  <v-app>
    <!-- <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
    </v-app-bar> -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <v-col
        cols="12"
        class="text-right">
        <span class="caption">&copy; {{ new Date().getFullYear() }} <a href="mailto:miju-aro@protonmail.com">miju-aro@protonmail.com</a></span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
