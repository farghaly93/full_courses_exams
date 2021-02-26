
<template>
    <div>
        
        <div class="col-md-12">
            <div class="examinfo">
                <label>نوع الامتحان</label>
                <select @change="saveProgress" class="form-control" v-model="type">
                    <option value="regular">للطلاب المنتظمين</option>
                    <option value="visitor">للطلاب الزائرين</option>
                </select>
            </div>
        </div>

        <div class="col-md-12">
            <div style="margin:30px;" class="row">
                <template v-if="type==='visitor'">
                    <div class="col-md-4">
                        <div class="examinfo">
                            <label>اسم الامتحان</label>
                            <input @change="saveProgress" class="form-control" type="text" v-model="name" />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="examinfo">
                            <label>الوحدة</label>
                            <input @change="saveProgress" class="form-control" type="number" v-model.number="unit" />
                        </div>
                    </div>
                </template>
                <template v-if="type==='regular'">
                    <div class="col-md-4">
                        <div class="examinfo">
                            <label>نموذج</label>
                            <select @change="saveProgress" v-model="model" class="form-control">
                                <option v-for="m in ['A', 'B', 'C', 'D', 'E', 'F', 'G']" :key="m" :value="m">{{m}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="examinfo">
                            <div class="md-form">
                                <label>تاريخ انتهاء الامتحان</label>
                                <!-- <datepicker v-model="date.deadLine"></datepicker> -->
                                <datetime type="datetime"  use12-hour v-model="date.deadLine"></datetime>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="col-md-4">
                    <div class="examinfo">
                        <label>السنة الدراسية</label>
                        <div class="row">
                            <input @change="saveProgress" class="form-control col-md-6" min="2020" type="number" v-model.number="year" />
                            <p class="col-md-6">/{{year+1}}</p> 
                        </div>
                    </div>
                </div>
                <div class="nos col-md-4">
                    <div class="examinfo">
                        <label>عدد الاسئلة الرئيسية</label>
                        <input @change="saveProgress" class="form-control" type="number" min="1" max="10" v-model.number="numberOfQuestionsSections"/>
                    </div>
                </div>
                <div class="nos col-md-4">
                    <div class="examinfo">
                        <label>مدة الأمتحان</label>
                        <input @change="saveProgress" class="form-control" type="number" min="1" v-model.number="timer"/>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="examinfo">
                        <label>المرحلة الدراسية</label>
                        <select @change="saveProgress" class="form-control" v-model="stage">
                            <option value="one">الصف الأول</option>
                            <option value="two">الصف الثاني</option>
                            <option value="three">الصف الثالث</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="examinfo">
                        <label>رقم الامتحان</label>
                        <input @change="saveProgress" class="form-control" type="number" v-model.number="number" />
                    </div>
                </div>
            </div>
        </div>            
        <div v-if="method==='edit' || method==='saved'" class="questionsSection">
            <h2>تعديل الامتحان</h2>
            <questions-section @saveProgress="saveProgress" :section="section" @concatArraysOfQuestions="concatArraysOfQuestionsHandler" v-for="(section, i) in sections" :key="i"/>
        </div>
        <div v-if="method==='add'" class="questionsSection">
            <questions-section @saveProgress="saveProgress" :index="i" @concatArraysOfQuestions="concatArraysOfQuestionsHandler" v-for="(quesSec, i) in sections" :key="i"/>
        </div>
        <Loading v-if="loading"/>
        <button style="padding:12px 70px;" class="btn btn-primary text-center" @click="addExam">اضافة الامتحان</button>
    </div>
</template>

<script>
import axios from 'axios'
import QuestionsSection from '../../components/admin/QuestionsSection.vue'
import EditExam from '../../components/admin/editExam.vue'
import Loading from '../../components/loading.vue'
import { eventBus } from '../../main.js'
import Datepicker from 'vuejs-datepicker';
import { Datetime } from 'vue-datetime';
import $ from 'jquery'
export default {
    created() {
        const exam = JSON.parse(localStorage.getItem('exam'));
        if(this.$route.params.id) {
            const type = this.$route.params.type;
            localStorage.removeItem('exam');
            this._id = this.$route.params.id;
            axios.get('/fetchExam/'+type+'/'+this._id).then(res => {
                this.method = 'edit';
                this.sections = res.data.exam.sections;
                this.numberOfQuestionsSections = res.data.exam.sections.length;
                this.stage = res.data.exam.stage;
                this.number = res.data.exam.number;
                this.year = res.data.exam.year;
                this.timer = res.data.exam.timer;
                this.model = res.data.exam.model;
                this.type = res.data.exam.type;
                this.unit = res.data.exam.unit;
                this.name = res.data.exam.name;
                this.date.deadLine = res.data.exam.deadLine;
            });
        }
        else if(exam) {
            this.type = exam.type;
            this.unit = exam.unit;
            this.name = exam.name;
            this.method = 'saved';
            this.sections = exam.sections;
            this.numberOfQuestionsSections = exam.sections.length;
            this.stage = exam.stage;
            this.number = exam.number;
            this.year = exam.year;
            this.timer = exam.timer;
            this.model = exam.model;
            this.date.deadLine = exam.deadLine;
        } else {
            this.method = 'add';
            this.numberOfQuestionsSections = 1;
        }
    },
    components: {
        QuestionsSection,
        Loading,
        // Datepicker,
        Datetime
    },
    data() {
        return {
            numberOfQuestionsSections: 0,
            allQuestions: [],
            stage: 'one',
            sections: [],
            method: 'add',
            _id: '',
            number: 1,
            model: '',
            date: {deadLine: new Date().toString()},
            loading: false,
            year: 2020,
            timer: 0,
            type: '',
            name: '',
            unit: 1
        }
    },
    watch: {
        numberOfQuestionsSections(val) {
            let num = 0;
            for(let i=0;i<val; i++) {
                this.sections[i] = this.sections[i] || {type: '', questions: [{question: '', choices: []}]};
                num = i+1;
            }
            this.sections = this.sections.slice(0, num);
        }
    },
    methods: {
        concatArraysOfQuestionsHandler(questions) {
            this.allQuestions.push(questions);
            // this.allQuestions = [...new Set(this.allQuestions)];
        },
        saveProgress() {
            console.log('saving')
            this.allQuestions = [];
            eventBus.$emit('collectQuestions');
            const exam = {type: this.type, name: this.name, unit: this.unit, year: this.year, stage: this.stage, number: this.number, model: this.model, deadLine: this.date.deadLine, sections: this.allQuestions, timer: this.timer};
            localStorage.setItem('exam', JSON.stringify(exam));
        },
        addExam() {
            this.loading = true;
            this.allQuestions = [];
            eventBus.$emit('collectQuestions');
            const exam = this.type === 'regular'?
                {type: this.type, year: this.year, stage: this.stage, number: this.number, model: this.model, deadLine: this.date.deadLine, sections: this.allQuestions, timer: this.timer}
                :{type: this.type, name: this.name, unit: this.unit, year: this.year, stage: this.stage, number: this.number, sections: this.allQuestions, timer: this.timer};
        //    if(this.method === 'edit') {
        //         axios.post('/editExam/'+this._id, exam).then(res => {
        //             this.$store.dispatch('writemessage', 'Exam uploaded succefully');
        //             this.allQuestions = [];
        //             this.loading = false;
        //         });
        //         return;
        //     } 
            axios.post('/uploadQuestions', exam).then(res => {
                this.allQuestions = [];
                this.loading = false;
                let mess = 'مشكلة اثناء رفع الامتحان';
                if(res.data.done) {
                    mess = 'تم رفع الامتحان بنجاح';
                    if(this.method === 'add') this.newExam()
                } 
                this.$store.dispatch('writemessage', mess);
                console.log(res.data.done);
            })
        },
        newExam() {
            localStorage.removeItem('exam');
            this.method = 'add';
            this.numberOfQuestionsSections = 0;
            setTimeout(()=>{
                this.numberOfQuestionsSections = 1
            }, 200)
            this.stage = '';
            this.number = 1;
            this.year = 2020;
            this.timer = 0;
            this.model = '';
            this.date.deadLine = '';
        }
    }
}
</script>

<style lang="scss">
    @import '../../../node_modules/vue-datetime/dist/vue-datetime.css'; 
    .examinfo {
        text-align: center;
        input {
            width: 80%;
        }
    }
</style>



