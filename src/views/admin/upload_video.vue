<template>
    <div class="wrapper">
        <div class="container video-upload">
            <div v-if="edit===true" class="text-center title">تعديل معلومات الدرس</div>
            <div v-if="edit===false" class="text-center title">انشاء درس جديد</div>
            <div class="form">
                <div class="fields row">
                    <div class="col-md-6">
                        <div class="field">
                            <label>السنة الدراسية</label>
                            <input id="year" class="form-control" type="number" min="2020" v-model.number="year" placeholder="السنة"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="field">
                            <label>المرحلة الدراسية</label>
                            <select v-model="stage" class="form-control">
                                <option value="one">الصف الأول الثانوي</option>
                                <option value="two">الصف الثاني الثانوي</option>
                                <option value="three">الصف الثالث الثانوي</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="field">
                            <label>رقم الوحدة</label>
                            <input v-model.number="unit" class="form-control" type="number" min="1" placeholder="رقم الوحدة"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="field">
                            <label>رقم الدرس</label>
                            <input v-model.number="number" class="form-control" type="number" min="1" placeholder="رقم الدرس"/>
                        </div>
                    </div>
                    
                    <div class="field col-md-12">
                        <label>عنوان الدرس</label>
                        <input v-model="name" class="form-control" type="text" placeholder="عنوان الدرس"/>
                    </div>
                    <div class="field col-md-12">
                        <label>الشرح</label>
                        <textarea v-model="explain" class="form-control" type="text" >الشرح</textarea>
                    </div>
                    <div class="field col-md-12">
                        <label>نوع الفيديو</label>
                        <select v-model="method" class="form-control">
                            <option disabled value="upload">من الجهاز</option>
                            <option value="embedded">رابط يوتيوب مدمج</option>
                        </select>
                    </div>
                    <div  class="field upload2 col-md-12">
                        <label>رابط الفيديو</label>
                        <div v-if="method==='upoad'">
                            <input @change="getVideo" type="file" style="display:none" ref="vid"/>
                            <img 
                                style="cursor:pointer"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEX///8AAAClpaWenp6ampqgoKCoqKitra339/eCgoKOjo7ExMQwMDDs7Ow1NTXNzc3e3t5ISEiSkpIFFcMNAAADS0lEQVR4nO3dbU/iQBSGYSpSEMGX/f8/djMRhNJ2OkdOn/ZM7vuTyZqHudIWN3F1NxsiY19LH2Du9s1+6SPMW9s0zcvSh5izXZPaLn2M+do2P70ufZC52jXXKr2KN2ClxG1zX4U3ahdYIfERWN2NuusBKyP2r2BlxGFgRc/iGLAa4tAzWNWNmgNWQRy/RSu5UaeA4YkdYPv70b6aG7XzDL5ufj/sygMTHx03YSXEnuJO+Hh5Q9a/TPfC7h+HJA5cpI4w/I06dBd2hcGJg6d/EIZ+Focvz6MwMHHkXaQnDHujjl2avjAocfTUA8KQxPEzDwkDPouZizIoDPelP3dJhoXBbtTsPTciDEXMn3VMGOhZnLgYo8IwxKn3jHFhkBt18kJkhCGI02fMCQMQC06YFa6e+F5wvrywS3yf76h/7FRwASaEHeJproP+ubvDjb7bTwk7xHmO+UQlj9D06XcrFp6mgQXCG3F9d+n1nSb3F5KS63O9Udf3TrP5+a5Em/uUojuwYGepzu2xPWc/o+wZm95Zb+t9F/EKYfwQxg9h/BDGD2H8EMYPYfwQxg9h/BDGb5XC6X+J3ul4yI0VCQ9H20s++324F9vLNR85Yonw8GF8xWd/cNoqbN6eFL5ZX1AuzJ3e9DkIEc4mrP45rP69dIGvh25Cj19JUiQsbO8u9PiNJJ5Ct4MhNIXQEkL9UAqhJYT6oRRCSwj1QymElhDqh1IILSHUD6UQWkKoH0ohtIRQP5RCaAmhfiiF0BJC/VAKoSWE+qEUQksI9UMphJYQ6odSCC0h1A+lEFpCqB9KIbSEUD+UQmgJoX4ohdASQv1QCqElhPqhFEJLCPVDKYSWEOqHUvULvy9b3w5b6xR+XrY+HbbWKbz84KfHj6OuVbg5t/+cfoPuWoV+IdQPeYdQP+QdQv2Qdwj1Q94h1A95h1A/5B1C/ZB3CPVD3iHUD3mHUD/kHUL9kHcI9UPeIdQPeYdQP+QdQv2Qdwj1Q94h1A95h1A/5B1C/ZB3CPVD3iHUD3mHUD/kHUL9kHcI9UPeIdQPeYdQP+QdQv2Qdwj1Q94h1A95h1A/5B1C/ZB3CPVD3iG0D7n88K5j/v+X7GpDiBDh8iFEiHD5poT/AZDtIkjSvJ7YAAAAAElFTkSuQmCC" 
                                width="70px" height="70px" @click="$refs.vid.click()"
                            />
                            <div>{{videoName}}</div>
                        </div>
                        <input v-if="method==='embedded'" class="form-control" v-model="video" type="text" placeholder="ضع رابط يوتويب المدمج هنا"/>
                    </div>
                    <div class="field upload1 col-md-12">
                        <label>ارفع ملف</label>
                        <input @change="getFile" type="file" ref="file"/>
                        <!-- <img 
                            style="cursor:pointer"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEX///8AAAClpaWenp6ampqgoKCoqKitra339/eCgoKOjo7ExMQwMDDs7Ow1NTXNzc3e3t5ISEiSkpIFFcMNAAADS0lEQVR4nO3dbU/iQBSGYSpSEMGX/f8/djMRhNJ2OkdOn/ZM7vuTyZqHudIWN3F1NxsiY19LH2Du9s1+6SPMW9s0zcvSh5izXZPaLn2M+do2P70ufZC52jXXKr2KN2ClxG1zX4U3ahdYIfERWN2NuusBKyP2r2BlxGFgRc/iGLAa4tAzWNWNmgNWQRy/RSu5UaeA4YkdYPv70b6aG7XzDL5ufj/sygMTHx03YSXEnuJO+Hh5Q9a/TPfC7h+HJA5cpI4w/I06dBd2hcGJg6d/EIZ+Focvz6MwMHHkXaQnDHujjl2avjAocfTUA8KQxPEzDwkDPouZizIoDPelP3dJhoXBbtTsPTciDEXMn3VMGOhZnLgYo8IwxKn3jHFhkBt18kJkhCGI02fMCQMQC06YFa6e+F5wvrywS3yf76h/7FRwASaEHeJproP+ubvDjb7bTwk7xHmO+UQlj9D06XcrFp6mgQXCG3F9d+n1nSb3F5KS63O9Udf3TrP5+a5Em/uUojuwYGepzu2xPWc/o+wZm95Zb+t9F/EKYfwQxg9h/BDGD2H8EMYPYfwQxg9h/BDGb5XC6X+J3ul4yI0VCQ9H20s++324F9vLNR85Yonw8GF8xWd/cNoqbN6eFL5ZX1AuzJ3e9DkIEc4mrP45rP69dIGvh25Cj19JUiQsbO8u9PiNJJ5Ct4MhNIXQEkL9UAqhJYT6oRRCSwj1QymElhDqh1IILSHUD6UQWkKoH0ohtIRQP5RCaAmhfiiF0BJC/VAKoSWE+qEUQksI9UMphJYQ6odSCC0h1A+lEFpCqB9KIbSEUD+UQmgJoX4ohdASQv1QCqElhPqhFEJLCPVDKYSWEOqHUvULvy9b3w5b6xR+XrY+HbbWKbz84KfHj6OuVbg5t/+cfoPuWoV+IdQPeYdQP+QdQv2Qdwj1Q94h1A95h1A/5B1C/ZB3CPVD3iHUD3mHUD/kHUL9kHcI9UPeIdQPeYdQP+QdQv2Qdwj1Q94h1A95h1A/5B1C/ZB3CPVD3iHUD3mHUD/kHUL9kHcI9UPeIdQPeYdQP+QdQv2Qdwj1Q94h1A95h1A/5B1C/ZB3CPVD3iG0D7n88K5j/v+X7GpDiBDh8iFEiHD5poT/AZDtIkjSvJ7YAAAAAElFTkSuQmCC" 
                            width="20px" height="20px" @click="$refs.file.click()"
                        /> -->
                        <!-- <div>{{fileName}}</div> -->
                    </div>
                    <!-- <div class="container my-4">
                        <hr>
                        <p style="text-align:center;color:#fff;" class="font-weight-bold">الطلبة المسموح لهم الفيديو</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="custom-control custom-checkbox">
                                    <input v-model="checkAll" type="checkbox" class="custom-control-input" :id="'check'">
                                    <label class="custom-control-label" :for="'check'">Check all</label>
                                </div>
                            </li>
                            <li class="list-group-item"> -->
                            <!-- Default checked -->
                            <!-- <div v-for="(student, s) in students" :key="student.username" class="custom-control custom-checkbox">
                                <input v-model="checked_students[s]" type="checkbox" class="custom-control-input" :id="'check'+s">
                                <label class="custom-control-label" :for="'check'+s">{{student.fullname}}</label>
                            </div>
                            </li>
                        </ul>
                    </div> -->
                </div>

                <div class="preview" v-if="video">
                    <video v-if="method==='upload'" controls>
                        <source :src="this.videoName" type="video/mp4"/>
                    </video>
                    <iframe width="100%" height="300px" v-if="method==='embedded'" :src="this.video"></iframe>
                </div>

                <div v-if="loading || message || progress" class="process">
                    <loading color="#fff" v-if="loading && progress === 0"/>
                    <div v-if="message" style="font-size:22px" class="alert alert-success text-center" role="alert">
                        {{message}}
                    </div>
                    <div v-if="progress>0" class="progress">
                        <div class="progress-bar" :style="'width:'+progress+'%'">{{progress}}%</div>
                    </div>
                </div>
                
                <div class="btn">
                    <button style="margin-top:20px;" @click="uploadVideo" class="btn btn-danger">Upload video</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Loading from '../../components/loading.vue'
export default {
    components: {
        Loading
    },
    async mounted() {
        await this.getStudents();
        const params = this.$route.params;
        if(params.id) {
            axios.get('/fetchVideo/'+params.id).then(async res => {
                this.video = res.data.video.videoPath;
                this.method = this.video.split('youtube').length>1?'embedded': 'upload';
                this.videoName = res.data.video.videoPath;
                this.file = res.data.video.filePath;
                this.fileName = res.data.video.filePath;
                this.name = res.data.video.name;
                this.number = res.data.video.number;
                this.stage = res.data.video.stage;
                await this.getStudents();
                this.id = res.data.video._id;
                this.edit = true;
                this.explain = res.data.video.explain;
                this.checked_students = [...this.students].map(stud => {
                    let ok = false;
                    [...res.data.video.students].forEach(st => {
                        if(st == stud._id) ok = true;
                    })
                    return ok;
                 });
                 console.log(this.checked_students);
                // this.publicId = res.data.video.publicId;
            })
        }
    },
    data() {
        return {
            edit: false,
            unit: 1,
            number: 1,
            name: null,
            year: 2020,
            stage: 'one',
            explain: '',
            id: null,
            progress: 0,
            video: null,
            videoName: '',
            file: '',
            fileName: '',
            fileExist: false,
            method: 'embedded',
            loading: false,
            message: null,
            students: [],
            checked_students: [],
            choosen_students: [],
            checkAll: false
        }
    },
    watch: {
        message(val) {
            setTimeout(() => {this.message = null;}, 3000)
        },
        checked_students(val) {
            this.choosen_students = [];
            [...this.students].forEach((student, s) => {
                if(val[s]) {
                    this.choosen_students.push(student._id);
                } 
            });
            console.log(this.choosen_students)
        },
        checkAll(val) {
            if(val === true) this.checked_students = [...this.students].map(s => {return true});
            if(val === false) this.checked_students = [...this.students].map(s => {return false});
        }
    },
    methods: {
        getVideo(event) {
            const file =  event.target.files[0];
            if(file.type !== 'video/mp4') {
                alert('صيغة الفيديو غير مسموح بيها');
                return;
            }
            if(file.size > 500*1000000) {
                alert('حجم الفيديو أكبر من المسموح به');
                return;
            }
            this.videoName = file.name;
            this.video = file;
            if(this.video.size > 0) this.videoExist = true;
        },
        getFile(event) {
            const file =  event.target.files[0];
            // if(file.type !== 'video/mp4') {
            //     alert('صيغة الفيديو غير مسموح بيها');
            //     return;
            // }
            if(file.size > 10000000) {
                alert('حجم الملف أكبر من المسموح به');
                return;
            }
            this.fileName = file.name;
            this.file = file;
            if(this.file.size > 0) this.fileExist = true;
        },
        getStudents() {
            this.checked_students = [];
            this.choosen_students = [];
            axios.get('/getStageUsers/'+this.stage).then(res => {
                this.students = res.data.users;
                if(!this.edit) this.checked_students = [...this.students].map(s => {return false});
            });
        },
        uploadVideo() {
            if(this.name && this.number && this.stage && this.video) {
                console.log(this.choosen_students[0])
                const formData = new FormData();
                formData.append('unit', this.unit);
                formData.append('number', this.number);
                formData.append('name', this.name);
                formData.append('year', this.year);
                formData.append('stage', this.stage);
                formData.append('video', this.video);
                formData.append('date', new Date());
                formData.append('file', this.file);
                formData.append('explain', this.explain);
                // formData.append('students', JSON.stringify(this.choosen_students));
                this.loading = true;
                axios.post('/uploadVideo', formData, {
                    onUploadProgress: progress => {
                        var val = Math.floor((progress.loaded / progress.total)*100);
                        this.progress = val === 100?0: val;
                    }
                }).then(res => {
                    this.loading = false;
                    if(res.data.done) {
                        this.message = 'تم رفع الفيديو بنجاح';
                    } else {
                        this.message = 'حدثت مشكلة اثناء رفع الفيديو';
                    }
                })
            } else {
                alert('كمل بقيت البيانات وأرفع الفيديو')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    background-image: url('https://media.istockphoto.com/photos/movie-projector-on-dark-background-picture-id1007557230?k=6&m=1007557230&s=612x612&w=0&h=2c6NHjfH4sWCgTNoZCDLQx10_PdIfl-dI-nyZ9wF_jI=');
    background-repeat: no-repeat;
    // background-color: #000;
    background-position: center;
    background-size: cover;
    .video-upload {
        direction: rtl;
        width: 70%;
        @media only screen and (max-width: 600px) {
            width: 95%;
        }
        .title {
            font-size: 58px;
            font-weight: bold;
            color:rgb(228, 231, 231);
            margin-bottom: 14px;
        }
        .form {
            background-color: rgba(97, 94, 89, 0.74);
            padding: 35px;
            .fields {
                .field {
                    margin: 8px;
                    label {
                        float: right;
                        color: rgb(228, 231, 231);
                        font-size: 24px;
                        font-weight: bolder;
                    }
                    input, textarea, select {
                        background-color: rgb(230, 228, 228);
                        box-shadow: 5px 10px 8px 2px #888888;
                    }
                }
            }
        }
    }
    .mess {
        background-color:green;
        padding:10px 0px;
        color:#fff;
        font-size: 16px;
        font-weight: bold;
    }
}
    
</style>