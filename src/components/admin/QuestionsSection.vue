<template>
  <form class="section" @submit.prevent="submit">
    <div style="display:flex;flex-direction:column;justify-content:start">
      <label><strong>عنوان السؤال أو القطعة</strong></label>
      <textarea @keydown="save"  class="form-control" v-model="questionAddress" type="text" placeholder="Question address"></textarea>
      <img v-if="questionAddress.split('http').length>1" :src="questionAddress"/>
      <img v-if="questionAddress.split('data').length>1" :src="questionAddress"/>
      <input type="file" @change="(e)=>{uploadPhoto(e, 'address');save()}"/>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label><strong>عدد الأسئلة</strong></label>
        <input class="form-control" v-model.number="numberOfQuestions" type="number" min="1" max="40"/>
      </div>
      <div class="col-md-6">
        <label><strong>نوع السؤال</strong></label>
        <select @change="save" class="form-control" v-model="type">
          <option :value="0">مقالي</option>
          <option :value="1">اختياري</option>
        </select>
      </div>
    </div>
    <div calss="questions">
      <div v-for="q in questions.questions.length" :key="q" class="question">
        <div class="row">
          <div class="col-md-8">
            <label><strong>السؤال</strong></label>
            <v-textarea
              @keydown="save"
              v-model="questions.questions[q-1]['question']"
              label="The Question"
              outlined
              rows="3"
              row-height="25"
              shaped
            ></v-textarea>
            <img v-if="questions.questions[q-1]['question'].split('http').length>1" :src="questions.questions[q-1]['question']"/>
            <img v-if="questions.questions[q-1]['question'].split('data').length>1" :src="questions.questions[q-1]['question']"/>
            <input type="file" @change="(e)=>{uploadPhoto(e, (q-1));save()}"/>
          </div>
          <div class="col-md-2"/>
          <div class="col-md-2">
            <label><strong>الدرجة النهائية</strong></label>
            <input @change="save" style="width:80%" class="form-control" v-model.number="questions.questions[q-1]['fullDegree']" type="number" :placeholder="'full degree'"/>
          </div>
        </div>
        <div v-if="type===1">
          <div>
            <label><strong>عدد الاختيارات</strong></label>
            <input @change="save" class="form-control" v-model.number="questionsNumberOfChoices[q-1]" type="number" min="2" max="6" value="2"/> 
          </div>
          <div class="row">
            <div class="col-md-3" v-for="(ch, i) in questionsNumberOfChoices[q-1]" :key="ch">
              <input @change="save" class="form-control" v-model="questions.questions[q-1].choices[ch-1]" type="text" :placeholder="'Choice'+(i+1)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import {eventBus} from '../../main.js';
export default {
  props: ['section', 'index'],
  created(){
    if(this.section)  {
      this.questions = this.section;
      this.questionAddress = this.section.type;
      if(this.questions.questions[0].choices.length > 0) this.type = 1;
      this.numberOfQuestions = this.questions.questions.length;
      const numberOfChoices = this.section.questions.map(q => {
        return q.choices.length
      })
      this.questionsNumberOfChoices = numberOfChoices;
    } else {
        this.numberOfQuestions = 1;
    }
    eventBus.$on('collectQuestions', () => {
      this.doSubmit();
    })

  },
  data() {
    return {
      numberOfQuestions: 0,
      type: 0,
      questionsNumberOfChoices: [],
      questionAddress: '',
      questions: {}
    }
  },
  computed: {
  },
  watch: {
    questionAddress(val) {
      this.questions['type'] = val;
    },
    numberOfQuestions(val) {
      const obj = {type: this.questionAddress, questions: []}
      const arr = [];
      const oldArr = this.questions?.questions || [];
      for(let q =0; q<val; q++) {
        arr[q] = ({question: oldArr[q]?.question || '', choices: oldArr[q]?.choices || [], fullDegree: oldArr[q]?.fullDegree || 0});
      }
      obj['questions'] = arr;
      this.questions = obj;
      },
    },
    methods: {
      save() {
        console.log('save')
        this.$emit('saveProgress');
      },
      doSubmit() {
        this.$emit('concatArraysOfQuestions', this.questions);
      },

      uploadPhoto(e, field) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let image;
        reader.onload = () => {
            image = reader.result;
            if(field === 'address') {
              this.questionAddress = image.toString('base64');
            } else {
              this.questions.questions[field]['question'] = image.toString('base64');
            }
        }
      }
    }
  };
</script>
<style scoped lang="scss">
  .section {
    background-color: rgb(227, 229, 231);
    border: #555 1px solid;
    padding: 20px;
    margin: 20px;
  }
  .question {
    margin: 18px;
    padding: 15px;
    background-color: rgb(240, 241, 241);
    border: #555 1px solid;
  }
  input {
    margin: 8px;
  }
</style>
