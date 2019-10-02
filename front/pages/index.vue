<template>
  <section>
    <h1>text</h1>
    <div class="container" @input="inputData" @keydown="keyup">
      <TextElementBox v-for="item in article.contents" v-bind:key="item.id" :name="item.id"></TextElementBox>
    </div>
  </section>
</template>

<script>
import { of } from 'rxjs';
import TextElementBox from '~/components/TextElementBox.vue';

export default {
  components: {
    TextElementBox
  },
  mounted() {

    const observer = of(this.article.contents);
    observer.subscribe((e) => {
      console.log(e);
    });

  },
  data() {
    return {
      article: {
        title: '타이틀',
        publishedDate: '2019.10.22',
        contents: [
          { id: '1233', content: '382jdjs' }
        ]
      }
    }
  },
  methods: {
    inputData(e) {
      if(e.data !== null) {
        // console.log(e);
      }
    },
    keyup(e) {
      // console.log(e);

      if(e.keyCode === 13) {
        this.makeNewElement();

        e.stopPropagation();
        e.preventDefault();
      }

      // this.contents.push({
      //   id: 'djslf',
      //   content: '28092123'
      // })
    },
    makeNewElement() {
      const tempId = 'qwe' + Math.random();

      this.article.contents.push({
        id: tempId,
        content: ''
      });

      setTimeout(() => {
        const el = document.getElementsByName(tempId)[0];
        // console.log(el);

        el.focus();
      },1);

    }
  }
}
</script>

<style>

</style>
