<template>
    <div>
        <!--jumbotron-->
        <div class="container-fluid text-center heading">
            
        <h1 class="h1">منصة القائد <span>.</span>لتدريس اللغة الألمانية</h1>
        <h2 class="h2">لطلبة الثانوية العامة</h2>
        </div>
        <div style="margin-top:50px;" class='wrapper d-flex align-items-stretch'>
            <nav id='SideBar' style=''>
                <div class='p-4 pt-5'>
                    <div class="progress">
                        <div :style="'width:'+animated_progress+'%'" class="fill"></div>
                        <a href='#' class='circle'></a>
                        <a href='#' class='overlay'>{{animated_progress}}%</a>
                    </div>
                    <h2 style="color:#fff" class="text-center mb-5">قائمة الفيديوهات</h2>
                    <ul class='list-unstyled components mb-5'>
                        <li class="lessons" v-for="(_ ,i) in exams" :key="i">
                            <a :href="'#home'+i" data-toggle='collapse' class="dropdown"> ({{i+1}}) {{exams[exams.findIndex(e=>{return e.number === i+1})].name}}</a>
                            <ul class='lesson-exam collapse list-unstyled' :id="'home'+i">
                                <li style="font-size:19px;" @click="()=>{startLesson(lessons[lessons.findIndex(l=>{return l.number === i+1})])}" v-if="type==='fullCourse' && lessons.length > 0">
                                    <a alt="video" data-toggle="modal" data-target="#modal1">فيديو ({{lessons[lessons.findIndex(l=>l.number === i+1)].name}})</a>
                                </li>
                                <li style="font-size:19px;" @click="()=>{startExam(exams[exams.findIndex(e=>{return e.number === i+1})])}">
                                    <a data-toggle="modal" data-target="#modal1">امتحان ({{exams[exams.findIndex(e=>{return e.number === i+1})].name}})</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <!-- Page Content -->
            
            <div id='content' class='p-4 img' >
                <div class="row">
                    <button type='button' id='sidebarCollapse' class='btn btn-dark ' >
                        <i class='fa fa-th-list'></i>
                    </button>
                    <!-- Grid column -->
                    <div class="col-lg-4 col-md-12 mb-4">
                
                    <!--Modal: Name-->
                    <div style="height:auto" class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                
                        <!--Content-->
                        <div style="height:100%;margin-top:11%" class="modal-content">
                
                            <!--Body-->
                            <div class="modal-body mb-0 p-0">
                                <div class="">
                                <visitor-exam
                                    v-if="openExam"
                                    :id="exam._id"
                                    :refreshData="refreshData"
                                />
                                <lesson
                                    v-if="openLesson"
                                    :lesson="lesson"
                                />
                                </div>
                            </div>
                
                            <!--Footer-->
                            <div class="modal-footer justify-content-center">
                            <a type="button" class="btn-floating btn-sm btn-fb"><i class="fa fa-facebook-f"></i></a>
                            <!--Twitter-->
                            <a type="button" class="btn-floating btn-sm btn-tw"><i class="fa fa-twitter"></i></a>
                            <!--Google +-->
                            <a type="button" class="btn-floating btn-sm btn-gplus"><i class="fa fa-google"></i></a>
                            <!--Linkedin-->
                            <a type="button" class="btn-floating btn-sm btn-ins"><i class="fa fa-linkedin"></i></a>
                
                            <button type="button" class="btn btn-outline-primary btn-rounded btn-md ml-4" data-dismiss="modal">أغلق</button>
                
                            </div>
                
                        </div>
                        <!--/.Content-->
                        </div>
                    </div>
                    <!--Modal: Name-->
                    </div>
            
                </div> 
                <div style="background-color:#ffffffad"> 
                    <students-order v-if="openStudentOrder" side="user" type="examsOnly"/>
                </div>
            </div>
        </div>
    </div>
</template>








<script>
import VisitorExam from '../../components/visitors/visitor-exam.vue'
import Lesson from '../../components/visitors/lesson.vue'
import StudentsOrder from '../../components/students-order.vue'
import axios from 'axios'
export default {
    components: {
        VisitorExam,
        Lesson,
        StudentsOrder
    },
    mounted() {
		document.getElementById('sidebarCollapse').onclick=function(){
            let element=document.getElementById('SideBar')
            if(element.classList.contains('active')){
                element.classList.remove('active')
            }else{
                element.classList.add('active')
            }
        }
    },
    created() {
        const unit = this.$route.params.unit;
        axios.post('/getUserData', {_id: localStorage.getItem('userId')}).then(res => {
            const userData = res.data.userdata;
            this.type = userData.type;
            if(!userData.units.includes(parseInt(unit))) {
                this.$router.replace('/');
            } else {
                axios.get('/getVisitorExams/'+localStorage.getItem('stage')+'/'+unit).then((res) => {
                    this.exams = res.data.exams;
                });
                if(this.type === 'fullCourse') {
                    axios.get('/fetchVideos/'+localStorage.getItem('userId')+'/'+new Date().getFullYear()+'/'+localStorage.getItem('stage')+'/'+unit).then((res) => {
                        this.lessons = res.data.videos;
                    });
                }
                this.refreshData();
            }
        });
    },
    data() {
        return {
            type: "",
            exams: [],
            lessons: [],
            exam: {},
            lesson: {},
            openExam: false,
            openLesson: false,
            animated_progress: 0,
            progress: 0,
            openStudentOrder: false
        }
    },
    computed: {
    },
    watch: {
        progress(val) {
            clearInterval(interval);
                const interval = setInterval(() => {
                    if(val ==  this.animated_progress) {
                        clearInterval(interval);
                    } else {
                        if((val - this.animated_progress) > 0) this.animated_progress++;
                        else if((val - this.animated_progress) < 0) this.animated_progress--;
                    }
                }, 30);
        }
    },
    methods: {
        startExam(exam) {
            this.openLesson = false;
            this.openExam = false;
            this.exam = exam;
            setTimeout(()=>{this.openExam = true;}, 200)
        },
        startLesson(lesson) {
            this.openExam = false;
            this.openLesson = false;
            this.lesson = lesson;
            setTimeout(()=>{this.openLesson = true;}, 200)
        },
        refreshData() {
            this.openStudentOrder = false;
            setTimeout(() => {
                this.openStudentOrder = true;
            }, 100);
            axios.get('/getVisitorProgress/'+localStorage.getItem('stage')+'/'+localStorage.getItem('userId')).then(res => {
                this.progress = res.data.progress;
            })
        }
    }
}
</script>


<style scoped lang="scss">
    // @import url('../../assets/styles2/css/bootstrap-rtl.css');

    @import url( https://fonts.googleapis.com/css2?family=Lemonada:wght@700&family=Rakkas&display=swap);
    /* @import url('../../assets/styles2/css/styles.css'); */
    .title {
        font-size: 40px;
    }
    .progress {
        position: relative;
        width: 160px;
        height: 160px;
        border-radius: 50%;
        margin-right: auto;
        margin-left: auto;
        box-shadow: 2px 1px 2px #444;
        .fill {
            height: 100%;
            width: 75%;
            position: absolute;
            top: 0%;
            right: 0%;
            overflow: hidden;
            background-color: rgb(20, 62, 139);
            background-image: linear-gradient(180 deg,  #2b14ad81 0%, #6a6baa8e 100%, rgb(23, 23, 122));
        }
        .circle {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.144);
            position: absolute;
            top: 0%;
            right: 0%;
        }
        .overlay {
            width: 90%;
            height: 90%;
            border-radius: 50%;
            background-color: rgb(165, 42, 58);
            background-image: linear-gradient(-45deg, #5c481dee 0%, #cfcfe4 100%);
            position: absolute;
            top: 5%;
            right: 5%;
            text-align: center;
            font-size: 30px;
            font-weight: bolder;
            padding-top: 48%;
            text-decoration: none;
            color: rgb(18, 67, 99)
        }
    }
    .lessons {
        width: 100%;
        .dropdown {
            color: rgb(215, 229, 233);
            font-weight: bolder;
            font-size: 24px;
            background-image: linear-gradient(-45deg, #1e2a4e 0%, #2975d8 100%);
            padding: 1px 13px;
            margin-top: 15px;
            float: right;
            width: 100%;
        }
        .lesson-exam {
            li {
                list-style: none;
                float: right;
            }
        }
       
    }
</style>