<template>
  <section>
    <h1>text</h1>
    <div class="container" contenteditable="true">
      <TextElementBox v-for="item in article.contents" v-bind:key="item.id" :name="item.id"></TextElementBox>
    </div>
  </section>
</template>

<script>
import { fromEvent, interval } from 'rxjs';
import { map, debounce, distinctUntilChanged, scan, filter } from 'rxjs/operators';
import TextElementBox from '~/components/TextElementBox.vue';

export default {
  components: {
    TextElementBox
  },
  mounted() {

    const observer$ = fromEvent(window, 'keyup');
    const obs$ = fromEvent(window, 'keydown');

    observer$.pipe(
      // scan(() => {
      //
      // }),
      // debounce(() => interval(500))
    )
    .subscribe((e) => {
      if(e.keyCode !== 13) {
        // console.log(e.target.innerText);
      }
      // console.log(e);

      if(e.code === 'Enter') {
        if (document.selection) {
          alert(document.selection.createRange().parentElement().tagName); // IE
        } else {
          // everyone else
          const target = window.getSelection().anchorNode;
          const type = Object.prototype.toString.call(target).slice(8, -1);
          if(type === 'HTMLParagraphElement') {
            // console.log(0);
            target.setAttribute('name', 'ejidw');
            // [TODO] 데이터 append
          } else if(type === 'Text') {
            // console.log(1);
            target.parentElement().setAttribute('name', 'ejidw');
            // [TODO] 데이터 append
          }
        }
      }

    });

    obs$.pipe(

    )
    .subscribe((e) => {
      if(e.code === 'Backspace') {
        if (document.selection) {
          alert(document.selection.createRange().parentElement().tagName); // IE
        } else {
          // everyone else
          const target = window.getSelection().anchorNode;
          const type = Object.prototype.toString.call(target).slice(8, -1);

          if(type === 'HTMLParagraphElement') {
            console.log(target.getAttribute('name'));
            // [TODO] 데이터 remove
          }
        }
      }
    });

    // [TODO] 만들어진 article - contents data --> upsert 형태로 DB 반영, debounce 적용

  },
  data() {
    return {
      article: {
        title: '타이틀',
        publishedDate: '2019.10.22',
        contents: [
          { id: 'qwee', content: 'qwe' }
        ]
      }
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
