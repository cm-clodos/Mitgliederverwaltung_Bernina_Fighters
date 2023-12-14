import { createRouter, createWebHistory } from "vue-router";
import MemberView from "@/views/MemberView.vue";
import MemberNewView from "@/views/MemberNewView.vue";
import MemberEditView from "@/views/MemberEditView.vue";
import MemberInfoView from "@/views/MemberInfoView.vue";
import MemberPaymentView from "@/views/MemberPaymentView.vue";
import TrikotView from "@/views/TrikotView.vue";
import TrikotNewView from "@/views/TrikotNewView.vue";
import ExportView from "@/views/ExportView.vue";
import LoginForm from "@/components/LoginForm.vue";
import useUserStore from "@/stores/user";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "Home", path: "/", component: MemberView },
    { name: "Login", path: "/login", component: LoginForm },
    { name: "Mitgliederverwaltung", path: "/members", component: MemberView },
    {
      name: "Mitglieder hinzufügen",
      path: "/members/new",
      component: MemberNewView,
    },
    {
      name: "Mitglied bearbeiten",
      path: "/members/:id",
      component: MemberEditView,
    },
    {
      name: "Mitglieds informationen",
      path: "/members/:id/info",
      component: MemberInfoView,
    },
    {
      name: "Mitglieder Exporte",
      path: "/members/export",
      component: ExportView,
    },
    {
      name: "Bezahlübersicht",
      path: "/members/payment",
      component: MemberPaymentView,
    },
    { name: "Trikotverwaltung", path: "/trikots", component: TrikotView },
    {
      name: "Trikot hinzufügen",
      path: "/trikots/new",
      component: TrikotNewView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useUserStore();
  console.log(store.userLoggedIn);
  if (!store.userLoggedIn && to.name !== "Login") {
    return next({ name: "Login" });
  }
  next();
});

export default router;
