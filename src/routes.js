import App from "@/App.vue";
import LeaderBoard from "@/pages/LeaderBoard.vue";
import Messages from "@/pages/Messages.vue";
import Profil from "@/pages/Profil.vue";
import Home from "@/pages/Home.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

export const routes = [
    {path: '/', component: Home},
    {path: '/leaderboard', component: LeaderBoard},
    {path: '/message', component: Messages},
    {path: '/profil', component: Profil},
    {path: '/:pathMatch(.*)*', component: NotFoundPage}
];