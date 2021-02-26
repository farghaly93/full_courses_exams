<template>
      <!-- <v-navigation-drawer
      class="drawer"
      v-if="!$route.path.includes('/نتنتنتن') && $route.path!=='/'"
        right
        v-model="drawer2"
        overlay-opacity=".5"
        app
        fixed
        width="630"
      >
        <students-degrees side="user"/>
      </v-navigation-drawer> -->
  <div>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>

    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <students-degrees side="user"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    console.log('lllllllllllllllllLLLLLLLLoooooOOOOOOOOoooooooooLLLLLLLLLLlllllllllllllllllllll')
  },
  components: {
    // StudentsDegrees
  }
}
</script>

<style scoped lang="scss">

</style>