<template>
  <p class="element-box element-box__text" @input="inputKey" contenteditable="true">
    {{content}}
  </p>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      articleId: '',
      content: 'qwe',
      date: ''
    }
  },
  mounted() {

  },
  methods: {
    inputKey(e) {
      // console.log(e);
      console.log(this.content);
    }
  }
}
</script>

<style lang="scss" src="~/assets/scss/_element-box.scss"></style>
