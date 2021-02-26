<template>
<div class="title text-center"> 
   
<section class="section_1 container-fluid p-0">
    <div class="d-taha taha-column">
      <div>
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#">منصة القائد </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
              
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class=".navbar-nav m-auto"></div>

                  <ul class="navbar-nav mr-auto">
                    
                      <li class="nav-item ">
                        
                      <a class="nav-link" href="#hero">الصفحة الرئيسية <span class="sr-only">(current)</span></a>
                    </li>
                    
                    
                      
                      
                    <li class="nav-item">
                      <a class="nav-link" href="#about-us">من نحن</a>
                    </li>
                    <li class="nav-item ">
                      <a class="nav-link" href="https://www.facebook.com/108999777568363">تواصل معنا <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item ">
                      <a class="nav-link" href="#students">الطلاب <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item ">
                      <a class="nav-link" href="#email">ارسال ايميل<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item ">
                      <a class="nav-link" href="#social">التواصل الاجتماعي <span class="sr-only">(current)</span></a>
                    </li>
                  </ul>
                  
                </div>
              </nav>
            </header>
          </div>
          <div id="hero" class="container-fluid text-center heading">
            <video  src="../assets/styles2/css/images/f.mp4" autoplay muted loop class="myVid"></video>
            <div class="face">
              <h1 class="h1">منصة القائد <span>.</span>لتدريس اللغة الألمانية</h1>
              <h2 class="h2">لطلبة الثانوية العامة</h2>
              <a href="#get-started" class="btn-get-started scrollto">اختر النظام</a>
          </div>
        </div>
      </div>    
  </section>

  <!--==========================
    Get Started Section
  ============================-->
  <section id="get-started" class="padd-section text-center wow fadeInUp">

    <div class="container">
      <div class="section-title text-center">

        <h2>الأنظمة الدراسية على منصةالقائد </h2>
        <p class="separator">اختر نظامك حسب إحتياجاتك !</p>

      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-md-6 col-lg-4">
          <div class="feature-block">

            <img src="../assets/styles2/css/images/img/svg/cloud.svg" alt="img" class="img-fluid">
            <h4>نظام الإمتحانات فقط</h4>
            <p>نظام خاص بالطلبة الذين يدرسون مع مدرسين آخرين ، ويستخدمون المنصة من أجل الإمتحانات</p>
            <button  @click="()=>{gotoPage('/examsOnly')}" type="button" class="btn btn2 btn-primary">نظام الإمتحانات فقط</button>

          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="feature-block">

            <img src="../assets/styles2/css/images/img/svg/planet.svg" alt="img" class="img-fluid">
            <h4>نظام المنتظمين</h4>
            <p>نظام خاص بالطلبة الذين لم يحضروا الدروس على المنصة ، ولكنهم مع المستر في الحصة</p>
            <button @click="()=>{gotoPage('/exam')}" type="button" class="btn btn2 btn-danger">نظام المنتظمين</button>

          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="feature-block">

            <img src="../assets/styles2/css/images/img/svg/asteroid.svg" alt="img" class="img-fluid">
            <h4>نظام الكورس الكامل </h4>
            <p> نظام خاص بمشاهدة الدروس والفيديوهات والإمتحانات أونلاين ، ومتابعة تقدمك وترتيبك وسط المشتركين</p>
            <button @click="()=>{gotoPage('/fullCourse')}" type="button" class="btn btn2 btn-danger">نظام الكورس الكامل</button>

          </div>
        </div>

      </div>
    </div>

  </section>



  <section id="students" class="counters text-center">
    <div class="container">
      <counters :one="one" :two="two" :three="three"/>
    </div>	
  </section>


       <!-- ************************************ من نحن ************************************* -->
  <!--==========================
    About Us Section
  ============================-->
  <section id="about-us" class="about-us padd-section wow fadeInUp">
    <div class="container">
      <div class="row justify-content-center">

        <div class="col-md-5 col-lg-3">
          <img src="../assets/styles2/css/images/img/about-img.png" alt="About">
        </div>

        <div id="mns" class="col-md-7 col-lg-5">
             <div class="about-content">

            <h2 ><span>منصة القائد<span>- </span></span>لتدريس اللغة الألمانية  </h2>
            <p>مدرس لغة ألمانية للمرحلة الثانوية فى محافظة أسيوط ، فكر جديد فى التدريس وتدريب على السياسة الجديدة لوزارة التربية والتعليم من خلال التعليم المدمج والذي يجمع بين الشرح وحل التدريبات على الانترنت حيث سيكون هناك اختبارات على موقع خاص بالمدرس يساعد الطالب على التدرب وحل امتحانات على كل درس بعد شرحه ويتمكن ولى الأمر من متابعة درجات ابنه أيضاً . المدرس على استعداد لإعطاء دروس برايفت ( خاص ) فى منزل الطالب
               للتواصل للحجز والاستفسار الأستاذ طه يوسف</p>
               <h4>
               للتواصل للحجز والاستفسار الأستاذ طه يوسف</h4>

            </div>
        </div>

      </div>
    </div>
  </section>
  

     
  <section class="offered-area" id="social">
    <div class="sectiontitle">
      <h2>التواصل الجتماعي</h2>
      <span class="headerLine"></span>
    </div>
    <br><br>
    <social :facebook="adminData.facebook" :twitter="adminData.twitter" :linkedin="adminData.linkedin"/>
  </section>
			<!-- End offered Area -->



      <br><br><br><br><br>
			<section class="contact-area section-gap" id="email">
				<div class="container">
					<div class="row d-flex justify-content-center">
						<div class="menu-content pb-30 col-lg-8">
							<div class="title text-center">
								<h1 style="color:#000;font-weight:bold" class="mb-10">للتوااصل عبر الايميل فورا</h1>
								<p>قم بادخال بياناتك صحيحة وقم بارسال بريد الكتروني فوري للاستاذ طه</p>
							</div>
						</div>
					</div>										
					<form ref="form" @submit.prevent="sendEmail" class="form-area mt-0 contact-form text-right" id="myForm">
						<div class="row">	
							<div style="margin-top:40px;" class="col-lg-6 form-group">
								<input style="padding:22px;" name="name" placeholder="Enter your name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'" class="common-input mb-20 form-control" required="" type="text"><br>
								<input style="padding:22px;" name="subject" placeholder="Enter your subject" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your subject'" class="common-input mb-20 form-control" required="" type="text">
							</div>
							<div class="col-lg-6 form-group">
								<textarea class="common-textarea mt-10 form-control" name="message" placeholder="Messege" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Messege'" required=""></textarea>
								<button style="float:left;" class="send primary-btn mt-20">Send Message<span class="fa fa-arrow-right"></span></button>
								<app-loading v-if="emailLoading"/>
							</div>
						</div>
					</form>						
					
				</div>	
			</section>
			<br><br><br><br><br>


    <div class="footer">
    <section class="section_6 ">
        <div class="d-sm-flex flex-row text-white">
            <div class="footer">
                <label for="Prod">الصف الدراسي</label>
                <ul>
                    <li>الصف الأول الثانوي</li>
                    <li>الصف الثاني الثانوي</li>
                    <li>الصف الثالث الثانوي</li>
                    
                </ul>
            </div>
            <div class="footer">
                <label for="info">صفحات المساعدة</label>
                <ul>
                    <li>أخر الأخبار</li>
                    <li>الشروط والأحكام</li>
                    <li>الخصوصية</li>
                    
                </ul>
            </div>
            <div class="footer">
                <label for="sup">تواصل معنا </label>
                <ul>
                    <li> أسيوط- بجوار كلية آداب</li>
                    <li>201005010189+</li>
                    <li>WhatsApp : +201012996733</li>
                    <li><a class="nav-link" href="https://www.facebook.com/108999777568363">تواصل معنا <span class="sr-only">(current)</span></a></li>
                </ul>
            </div>
        </div>
    </section>

    <div class="copyrights">
     <div class="container">
       <p> .Copyrights Parallel X. All rights reserved & copy</p>
       <div class="credits">Designed by <a href="https://www.facebook.com/Mobd3Ismail/" target="_blank">Mobd3Ismail</a>
       </div>
     </div>
   </div>
   </div>
 <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>
<whatsapp/>
</div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import whatsappVue from '../components/whatsapp.vue';
import Loading from '../components/loading.vue';
import Counters from '../components/counters.vue';
import Social from '../components/social.vue';
import Whatsapp from '../components/whatsapp.vue';
export default {
    mounted() {
		$(document).ready(function(){
            $("a").on('click', function(event) {

                if (this.hash !== "") {
                event.preventDefault();

                var hash = this.hash;

                $('html').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function(){
            
                    window.location.hash = hash;
                });
                } // End if
            });
		});
		
        const one = axios.get('/getStudentsNumbers/one');
        const two = axios.get('/getStudentsNumbers/two');
        const three = axios.get('/getStudentsNumbers/three');
        axios.all([one, two, three]).then(axios.spread((...requests) => {
            const onee = requests[0].data.users;
            const twoo = requests[1].data.users;
			const threee = requests[2].data.users;
			const increase1 = setInterval(()=> {
				if(this.one < onee) {
					++this.one;
				} else {
					clearInterval(increase1);
				}

			}, 50);
			const increase2 = setInterval(()=> {
				if(this.two < twoo) {
					++this.two;
				} else {
					clearInterval(increase2);
				}

			}, 50);
			const increase3 = setInterval(()=> {
				if(this.three < threee) {
					++this.three;
				} else {
					clearInterval(increase3);
				}

			}, 50);
            })
        );
},
    computed: {
            adminData(){
                return this.$store.getters.adminData;
            },
            message(){
                return this.$store.getters.message;
            }
    },
    data() {
        return {
            one: 0,
            two: 0,
			three: 0,
			fill: false,
			emailLoading: false
        }
	},
	methods: {
		sendEmail() {
			this.emailLoading = true;
			window.location.href = "mailto:"+this.adminData.gmail+"?subject="+this.$refs.form.subject.value+"&body="+this.$refs.form.message.value;
			this.emailLoading = false;
    },
    gotoPage(page) {
      this.$router.push(page);
    }
	},
    components: {
		appWhatsapp: whatsappVue,
    appLoading: Loading,
    Counters,
    Social,
    Whatsapp
    }
}
</script>
        <!-- *******************************Main Stylesheet File***************************************************************** -->
<style scoped lang="scss"> 

    /* @import url('../assets/styles/videos.css'); */
   
   @import url( https://fonts.googleapis.com/css2?family=Lemonada:wght@700&family=Rakkas&display=swap);
   @import url( https://fonts.googleapis.com/css2?family=Rakkas&display=swap);
   @import url( https://fonts.googleapis.com/css2?family=Jomhuria&display=swap);
   @import url(https://code.jquery.com/jquery-3.5.1.slim.min.js);
 @import url(https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js);
 @import url(https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
 @import url(https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js);

 @import url(https://cdnjs.cloudflare.com/ajax/libs/superfish/1.7.10/js/superfish.min.js);
 @import url(https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js);
 
 @import url(https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js);
  @import url('../assets/styles2/css/styles.css');
#hero {  
  position: relative;
  opacity: .9;
  height: 1000px;
  margin-top: -170px;
  .myVid {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: -999;
  }
   .face {
    position: absolute;
    bottom: 20%;
    right:10%;
    z-index: 999;
    padding: 0px 20px;
    background-image: linear-gradient(45deg, rgba(7, 73, 16, 0.548) 0%, rgba(234, 235, 224, 0.445) 100%);
    .h1 {
      text-shadow: 5px 2px #472c2c;
      color: rgb(207, 188, 11);
    }
    .h2 {
      text-shadow: 2px 1px #f3ecec;
      color: rgb(207, 11, 53);
    }
  }   
}  
.title {
    font-size: 40px;
}
.sectiontitle {
  background-position: center;
  margin: 30px 0 0px;
  text-align: center;
  min-height: 20px;
}

.sectiontitle h2 {
  font-size: 30px;
  color: #222;
  margin-bottom: 0px;
  padding-right: 10px;
  padding-left: 10px;
}
.headerLine {
  width: 160px;
  height: 2px;
  display: inline-block;
  background: #101F2E;
}
.send {
  background-color: rgb(97, 97, 226);
  padding: 9px 25px;
  color: #fff;
  border-radius: 15px;
  margin-top: 7px;
}
.send:hover {
  background-color: rgb(84, 84, 104);
}
/* .section_6 .footer ul li {
  font-size: 20px;
  float: right;
} */
</style>
