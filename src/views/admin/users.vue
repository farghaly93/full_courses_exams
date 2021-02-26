<template>
  <div>
    <div class="search">
      <input @input="search" class="form-control" type="text" placeholder="search"/>
      <i class="fa fa-search"/>
    </div>
    <div class="row">
      <div style="padding:10px;" class="col-md-4"><button style="width:100%;" class="btn btn-primary" @click="getUsers('exams')">الطلبة المتابعين</button></div>
      <div style="padding:10px;" class="col-md-4"><button style="width:100%;" class="btn btn-primary" @click="getUsers('examsOnly')">الطلبة الزائرين</button></div>
      <div style="padding:10px;" class="col-md-4"><button style="width:100%;" class="btn btn-primary" @click="getUsers('fullCourse')">طلبة الكورس الكامل</button></div>
    </div>
    <v-data-table
      :headers="headers"
      :items="filteredUsers"
      class="elevation-1"
    >
      <template v-slot:item.controls="row">
          <div class="controls">
            <button @click="()=>remove(row.item._id)" type="button" class="btn btn-outline-danger btn-xs">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
            <button @click="()=>toggleRole(row.item._id)" type="button" class="btn btn-outline-danger btn-xs">
                <i class="fa fa-user" aria-hidden="true"></i>
            </button>
            <button @click="()=>confirmUser(row.item._id)" type="button" class="btn btn-outline-danger btn-xs">
                <i class="fa fa-check" aria-hidden="true"></i>
            </button><br>
            <input class="input" v-if="type==='examsOnly' || type==='fullCourse'" v-model="allowed_units[row.item._id]" type="text" @keydown="(e) => {updateUnitsAllowed(e, row.item._id)}" placeholder="Allowed units"/>
          </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
import { parse } from 'querystring';
export default {
    data () {
      return {
        users: [],
        filteredUsers: [],
        stages: {},
        type: '',
        allowed_units: {},
        headers: [
          {
            text: 'Student name',
            align: 'start',
            sortable: false,
            value: 'studentName',
          },
          { text: 'Email',
            align: 'start',
            sortable: false, value: 'email' },
          { text: 'Role',
            align: 'start',
            sortable: false, value: 'role' },
          { text: 'Phone',
            align: 'start',
            sortable: false, value: 'phone' },
          { text: 'Address',
            align: 'start',
            sortable: false, value: 'address' },
          { text: 'Stage',
            align: 'start',
            sortable: false, value: 'stage' },
          { text: 'Confirmed',
            align: 'start',
            sortable: false, value: 'confirmed' },
          { text: 'allowed units',
            align: 'start',
            sortable: false, value: 'allowed' },
          { text: 'Controls / Units',
            align: 'start',
            sortable: false, value: 'controls' },
        ],
      }
    },
    methods: {
      getUsers(type) {
        this.type = type;
        axios.get('/getUsers/'+type).then(res => {
            const users = res.data.users;
            const userData = users.map((user) => {
                this.allowed_units[user._id] = user.units;
                return {
                    _id: user._id,
                    studentName: user.fullname,
                    email: user.email,
                    role: user.role===0?'User': 'Admin',
                    phone: user.phone,
                    address: user.address,
                    stage: user.stage,
                    confirmed: user.confirmed==1?'Confirmed': 'Not confirmed',
                    allowed: user.units?.toString()
                }
            });
            this.users = userData;
            this.filteredUsers = userData;
        })
      },
        remove(id) {
            axios.get('/deleteUser/'+id).then(res => {
                const index = this.filteredUsers.findIndex(fu => {
                  return fu._id === id
                });
                this.filteredUsers.splice(index, 1);
            });
        },
        toggleRole(id) {
            axios.get('/toggleUserRole/'+id).then(res => {
                const user = res.data.user;
                const index = this.filteredUsers.findIndex(fu => {
                  return fu._id === user._id
                });
                this.filteredUsers[index] = {
                    _id: user._id,
                    studentName: user.fullname,
                    email: user.email,
                    role: user.role===0?'User': 'Admin',
                    phone: user.phone,
                    address: user.address,
                    stage: user.stage,
                    confirmed: user.confirmed==1?'Confirmed': 'Not confirmed' 
                };
                this.filteredUsers = [...this.filteredUsers];
            });
        },
        confirmUser(id) {
            axios.get('/confirmUser/'+id).then(res => {
               const user = res.data.user;
                const index = this.filteredUsers.findIndex(fu => {
                  return fu._id === user._id
                });
                this.filteredUsers[index] = {
                    _id: user._id,
                    studentName: user.fullname,
                    email: user.email,
                    role: user.role===0?'User': 'Admin',
                    phone: user.phone,
                    address: user.address,
                    stage: user.stage,
                    confirmed: user.confirmed==1?'Confirmed': 'Not confirmed' 
                };
                this.filteredUsers = [...this.filteredUsers];

            });
        },
        search(event) {
           const filteredUsers = this.users.filter(user => 
               user.studentName.includes(event.target.value) ||
               user.phone.includes(event.target.value) ||
               user.address.includes(event.target.value) ||
               user.email.includes(event.target.value) 
               );
            this.filteredUsers = filteredUsers;
        },
        filterRoles(val) {
          const role = val==='admins'?1:val==='users'?0:2;
          if(role===2) {
              this.filteredUsers = this.users;
              return;
          }
          this.filteredUsers = this.users.filter(user => user.role === role);
        },
        updateUnitsAllowed(e, id) {
          if(e.keyCode == '13') {
            const units = (e.target.value).split(",").map(s => {
              return parseInt(s);
            });
            axios.post('/updateAllowedUnits/'+id, {units}).then(res => {
              if(res.data.done) {
                this.$store.dispatch('writemessage', 'تم تحديث الوحدات المتاحة للطالب');
                const user = res.data.user;
                const index = this.filteredUsers.findIndex(fu => {
                  return fu._id === user._id;
                });
                this.filteredUsers[index] = {
                    _id: user._id,
                    studentName: user.fullname,
                    email: user.email,
                    role: user.role===0?'User': 'Admin',
                    phone: user.phone,
                    address: user.address,
                    stage: user.stage,
                    confirmed: user.confirmed==1?'Confirmed': 'Not confirmed',
                    allowed: user.units.toString()
                };
                this.filteredUsers = [...this.filteredUsers];
              } else {
                 this.$store.dispatch('writemessage', 'حدثت مشكلة اثناء تعديل الوحدات المتاحة للطالب');
              }
            });
          }
        },
        arrToString(arr) {
          // const str = JSON.stringify(arr);
        }
    },
    watch: {
        show(val) {
          this.filterRoles(val);
            }
        }
}
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/table.scss';
        .search {
          margin: 15px;
          position: relative;
          display:flex;
          flex-direction:row;
          justify-content:right;
          align-items:center;
          width:40%;
          i {
            position: absolute;
            right: 2%;
          }
        }
        .controls {
          display: flex;
          flex-direction: row;
          justify-items: center;
          align-content: center;
          button {
            margin:2px;
          }
          .input {
            // box-shadow: rgb(71, 71, 71) 1px 1px 1px 1px;
            background-color: rgb(226, 224, 224);
            text-align: center;
            border: 1px #555 solid;
            border-radius: 20px;
          } 
        }
</style>