<template>
    <div class="exam-page">
        <loading v-if="loading"/>
        <div v-if="type==='exam' && !loading && !examDone">
            <div v-if="!startExam" class="startQuiz">
                <button @click="()=>{startExamHandler()}" class="btn btn-primary startExam">ابدأ الأمتحان</button>
            </div>
            <section v-if="startExam" class="exam">
                <v-system-bar/>
                <div style="text-align:center;margin-bottom:30px;color:#6b364a;font-weight:bold">
                    <h2 class="timer" :class="timerAlert?'timerAlert': 'timerRegular'">{{timer}}</h2>
                    <h3 >({{exam.number}})امتحان رقم </h3>

                    <h4 v-if="exam.stage==='one'"> المرحلة <strong> الأولى </strong></h4>
                    <h4 v-if="exam.stage==='two'"> المرحلة <strong> الثانية </strong></h4>
                    <h4 v-if="exam.stage==='three'"> المرحلة <strong> الثالثة </strong></h4>

                    <h4><Strong>({{exam.year+'/'+(exam.year+1)}})</strong> العام الدراسي</h4>
                    <h4><Strong>({{exam.year+'/'+(exam.year+1)}})</strong> ({{exam.unit}})الوحدة</h4>
                </div>
                <div v-for="(section, s) in exam.sections" :key="s" class="section">
                    <h4 v-if="section.type.split('http').length===1" style="margin:20px;text-decoration:underline;color:#555">{{section.type}}</h4>
                    <img  v-if="section.type.split('http').length>1" :src="section.type"/>
                    <div style="margin-left: 40px;margin-top:10px;" v-for="(question, q) in section.questions" :key="q"  class="question">
                        <div class="examResultsQuestionAndDegree">
                            <h5 v-if="question.question.split('http').length===1">{{q+1}}-{{question.question}}</h5>
                            <img v-if="question.question.split('http').length>1" :src="question.question"/>
                            <v-textarea
                            v-if="question.choices.length===0"
                            v-model="sections[s].questions[q].answer"
                            label="The Answer"
                            auto-grow
                            outlined
                            rows="3"
                            row-height="25"
                            shaped
                            ></v-textarea>
                            <v-radio-group v-if="question.choices.length>0" v-model="sections[s].questions[q].answer">
                                <v-radio
                                style="margin-left: 20px;font-weight:bolder;color:#555;"
                                    v-for="(choice, c) in question.choices"
                                    :key="c"
                                    :label="choice"
                                    :value="choice"
                                ></v-radio>
                            </v-radio-group>
                        </div>
                    </div>
                </div>
                <button @click="submitAnswers" type="button" class="btn btn-primary">Submit answers</button>
                <v-divider/>
            </section>
        </div>
        <exam-result 
            v-if="type==='solution'"
            :examResult="solution"
        />
    </div>
</template>

<script>
import axios from 'axios'
import Loading from '../loading.vue'
import ExamResult from '../examPage/previous_exams.vue'
import { constants } from 'crypto'
export default {
    components: {
        Loading,
        ExamResult
    },
    props: ['id', 'refreshData'],
    data() {
        return {
            exam: {},
            solution: {},
            sections: [],
            timer: '00:00',
            timerAlert: false,
            examDone: false,
            notFound: false,
            startExam: false,
            loading: false,
            type: ''
        }
    },
    copmputed: {
    },
    async created() {
        this.loading = true;
        const res = await axios.get('getVisitorExam/'+this.id+'/'+localStorage.getItem('userId'));
        this.loading = false;
        if(res.data.type === 'exam') {
            this.type = 'exam';
            this.exam = res.data.exam;
            this.sections = this.exam.sections;
        } else if(res.data.type === 'solution') {
            this.solution = res.data.solution;
            this.type = 'solution';
        }
    },
    methods: {
        submitAnswers() {
            let completed = true;
            this.sections.forEach(sec => {
                sec.questions.map(ques => {
                    if(ques.answer === '') completed = false;
                })
            })
            if(completed) {
                this.sendAnswers();
            } else {
                this.$store.dispatch('writemessage', 'Complete your answers...')
            }
        },
        sendAnswers() {
            const solutionModel = {
                userId: localStorage.getItem('userId'),
                examId: this.exam._id,
                year: this.exam.year,
                number: this.exam.number,
                stage: this.exam.stage,
                unit: this.exam.unit,
                sections: this.sections
            };
            if(this.examDone) return;
            this.examDone = true;
            axios.post('/sendSolution', solutionModel).then(res => {
                if(res.data.done) {
                    localStorage.removeItem('timer');
                    this.examDone = true;
                    this.$store.dispatch('writemessage', 'تم ارسال الامتحان للتصحيح بنجاح');

                } else if(res.data.exam) {
                    localStorage.removeItem('timer');
                    this.examDone = true;
                    this.$store.dispatch('writemessage', 'تم الاجابة على الامتحان و تم التصحيح التلقائي');
                    this.solution = res.data.exam;
                    this.refreshData();
                    console.log(this.solution);
                    this.type = 'solution';
                } else {
                    this.examDone = false;
                }
            })
        },
        startExamHandler() {
            if(!localStorage.getItem('timer')) {
                localStorage.setItem('timer',new Date(new Date().getTime()+this.exam.timer*60000));
            }
            this.setTimer();
            this.startExam = true;
        },
        
        setTimer() {
            setTimeout(() => {
                localStorage.removeItem('timer');
                this.sendAnswers();
                clearInterval(counter);

            }, new Date(localStorage.getItem('timer')).getTime()- new Date().getTime() )
            
            const counter = setInterval(() => {
                const time = Math.ceil(new Date(localStorage.getItem('timer')).getTime()- new Date().getTime());
                let minutes = Math.floor(time / 60000);
                minutes = minutes < 1?0: parseFloat(minutes).toFixed(0);
                let seconds = Math.floor((time%60000)/1000).toFixed(0);
                if(seconds < 10) seconds = '0'+seconds;
                this.timer = `${minutes}:${seconds}`;
                if(minutes < 1 && seconds < 60) {
                    this.timerAlert = !this.timerAlert;
                }
            }, 1000);
        },
    }
}
</script>

<style lang="scss" scoped>
.exam-page {
        overflow-y: scroll;
        padding: 20px 10px;
        height: 700px;
        @media(max-height: 700px) {
            height: 400px;
        }
    }
    .exam {
        .timer {
            width: 120px;
            border-radius: 30px;
            padding: 4px 12px;
            margin-top: 3px;
            color: #fff;
            position:fixed;
            left:70%;
            right:0;
            text-shadow: 2px 2px 4px #666;
            border: solid 1px rgba(21, 70, 28, 0.733);
            box-shadow: #555;
        }
        .timerAlert {
            background-image: radial-gradient(rgb(151, 14, 14), rgb(212, 64, 64), rgb(221, 80, 80));
            font-size: 39;
        }
        .timerRegular {
            background-image: radial-gradient(rgb(5, 95, 95), rgb(13, 105, 133), rgb(49, 158, 185));
            font-size: 32;
        }
    }
    
    .startQuiz {
        text-align: center;
        button {
            width: 200px;
            height: 200px;
            border-radius: 100px;
            margin-top: 20%;
            font-size: 22px;
            box-shadow:3px 2px 4px #555;
        }
    }
</style>