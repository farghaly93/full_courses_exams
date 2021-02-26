<template>
<div class="page">
    <div class="overlay"></div>
    <div class="content">
        <div class="container">
            <loading v-if="loading"/>
            <p class="text-center not-allowed" v-if="notAuthorized === true">لست مشترك في هذه الخدمة</p>
            <div class="text-center titlee">{{title}}</div><br>
            <div class="cards" v-if="notAuthorized === false">
                <div @click="()=>gotoExams(unit._id)" :class="['card', allowedUnits.includes(unit._id)?'unlocked':'locked']" v-for="unit in units" :key="unit._id">
                    <div calss="unit">الوحدة رقم {{unit._id}} </div>
                    <div v-if="!allowedUnits.includes(unit._id)" class="lock">
                        <i class="fa fa-lock"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <footer-paid/> -->
</div>
</template>

<script>
import axios from 'axios'
import Loading from '../components/loading.vue'
import FooterPaid from '../components/footer-paid.vue'
export default {
    components: {
        Loading,
        FooterPaid
    },
    created() {
        const path = this.$router.history.current.path.split('/')[1];
        switch(path) {
            case 'fullCourse': this.title = 'الكورس الكامل';
            break;
            case 'examsOnly': this.title = 'نظام الاختبارات الخارجية';
            break;
            default: this.title = 'بس يا حبيبي';
        }
        this.loading = true;
        axios.post('/getUserData', {_id: localStorage.getItem('userId')}).then(res => {
            if(res.data.userdata.type === path) {
                this.notAuthorized = false;
                this.allowedUnits = res.data.userdata.units;
                axios.get('/unwindUnits').then(res => {
                    this.loading = false;
                    const stages = res.data;
                    this.units = stages[localStorage.getItem('stage')].sort((a, b) => a._id - b._id);
                })
                
            } else {
                setTimeout(() => {
                    this.$router.replace('/');
                }, 2000)
            }
        });
    },
    data() {
        return {
            notAuthorized: false,
            units: [],
            allowedUnits: [],
            loading: false,
            title: ''
        }
    },
    methods: {
        gotoExams(unit) {
            if(this.allowedUnits.includes(unit)) {
                this.$router.push('/lessons-exams/'+unit);
            } else {
                alert('اشترك في الوحدة اولا ليسمح لك الدخول')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    position: relative;
    height: 100%;
    background-image: url('../assets/styles2/css/images/1.jpg');
    background-size: cover;
    .overlay {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(-45deg, #ad142881 0%, #d4c7118e 100%)
    }
    .content {
        position: absolute;
        padding: 30px 0px;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        .container {
            z-index: 999;
            margin-top: 100px;
            .titlee {
                font-size: 2em;
                font-weight: bolder;
                color: rgb(230, 235, 243);
                background-color: rgba(0, 0, 0, 0.521);;
                width: 50%;
                margin-right: auto;
                margin-left: auto;
            }
            .cards {
                position: relative;
                padding: 25px 20px;
                background-color: rgba(97, 58, 11, 0.548);
                width: 50%;
                margin-right: auto;
                margin-left: auto;
                @media (max-width: 768px) {
                width: 90%; 
                }
                .card {
                    text-align: center;
                    padding: 20px 0px;
                    margin-left: auto;
                    margin-right: auto;
                    margin-top: 13px;
                    color: #fff;
                    font-size: 30px;
                    font-weight: bolder;
                    transition: 0.7s;
                    cursor: pointer;
                    box-shadow: 0 0 25px 0 rgba(20, 27, 201, .05);
                    .lock {
                        position: absolute;
                        left: 0%;
                        top: 0%;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(53, 48, 48, 0.664);
                        i {
                            position: absolute;
                            right: 0%;
                            top: 15%;
                            margin-right: 13px;
                            font-size: 70px;
                            color: rgb(222, 226, 198);
                        }
                    }
                }
                .unlocked {
                    box-shadow: 0 0 25px 0 rgba(20, 27, 201, .05);
                    background-image: linear-gradient(-45deg, #1e2a4e 0%, #2975d8 100%);
                    &:hover {
                        box-shadow: 0 0 25px 0 rgba(20, 27, 201, .05);
                        background-image: linear-gradient(-45deg, #c21111 0%, #d0d30c 100%);
                    } 
                }
                .locked {
                    background-image: linear-gradient(-45deg, #d46184 0%, #c24311 100%);
                }
            }

        }
    }
}
</style>