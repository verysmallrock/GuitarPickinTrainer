<template>
  <section>
    <div class="container">
      <button v-on:click="togglePlayback()" :key="player.playing">{{ player.playing ? "Stop" : "Play"}}</button>
      <select v-model="player.speed" @change="setSpeed">
        <option v-for="speed in Object.keys(player.speeds)" v-bind:value="speed" >
            {{ speed }}
        </option>
      </select>
    </div>
  </section>
</template>



<script>
import SoundPlayer from '../../js/SoundPlayer'

let player = new SoundPlayer()

export default {
  data() {
    return {
      player: player
    };
  },
  methods: {
      togglePlayback() {

          this.player.togglePlayback()
          this.$forceUpdate()
      },
      setSpeed(e) {
          let speed = e.target.value
          player.setSpeed(speed)
      }
  },
  watch: {
      'player.playing': {
          handler: () => {
              console.log('toggle')
          }
      }
  }
};
</script>

<style lang="scss" scoped>
.container {
}
img {
  max-width: 200px;
}
</style>
