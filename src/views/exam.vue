<template>
    <div>
        <div class="text-center" style="margin-top:100px;" v-if="notAuthorized === true">لست مشترك في هذه الخدمة</div>
        <div v-if="notAuthorized === false">
            <button ref="order" style="display:none" type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>

            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <students-order side="user" type="exams"/>
                    </div>
                </div>
            </div>

            <div v-if="loading" style="background-color: #6c757de3;height:100%;width:100%;position:absolute;z-index:13;padding-top:auto"><app-loading/></div>
        
            <Exams-drawer 
                :currentExamHandler="currentExamHandler" 
                :currentExamNumber="currentExamNumber"
                :exams="exams"
                :getExamResult="getExamResult"
                :currentExam="currentExam"
                :drawer="drawer"
                :lessonsHandler="lessonsHandler"
                :getInstructions="getInstructions"
                :refreshExamsList="refreshExamsList"
                :unSolvedExamsNumbers="unSolvedExamsNumbers"
            />


        <!--CONTENT-->
        
            <v-content class="content">
                <v-container fluid>                
                    <div v-if="currentPage==='instructions'">
                        <v-alert
                        v-for="(instruction, i) in instructions.split('/')" :key="i"
                        color="blue-grey"
                        dark
                        dense
                        icon="mdi-school"
                        prominent
                        >
                        <p style="text-align:right;font-size:25px;">{{instruction}}</p>
                        </v-alert>
                    </div>
                <!-----------------------------Exams REsults--------------------->
                
                <app-previous-exams
                    v-if="currentPage==='results'"
                    :examResult="examResult"
                />

                <!--------------------------------Exam Results ---------------------------->
                <app-exam
                    v-if="currentPage==='exam'"
                    :number="number_of_exam_to_do"
                    :getUserPreviousExams="getUserPreviousExams"
                    :refreshExamsList="refreshExamsList"
                    :getExamResult="getExamResult"
                    type='regular'
                />
            </v-container>
        </v-content>
        </div>
    </div>
</template>

<script>
    import StudentsOrder from '../components/students-order.vue'
    import loading from '../components/loading.vue';
    import ExamsDrawer from '../components/examPage/examsDrawer.vue';
    import Exam from '../components/examPage/exam.vue';
    import PreviousExams from '../components/examPage/previous_exams.vue';
    import axios from 'axios';
    import {eventBus} from '../main.js'
    
    export default {
        created() {
            axios.post('/getUserData', {_id: localStorage.getItem('userId')}).then(res => {
                if(res.data.userdata.type === 'exams') {
                    this.notAuthorized = false;
                } else {
                    setTimeout(() => {
                        this.$router.replace('/');
                    }, 2000)
                }
            });
        },
        mounted() {
            this.loading = true;
            this.getUserPreviousExams();
        },
        data() {
            return {
                startExam: false,
                currentExam: 'أمتحان',
                currentExamNumber: 0,
                isResult: false,
                examResult: {},
                notFound: false,
                examDone: true,
                exams: [],
                instructions: 'في انتظار الارشادات أو التعليمات',
                loading: false,
                ready: false,
                lessons: false,
                currentPage: 'instructions',
                number_of_exam_to_do: 1,
                unSolvedExamsNumbers: [],
                notAuthorized: true
            }
        },
        computed: {
            drawer() {
                return this.$store.getters.drawer;
            },
            userId() {
                return this.$store.getters.userId;
            },
            order_modal() {
                return this.$store.getters.order_modal;
            }
        },
        watch: {
            order_modal(val) {
                this.$refs.order.click();
            }
        },
        methods: {
            getUserPreviousExams() {
                axios.get('/getStudentExams/'+this.$store.getters.userId).then(res => {
                    this.exams = res.data.exams;
                    //this.getInstructions();
                    this.loading = false;
                })
            },
            refreshExamsList() {
                axios.get('/getUnsolvedExams/'+this.$store.getters.stage+'/'+this.$store.getters.userId).then(res=>{
                    console.log(res.data.unSolvedExamsNumbers);
                    this.unSolvedExamsNumbers = res.data.unSolvedExamsNumbers;
                })
            },
            getExamResult(exam) {
                this.examResult = {};
                this.currentPage = 'results';
                this.examResult = exam;
                this.currentExamNumber = exam.number;
            },
            getInstructions() {
                this.currentExamNumber = 0;
                axios.get('/getAdminData').then(res => {
                    this.instructions = res.data.adminData.instructions || '';
                    this.ready = true;
                    this.currentPage = 'instructions';
                });
            },
            currentExamHandler(number) {
                this.number_of_exam_to_do = number;
                this.currentPage = '';
                setTimeout(()=>{
                    this.currentPage = 'exam';
                }, 100);
            },
            lessonsHandler() {
                this.currentPage = 'lessons';
            },
            logout() {}
        },
        components: {
            appLoading: loading,
            ExamsDrawer,
            appExam: Exam,
            appPreviousExams: PreviousExams,
            StudentsOrder
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        //background-image: radial-gradient(rgba(45, 202, 223, 0.575), rgba(65, 114, 126, 0.5), rgb(255, 255, 255));
    }
    .mainn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
    }
    .items {
        margin-top: 30px;
        display: flex;
        flex-direction: row;
    }
    .titlee {
        margin: 20px;
        color: rgb(67, 65, 78);
        font-weight: bold;
    }
    
</style>