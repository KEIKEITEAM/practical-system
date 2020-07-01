import Vue from 'vue'
import Vuex from 'vuex'

//注册vuex
Vue.use(Vuex)

//状态
const state={
    student:sessionStorage.getItem("student"),
    teacher:sessionStorage.getItem("teacher")
    // admin:"zxy"
}

const getters={
    student(state){
        return state.student;
    },
    teacher(state){
        return state.teacher;
    }
}

//mustations用来操作状态
const mutations={
    //保存管理账户信息
    save_student(state,student){
        sessionStorage.setItem("student",student);//将账户信息存入本地，否则刷新后会丢失
        state.student=student;
    },
    save_teacher(state,teacher){
        sessionStorage.setItem("teacher",teacher);//将账户信息存入本地，否则刷新后会丢失
        state.teacher=teacher;
    },
    //注销管理账户信息
    logout_student(state){
        sessionStorage.removeItem("student");
        state.student=null;
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations
})