<template>
    <div class="container">
        <button ref="modal_button" style="display:none" type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>

        <div id="modal" @click.prevent="" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="margin-top:110px;margin-left:auto;margin-right:auto;background-color:#333;width:90%;height:100%;" class="modal-dialog modal-lg">
                <div style="padding:5px 10px;height: 800px;overflow-y:scroll" class="modal-content">
                    <app-exam
                            v-if="solve"
                            :id="currentExamId"
                            type="regular"
                        />
                </div>
            </div>
        </div>

        <div class="stage">
            <label>Select stage</label>
            <select @change="filterExams" class="form-control" v-model="filter.stage">
                <option value="one">One</option>
                <option value="two">Two</option>
                <option value="three">Three</option>
            </select>
        </div>
        <div class="Year">
            <label>Select Year</label>
            <select @change="filterExams" class="form-control" v-model="filter.year">
                <option v-for="y in years" :key="y" :value="y">{{y}}/{{y+1}}</option>
            </select>
        </div>
        <div class="number">
            <label>Select exam number</label>
            <input @change="filterExams" class="form-control" type="number" v-model="filter.number" min="0"/>
        </div>
        <div class="number">
            <label>تجميع درجات الامتحانات ما عدا</label>
            <input @keydown="setExamsOut" class="form-control" type="text" v-model="outExams" />
        </div>
        <app-modal v-if="modal">
            <h3 class="login" slot="header">Write "confirm" to confirm delete</h3>
            <div class="modalBody" slot="body">
                <input type="text" class="form-control" ref="password"/>
                <button @click="deleteExam" class="btn btn-primary">Confirm</button>
                <button @click="modal=false" class="btn btn-primary">close</button>
            </div>
        </app-modal><br><br>
        <h3 class="text-center">Exams</h3>
<!-- Card deck -->
        <div class="row">
            <div v-for="(exams, i) of arranged_exams" :key="i" class="col-md-12 text-center">
                <button style="width:80%" class="btn btn-primary" type="button" data-toggle="collapse" :data-target="'#collapseExample'+i" aria-expanded="false" aria-controls="collapseExample">
                    {{i}} النسخ العشوائية لأمتحان رقم
                </button>
                <div class="collapse" :id="'collapseExample'+i">
                    <div class="card card-body">
                        <div class="row">
                            <div class="col-md-3" v-for="(exam, e) in exams" :key="e">
                            <v-card
                                slot="progress"
                                max-width="400"
                                :loading="loading"
                                style="padding:5px"
                                >
                                <v-img
                                    class="white--text align-end"
                                    height="200px"
                                    src="https://img2.arabpng.com/20180419/hkw/kisspng-ssc-mts-exam-test-computer-icons-educational-entra-test-paper-5ad919071997b8.5830873915241771591048.jpg"
                                >
                                </v-img>
                                <v-card-title> 
                                    العام الدراسي
                                    <p>{{exam.year}}/{{exam.year+1}}</p>
                                </v-card-title>
                                <v-card-title v-if="exam.stage==='one'">الصف الأول الثانوي</v-card-title>
                                <v-card-title v-if="exam.stage==='two'">الصف الثاني الثانوي</v-card-title>
                                <v-card-title v-if="exam.stage==='three'">الصف الثالث الثانوي</v-card-title>
                                <v-card-subtitle style="font-size:22px;font-weight:bold">Number {{exam.number}} ({{exam.model}})</v-card-subtitle>
                            
                                <v-card-actions>
                                    <v-btn
                                    color="#3f608e"
                                    text
                                    @click="()=>editExam(exam._id)"
                                    >
                                    <v-icon>edit</v-icon>
                                    </v-btn>
                            
                                    <v-btn
                                    color="#3f608e"
                                    text
                                    @click="()=>solveExam(exam._id)"
                                    >
                                    Solve
                                    </v-btn>

                                    <v-btn
                                    color="#af2828e3"
                                    text
                                    @click="()=>{examId=exam._id;modal=true}"
                                    >
                                    <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-card-actions>
                                </v-card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Modal from '../../components/modal.vue';
import Exam from '../../components/examPage/exam.vue';
export default {
    components: {
        appModal: Modal,
    },
    created() {
        this.loading = true;
        this.year = new Date().getFullYear();
        this.filterExams();
        const years = [];
        for(let y = new Date().getFullYear(); y>=2020; y--) {
            years.push(y);
        }
        this.years = years;
    },
    data() {
        return {
            exams: [],
            modal: false,
            examId: '',
            loading: false,
            years: [],
            filter: {
                stage: 'one',
                year: 2020,
                number: 0
            },
            arranged_exams: {},
            solve: false,
            currentExamId: '',
            outExams: []
        }
    },
    methods: {
        editExam(id) {
            this.$router.push('/dashboard/editExam/regular/'+id);
        },
        
        solveExam(id) {
            this.solve = false;
            this.currentExamId = id;
            setTimeout(() => {
                this.solve = true;
            }, 200);
            this.$refs.modal_button.click();
        },
        filterExams() {  
            this.loading = true;
            axios.post('/filterExams/regular', this.filter).then(res => {
                this.exams = res.data.exams;
                this.loading = false
            });
            axios.get('/getOutExams/'+this.filter.stage).then(res => {
                this.outExams = res.data.outExams;
            })
        },
        deleteExam() {
            if(this.$refs.password.value === 'confirm') {
                axios.get('/deleteExam/'+this.examId+'/'+this.year+'/'+this.stage).then(res => {
                    this.exams = res.data.exams
                    this.modal = false;
                });
            } else {
               this.$store.dispatch('writemessage', 'password isn\'t correct...'); 
            }
        },
        setExamsOut(e) {
            if(e.keyCode == '13') {
                const exams = this.outExams.split(',').map(ox => parseInt(ox));
                axios.post('/setExamsOut', {stage: this.filter.stage, exams}).then(res => {
                    console.log(res.data.done);
                    if(res.data.done) {
                        this.$store.dispatch('writemessage', 'تم تعديل الامتحانات ')
                    }
                })
            }
        },
    }, watch: {
        exams(val) {
            const arranged = {};
            let resume = true;
            let i = 1;
            while(resume) {
            const arr = val.filter(v => {
                return v.number == i
                })
            if(arr.length === 0) {
                resume = false;
                break;
                }
            arranged[i] = arr;
            i++;
            }
            this.arranged_exams = arranged;
        },
    },
    components: {
        appExam: Exam
    }
}
</script>

<style scoped lang="scss">
   .card{
  margin: 5% 0%;
}

.card-body{
  margin: 0% 0% 0% 3%;
  padding: 6% 0%;
}


</style>