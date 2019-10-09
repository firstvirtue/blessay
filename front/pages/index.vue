<template>
  <section>
    <h1>text</h1>
    <div id="doc-container" class="container" contenteditable="true">
      <section v-for="section in article.contentModel" v-bind:key="section.id">
        <p class="element-box element-box__text element-box__text--editable" v-for="item in section.contents" v-bind:key="item.id">{{item.content}}</p>
      </section>
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

    const observKeyup$ = fromEvent(window, 'keyup');
    const observeKey$ = fromEvent(window, 'keydown');
    this.doc = document.getElementById('doc-container');

    observeKey$
    .pipe(
      map( e => ({
        code: e.keyCode,
        data: e.key
      })
      )
    )
    .subscribe((input) => {
      // e.preventDefault();

      var sel = window.getSelection();
      if(sel.rangeCount === 0) return;

      var range = sel.getRangeAt(0);


      // console.log(range);
      this.selectionRange = {
        startOffset: range.startOffset,
        endOffset: range.endOffset
      }

      switch (input.code) {
        case 13:
          console.log(range);
          this.returnData(input);
          break;
        case 8:
          console.log(range);
          this.removeData(input);
          break;
        case 37:
        case 38:
        case 39:
        case 40:
          this.moveCursor(input);
          break;
        default:
          this.addData(input);
          // this.inputDefault(range);
      }

      // if((e.ctrlKey || e.metaKey) && String.fromCharCode(e.which).toLowerCase() == 'z') {
      //   // TODO: history
      // }

    });

    observeKey$.subscribe(e => e.preventDefault());

    // TODO: SAVE
    observeKey$.pipe(
      debounce(() => interval(2000))
    )
    .subscribe(() => {
      console.log('저장');
      console.log(this.article);
    });

    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    // console.log(makeid(5));

  },
  methods: {
    returnData(input) {

    },
    removeData(input) {

    },
    moveCursor(input) {

    },
    addData(input) {

      let target = this.article.contentModel[0].contents[0].content;

      const pos = this.selectionRange.startOffset;

      // this.doc.setSelectionRange(this.selectionRange.startOffset, this.selectionRange.endOffset)

      var range = document.createRange();
      var sel = window.getSelection();

      range.collapse(true);
      sel.removeAllRanges();

      this.article.contentModel[0].contents[0].content = [target.slice(0, pos), input.data, target.slice(pos)].join('');


      // console.log(this.doc.childNodes[0].childNodes[0].childNodes[0]);
      const self = this;
      setTimeout(function() {
        range.setStart(self.doc.childNodes[0].childNodes[0].childNodes[0], self.selectionRange.startOffset + 1);
        sel.addRange(range);
      }, 1);


    }
  },
  data() {
    return {
      selectionRange: null,
      article: {
        title: '타이틀',
        publishedDate: '2019.10.22',
        contentModel: [
          {
            id: 'sd09',
            contents: [
              {
                id: 'qwee',
                type: 'paragraph',
                content: '한글의 위대함'
              },
              {
                id: 'qwe1',
                type: 'paragraph',
                content: '한글의 위대함'
              },
              {
                id: 'axe1',
                type: 'paragraph',
                content: '한글의 위대함'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
