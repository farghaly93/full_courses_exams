<template>
    <div class="container" style="margin-top:00px;">
        
        <v-alert
        color="#1f7b8a"
        dark
        dense
        prominent
        >
        <p class="text-center" style="font-size:28px;font-weight:bold;color:#fff;">فيديوهات الدروس</p>
        </v-alert>
        <div class="filter">
          <label>العام الدراسي</label>
          <input class="form-control" v-model.number="year" type="number" min="2020"/>
          <br>
          <label>الصف الدراسي</label>
          <select v-model="stage" class="form-control">
              <option value="one">الصف الأول الثانوي</option>
              <option value="two">الصف الثاني الثانوي</option>
              <option value="three">الصف الثالث الثانوي</option>
          </select>
          <br>
          <label>رقم الوحدة</label>
          <input class="form-control" v-model.number="unit" type="number" min="1"/>
        </div>
        <button ref="modal_button" style="display:none" type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>


        <div id="modal" @click.prevent="" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div style="margin-top:30px;margin-left:auto;margin-right:auto;background-color:#333;width:90%;height:100%;" class="modal-dialog modal-lg">
            <div style="height: 800px;overflow-y:scroll" class="modal-content">
                <video style="width:100%;height:100%;" v-if="ready && video.videoPath.split('youtube').length===1" :src="video.videoPath" controls></video>
                <iframe v-if="ready && video.videoPath.split('youtube').length>1" width="100%" height="100%" :src="video.videoPath" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div class="explain">
                    <div style="color:#555;font-weight:bolder;font-size:28px;" class="text-center">شرح وملحوظات</div>
                    <div class="exp" v-for="(txt, i) in video.explain?video.explain.split('/'):''" :key="i">
                    {{txt}}
                    </div>
                </div>
                <div class="text-center" style="margin:20px;">
                <a target="_blank" :href="video.filePath?video.filePath:''" class="btn"><i class="fa fa-download"></i> تنزيل الملفات الملحقة بالدرس</a>
                </div>
            </div>
        </div>
        </div>

        <loading v-if="loading"/>
        <div v-if="!loading">
          <div style="width:100%" v-for="vid in videos" :key="vid._id" class="movie_card" id="ave">
            <div class="info_section">
                <div class="movie_header">
                <img class="locandina" src="https://i7.pngguru.com/preview/75/67/795/teacher-education-computer-icons-school-lesson-plan-icon-teachers-download.jpg"/>
                <h1>{{vid.name}}</h1>
                <p style="color:#999">{{vid.date | moment("dddd, MMMM Do YYYY")}}</p>
                <h3 class="minutes">فيديو رقم  {{vid.number}}</h3>
                <p class="type" v-if="vid.stage==='one'">الصف الأول الثانوي</p>
                <p class="type" v-if="vid.stage==='two'">الصف الثاني الثانوي</p>
                <p class="type" v-if="vid.stage==='three'">الصف الثالث الثانوي</p>
                </div>
                <div class="movie_desc">
                <button @click="()=>play(vid)" class="btn btn-primary">تشغيل الفيديو</button>
                </div>
                <div class="movie_social">
                <ul>
                    <li @click="()=>edit(vid._id)"><i class="material-icons">edit</i></li>
                    <li><i class="material-icons"></i></li>
                    <li @click="()=>deleteVid(vid._id, vid.stage)"><i class="material-icons">delete</i></li>
                </ul>
                </div>
            </div>
            <div class="blur_back ave_back"></div>
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
    created() {
        this.getVideos();
    },
    data() {
        return {
          videos: [],
          id: '',
          video: {},
          ready: false,
          loading: false,
          year: 2020,
          stage: 'one',
          unit: 1
        }
    },
    methods: {
        getVideos() {
          console.log(this.year, this.stage, this.unit)
          this.loading = true;
          axios.get('/fetchVideos/'+localStorage.getItem('userId')+'/'+this.year+'/'+this.stage+'/'+this.unit).then( res => {
              this.videos = res.data.videos;
              console.log(this.videos);
              this.loading = false;
          });
        },
        edit(id) {
            this.$router.push({path: '/dashboard/uploadVideo/'+id});
        },
        deleteVid(id, stage) {
            axios('/deleteVideo/'+id+'/'+stage).then(res => {
                this.videos = res.data.videos
            })
        },
        play(vid) {
            this.$refs.modal_button.click();
            this.video = vid;
            this.ready = true;
        }
    },
    watch: {
      year(val) {
        this.getVideos();
      },
      stage(val) {
        this.getVideos();
      },
      unit(val) {
        this.getVideos();
      },
    }
}
</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800');

*{
  box-sizing: border-box;
  margin: 0;
}

html, body{
  margin: 0;
  background: black;
  font-family: 'Montserrat', helvetica, arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
}

.movie_card{
  position: relative;
  display: block;
  width: 800px;
  height: 350px;
  margin: 100px 20px; 
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.4s;
  &:hover{
    transform: scale(1.02);
    transition: all 0.4s;
  }
  .info_section{
    position: relative;
    width: 100%;
    height: 100%;
      background-blend-mode: multiply;
    z-index: 2;
    border-radius: 10px;
    .movie_header{
      position: relative;
      padding: 25px;
      height: 40%;
      h1{
        color: #fff;
        font-weight: 400;
      }
      h4{
        color: #9ac7fa;
        font-weight: 400;
      }
      .minutes{
        display: inline-block;
        margin-top: 10px;
        color: #fff;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid rgba(255,255,255,0.13);
      }
      .type{
        display: inline-block;
        color: #cee4fd;
        margin-left: 10px;
      }
      .locandina{
        position: relative;
        float: left;
        margin-right: 20px;
        height: 120px;
        box-shadow: 0 0 20px -10px rgba(0,0,0,0.5);
      }
    }
    .movie_desc{
      padding: 25px;
      height: 50%;
      .text{
        color: #cfd6e1;
      }
    }
    .movie_social{
      height: 10%;
      padding-left: 15px;
      padding-bottom: 20px;
      ul{
        list-style: none;
        padding: 0;
        li{
          display: inline-block;
          color: rgba(255,255,255,0.4);
          transition: color 0.3s;
          transition-delay: 0.15s;
          margin: 0 10px;
          &:hover{
            transition: color 0.3s;
            color: rgba(255,255,255,0.8);
          }
          i{
            font-size: 19px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .blur_back{
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%; right: 0;
    background-size: cover;
    border-radius: 11px;
  }
}

@media screen and (min-width: 768px) {
  .movie_header{
    width: 60%;
  }
  
  .movie_desc{
    width: 50%;
  }
  
  .info_section{
    background: linear-gradient(to right, #0d0d0c 50%, transparent 100%);
  }
  
  .blur_back{
    width: 80%;
    background-position: -100% 10% !important;  
  }
}

@media screen and (max-width: 768px) {
  .movie_card{
    width: 95%;
    margin: 70px auto; 
    min-height: 350px;
    height: auto;
  }
  
  .blur_back{
    width: 100%;
    background-position: 50% 50% !important;  
  }
  
  .movie_header{
    width: 100%;
    margin-top: 85px;
  }
  
  .movie_desc{
    width: 100%;
  }
  
  .info_section{
    background: linear-gradient(to top, rgb(20, 20, 19) 50%, transparent 100%);
    display: inline-grid;
  }
}

#ave{
  box-shadow: 0px 0px 150px -45px rgba(199,147,75, 0.7);
  margin-bottom: 200px;
  &:hover{
    box-shadow: 0px 0px 120px -55px rgba(199,147,75, 0.7);
  }
}

.ave_back{
    background: url("../../assets/images/germany.jpg");
}

 /* Style buttons */
.btn {
  background-color: DodgerBlue;
  border: none;
  color: white;
  padding: 12px 30px;
  cursor: pointer;
  font-size: 20px;
}

/* Darker background on mouse-over */
.btn:hover {
  background-color: RoyalBlue;
}
.explain {
  padding: 20px;
  .exp {
    margin: 10px;
  }
}
.filter {
  margin-top: 20px;
  background-color: #4a4d5046;
  padding: 10px 30px;
}
</style>