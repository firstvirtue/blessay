<template>
  <p class="element-box element-box__text" @keyup="inputKey">
    {{content}}
  </p>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      articleId: '',
      content: '',
      date: ''
    }
  },
  mounted() {

  },
  methods: {
    inputKey() {

    }
  }
}
</script>

<style scoped>
  .element-box {
    &__text {
      @include mq(large) {

      }
    }
  }
</style>
