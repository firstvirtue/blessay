<template>
  <!-- <div class=""> -->
    <!-- <p class="element-box element-box__text element-box__text--editable">
      {{content}}
    </p> -->
    <!-- <figure>
      <img src="https://picsum.photos/id/237/200/300" alt="">
    </figure> -->
    <p class="element-box element-box__text element-box__text--editable">한글날</p>
  <!-- </div> -->
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
    inputKey(e) {
      // console.log(e);
      this.content = e.target.innerText;

      // [TODO] patch
    },
    makeElement() {

    }
  }
}
</script>

<style lang="scss" src="~/assets/scss/_element-box.scss"></style>
