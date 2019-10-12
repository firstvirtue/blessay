<template>
  <section>
    <h1>text</h1>
    <div id="doc-container" class="container" contenteditable="true">
      <section v-for="section in article.contentModel" v-bind:key="section.id">
        <p class="element-box element-box__text element-box__text--editable" v-for="item in section.contents" v-bind:key="item.id" :name="item.id">{{item.content}}</p>
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
    // this.doc = document.getElementById('doc-container');

    observeKey$
    .pipe(

    )
    .subscribe(e => {

      var sel = window.getSelection();
      if(sel.rangeCount === 0) return;

      var range = sel.getRangeAt(0);
      // console.log(range);

      this.selectionRange = {
        startOffset: range.startOffset,
        endOffset: range.endOffset,
        currentElement: range.startContainer.nodeType === 1 ? range.startContainer : range.startContainer.parentElement
      }

      let input = {
        code: e.keyCode,
        data: e.key
      }

      // console.log(input.code);

      switch (input.code) {
        case 13:
          e.preventDefault();
          this.returnData(input);
          break;
        case 8:
          e.preventDefault();
          this.removeData(input);
          break;
        case 37:
        case 38:
        case 39:
        case 40:
          // 방향키
          break;
        case 9: //tab
        case 16: // shift
        case 17: // control
        case 18: // alt(option)
        case 20: // caps lock
        case 91: // command
          break;
        case 229:
          e.preventDefault();
          this.automataHangeul(input);
          break;
        default:
          e.preventDefault();
          this.addData(input);
      }


      // if((e.ctrlKey || e.metaKey) && String.fromCharCode(e.which).toLowerCase() == 'z') {
      //   // TODO: history
      // }

    });

    observeKey$.subscribe(e => {

      // TODO: 한글 막기
    });

    // TODO: SAVE
    observeKey$.pipe(
      debounce(() => interval(2000))
    )
    .subscribe(() => {
      console.log('저장');
      // console.log(this.article);
    });

  },
  methods: {
    automataHangeul(input) {

      console.log(input);

    },
    returnData(input) {

      function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

      const name = this.selectionRange.currentElement.getAttribute('name');

      let idx = 0;
      let currentData;
      this.article.contentModel[0].contents.forEach((el, i) => {
        if(el.id === name) {
          idx = i;
          currentData = el;
        }
      });

      const cursorBefore = this.selectionRange.currentElement.innerText.slice(0, this.selectionRange.endOffset);
      const cursorAfter = this.selectionRange.currentElement.innerText.slice(this.selectionRange.endOffset);

      currentData.content = cursorBefore;

      this.article.contentModel[0].contents.splice(idx + 1, 0, {
        id: makeid(5),
        type: 'paragraph',
        content: cursorAfter
      });

      this.moveCursor();

    },
    removeData(input) {
      // 라인 변경
      if(this.selectionRange.endOffset === 0) {

        const name = this.selectionRange.currentElement.getAttribute('name');
        const prev = this.selectionRange.currentElement.previousSibling;

        if(prev === null) return;

        let idx = 0;
        let currentData;
        this.article.contentModel[0].contents.forEach((el, i) => {
          if(el.id === name) {
            idx = i;
            currentData = el;
          }
        });

        this.article.contentModel[0].contents[idx - 1].content += currentData.content;

        this.article.contentModel[0].contents.splice(idx, 1);

        this.moveCursorUp(prev.childNodes[0], prev.innerText.length);

      } else {
        // 단순 제거

        const name = this.selectionRange.currentElement.getAttribute('name');
        let currentData;
        this.article.contentModel[0].contents.forEach((el, i) => {
          if(el.id === name) {
            currentData = el;
          }
        });

        let uiTarget = this.selectionRange.currentElement.childNodes[0];

        var range = document.createRange();
        var sel = window.getSelection();
        range.collapse(true);
        sel.removeAllRanges();

        const pos = this.selectionRange.startOffset;

        currentData.content = [currentData.content.slice(0, pos - 1), currentData.content.slice(pos)].join('');

        const self = this;
        setTimeout(function() {
          range.setStart(uiTarget, self.selectionRange.startOffset - 1);
          sel.addRange(range);
        }, 0);
      }

    },
    addData(input) {

      let uiTarget = this.selectionRange.currentElement.childNodes[0];
      let name = this.selectionRange.currentElement.getAttribute('name');
      // console.log(this.selectionRange.currentElement);
      var filtered = this.article.contentModel[0].contents.filter(function(el) {
        return el.id === name;
      });

      let target = filtered[0];
      const pos = this.selectionRange.startOffset;

      var range = document.createRange();
      var sel = window.getSelection();
      range.collapse(true);
      sel.removeAllRanges();

      target.content = [target.content.slice(0, pos), input.data, target.content.slice(pos)].join('');

      const self = this;
      setTimeout(function() {
        range.setStart(uiTarget, self.selectionRange.startOffset + 1);
        sel.addRange(range);
      }, 0);

    },
    moveCursor() {
      const self = this;

      setTimeout(function() {
        var range = document.createRange();
        var sel = window.getSelection();
        range.collapse(true);
        sel.removeAllRanges();
        range.setStart(self.selectionRange.currentElement.nextSibling, 0);
        sel.addRange(range);
      }, 0);

    },
    moveCursorUp(node, pos) {
      const self = this;

      setTimeout(function() {
        var range = document.createRange();
        var sel = window.getSelection();
        range.collapse(true);
        sel.removeAllRanges();
        range.setStart(node, pos);
        sel.addRange(range);
      }, 0);

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
            id: 'sd039',
            contents: [
              {
                id: 'qw1se',
                type: 'paragraph',
                content: '한글의 위대함'
              },
              {
                id: 'lw1e1',
                type: 'paragraph',
                content: '한글의 위대함'
              },
              {
                id: 'kaxe1',
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
.container {
  white-space: pre;
}
</style>
