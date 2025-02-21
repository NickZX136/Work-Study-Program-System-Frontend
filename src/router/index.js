import {createRouter,createWebHistory} from "vue-router";

//导入组件
import AdminLoginVue from '@/views/admin/AdminLogin.vue'
import AdminLayoutVue from "@/views/admin/AdminLayout.vue";
import EmployerManagementVue from "@/views/admin/EmployerManagement.vue";
import JobCategoryManagementVue from "@/views/admin/JobCategoryManagement.vue";
import MessageManagementVue from "@/views/admin/MessageManagement.vue";
import RecruitmentInformationManagementVue from "@/views/admin/RecruitmentInformationManagement.vue";
import ScoreManagementVue from "@/views/admin/EvaluationManagement.vue";
import StudentManagementVue from "@/views/admin/StudentManagement.vue";
import AdministratorInfoVue from "@/views/admin/AdministratorInfo.vue";
import AdministratorUpdatePasswordVue from "@/views/admin/AdministratorUpdatePassword.vue";
import MessageManagementDetailVue from "@/views/admin/MessageManagementDetail.vue";
import LoginLayoutVue from "@/views/LoginLayout.vue";
import EmployerLoginVue from "@/views/employer/EmployerLogin.vue";
import StuLoginVue from "@/views/stu/StuLogin.vue";
import EmployerLayoutVue from "@/views/employer/EmployerLayout.vue";
import EmployerInfoManagementVue from "@/views/employer/EmployerInfoManagement.vue";
import EmployerEvaluationManagementVue from "@/views/employer/EmployerEvaluationManagement.vue";
import EmployerMessageManagementVue from "@/views/employer/EmployerMessageManagement.vue";
import JobPostingManagementVue from "@/views/employer/JobPostingManagement.vue";
import StudentApplicationManageVue from "@/views/employer/StudentApplicationManage.vue";
import EmployerJobCategoryVue from "@/views/employer/EmployerJobCategory.vue";
import CompanyJobPostingManagementVue from "@/views/employer/CompanyJobPostingManagement.vue";
import EmployerMessageManagementDetailVue from "@/views/employer/EmployerMessageManagementDetail.vue";
import EmployerEmploymentManagementVue from "@/views/employer/EmployerEmploymentManagement.vue";
import EmployerUpdatePasswordVue from "@/views/employer/EmployerUpdatePassword.vue";
import StuLayoutVue from "@/views/stu/StuLayout.vue";
import StuResumeManagementVue from "@/views/stu/StuResumeManagement.vue";
import StuUpdatePasswordVue from "@/views/stu/StuUpdatePassword.vue";
import StuEvaluationVue from "@/views/stu/StuEvaluation.vue";
import StuJobCategoryVue from "@/views/stu/StuJobCategory.vue";
import StuJobPostingVue from "@/views/stu/StuJobPosting.vue";
import StuMessageManagementVue from "@/views/stu/StuMessageManagement.vue";
import StuInfoManagementVue from "@/views/stu/StuInfoManagement.vue";
import StuMessageManagementDetailVue from "@/views/stu/StuMessageManagementDetail.vue";
import StuApplicationManagementVue from "@/views/stu/StuApplicationManagement.vue";
import VisitorJobPostingVue from "@/views/visitor/VisitorJobPosting.vue";
import VisitorJobCategoryVue from "@/views/visitor/VisitorJobCategory.vue";

//定义路由关系
const routes = [
    { path: '/LoginLayout', component: LoginLayoutVue , redirect: '/admin/Login' ,children: [
            { path: '/admin/Login', component: AdminLoginVue },
            { path: '/employer/EmployerLogin', component: EmployerLoginVue },
            { path: '/stu/StuLogin', component: StuLoginVue },
            { path: '/visitor/VisitorJobPosting', component: VisitorJobPostingVue },
            { path: '/visitor/VisitorJobCategory', component: VisitorJobCategoryVue }
        ]},
    { path: '/AdminLayout', component: AdminLayoutVue , redirect: '/admin/MessageManagement' , children:[
            {path:'/admin/JobCategoryManagement',component:JobCategoryManagementVue},
            {path:'/admin/MessageManagement',component:MessageManagementVue},
            {path:'/admin/EmployerManagement',component:EmployerManagementVue},
            {path:'/admin/RecruitmentInformationManagement',component:RecruitmentInformationManagementVue},
            {path:'/admin/ScoreManagement',component:ScoreManagementVue},
            {path:'/admin/StudentManagement',component:StudentManagementVue},
            {path:'/admin/AdministratorInfo',component:AdministratorInfoVue},
            {path:'/admin/AdministratorUpdatePassword',component:AdministratorUpdatePasswordVue},
            {path:'/admin/MessageManagementDetail',component:MessageManagementDetailVue}
        ]},
    { path: '/EmployerLayout', component: EmployerLayoutVue , redirect: '/employer/EmployerInfoManagement' ,children: [
            { path: '/employer/EmployerInfoManagement', component: EmployerInfoManagementVue },
            { path: '/employer/EmployerEvaluationManagement', component: EmployerEvaluationManagementVue },
            { path: '/employer/EmployerMessageManagement', component: EmployerMessageManagementVue },
            { path: '/employer/JobPostingManagement', component: JobPostingManagementVue },
            { path: '/employer/StudentApplicationManage', component: StudentApplicationManageVue },
            { path: '/employer/EmployerJobCategory', component: EmployerJobCategoryVue },
            { path: '/employer/CompanyJobPostingManagement', component: CompanyJobPostingManagementVue },
            { path: '/employer/EmployerMessageManagementDetail', component: EmployerMessageManagementDetailVue },
            { path: '/employer/EmployerEmploymentManagement', component: EmployerEmploymentManagementVue },
            { path: '/employer/EmployerUpdatePassword', component: EmployerUpdatePasswordVue }

        ]},
    { path: '/StuLayout', component: StuLayoutVue , redirect: '/stu/StuResumeManagement' ,children: [
            { path: '/stu/StuResumeManagement', component: StuResumeManagementVue },
            { path: '/stu/StuUpdatePassword', component: StuUpdatePasswordVue },
            { path: '/stu/StuEvaluation', component: StuEvaluationVue },
            { path: '/stu/StuJobCategory', component: StuJobCategoryVue },
            { path: '/stu/StuJobPosting', component: StuJobPostingVue },
            { path: '/stu/StuMessageManagement', component: StuMessageManagementVue },
            { path: '/stu/StuInfoManagement', component: StuInfoManagementVue },
            { path: '/stu/StuMessageManagementDetail', component: StuMessageManagementDetailVue },
            { path: '/stu/StuApplicationManagement', component: StuApplicationManagementVue }
        ]}
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes:routes
})

//导出路由
export default router