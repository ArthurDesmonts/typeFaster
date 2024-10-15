import App from "@/App.vue";
import LeaderBoard from "@/pages/LeaderBoard.vue";
import Messages from "@/pages/Messages.vue";
import Profil from "@/pages/Profil.vue";
import Home from "@/pages/Home.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import signIn from "@/components/signIn.vue";
import signUp from "@/components/signUp.vue";

export const routes = [
    { path: '/typeFaster/', component: Home },
    { path: '/typeFaster/leaderboard', component: LeaderBoard },
    { path: '/typeFaster/message', component: Messages },
    { path: '/typeFaster/profil', component: Profil },
    { path: '/typeFaster/signIn', component: signIn },
    { path: '/typeFaster/signUp', component: signUp },
    { path: '/typeFaster/:pathMatch(.*)*', component: NotFoundPage }
];