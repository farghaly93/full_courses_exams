<template>
    <div>
      <select v-if="side!=='user'" v-model="stage" style="background-color:rgb(214, 221, 225);font-weight:bolder;" @change="getByStage" class="form-control">
          <option value="one">الصف الأول الثانوي</option>
          <option value="two">الصف لثاني الثانوي</option>
          <option value="three">الصف الثالث الثانوي</option>
      </select>
      <br>
    <h3 style="font-weight:bolder;color:#fff;background-color:#537175" class="text-center">ترتيب الطلبة</h3>
  
    <div style="height:700px;overflow-y:scroll;" class="table-responsive">
    <!--Table-->
    <table class="table">

      <!--Table head-->
      <thead>
        <tr>
          <th class="th-sm">الترتيب</th>
          <th class="th-sm">التقدم المحرز</th>
          <th v-if="side!=='user'" class="th-sm">أعمال السنة</th>
        </tr>
      </thead>
      <!--Table head-->

      <!--Table body-->
      <tbody style="background-color:rgba(91, 103, 108, 0.17)">
        <tr style="border:1px solid #444" v-for="(grade, g) in gradess" :key="g">
          <th style="width:5%;" scope="row"><div class="padge">{{g+1}}</div></th>
          <td style="width:85%">
            <div>
              <div class=" student text-center">{{grade.username}}</div>
              <progress-bar 
                :degree="grade.mark" 
                :fullDegree="fullDegree"
                color='#588c58'
                caption="الامتحانات"
                />
                <progress-bar
                v-if="type==='exams'"
                :degree="grade.bonus" 
                :fullDegree="adminData.activityDegree"
                color='#3f84a6'
                caption="أعمال السنة"
                />
                <progress-bar
                v-if="type==='exams'"
                :degree="grade.bonus + grade.mark" 
                :fullDegree="adminData.activityDegree + fullDegree"
                color='rgba(84, 85, 85, 0.79)'
                caption="المجموع الكلي"
                />
            </div>
          </td>
          <td v-if="side!=='user'" style="width:10%">
            <div class="editDegree">
              <input v-model="degree[g]" @keydown="(e)=>{putBonus(e, grade.userId, g)}" type="number" class="form-control"/>
              <p>/{{adminData.activityDegree}}</p>
            </div>
          </td>
        </tr>
      </tbody>
      <!--Table body-->

    </table>
    <!--Table-->
</div>

    </div>
</template>

<script>
import axios from 'axios';
import ProgressBar from './progress-bar'
export default {
  components: {
    ProgressBar
  },
  props: ['side', 'type'],
    created() {
        this.getByStage();
    },
    data() {
      return {
        users: [],
        stage: 'two',
        grades: [],
        gradess: [],
        degree: [0],
      }
    },
    computed: {
      drawer2() {
        return this.$store.getters.drawer2;
      },
      userId() {
        return localStorage.getItem('userId');
      },
      fullDegree() {
        return this.$store.getters.fullDegree;
      },
      adminData() {
        return this.$store.getters.adminData;
      }
    },
    methods: {
        getByStage() {
          const stage = this.side==='user'?this.$store.getters.stage: this.stage;
          this.$store.dispatch('getExamsFullDegree', {stage, type: this.type});
            console.log(stage, this.fullDegree, this.type, this.side);
            axios.get('/getUsersExam/'+stage+'/'+this.type).then(res => {
                this.users = res.data.users;
                console.log(this.users);
                const arr = [];
                [...this.users].forEach((user, i) => {
                axios.get('/getCorrectedStudentExams/'+user._id).then(res => {
                    const userMarks = {username: user.fullname, userId: user._id, mark: 0, fullMark: 0}
                    res.data.exams.forEach(exam => {
                    exam.sections.forEach(section => {
                        section.questions.forEach(question => {
                        userMarks.mark += question.degree || 0;
                        })
                      })
                    });
                    this.degree[i] = user.bonus;
                    userMarks.bonus = user.bonus;
                    arr.push(userMarks);
                  });
                });
                this.grades = arr;
            });
        },
        putBonus(e, user, i) {
          if(e.keyCode == '13') {
            axios.patch('/putBonus/'+user+'/'+this.degree[i]).then(res => {
              this.getByStage();
            })
          }
        }
    },
    watch: {
      grades(val) {
        this.gradess = [...val].sort((a, b) => {
          return (a.mark < b.mark)?1: -1;
        });
      }
    }
}
</script>

<style scoped lang="scss">
.table {
  th {
    text-align: center;
  }
  .student {
    font-weight: bolder;
    color: #fff;
    background-color: #2b51639c;
  }
  tr:nth-child(even) {background-color: #518a8a5e;}
  .padge {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color:#01955d;
      color: #fff;
      padding: 15px;
      text-align: center;
  }
}

</style>