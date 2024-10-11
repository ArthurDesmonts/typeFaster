import App from "@/App.vue";
import LeaderBoard from "@/pages/LeaderBoard.vue";
import Messages from "@/pages/Messages.vue";
import Profil from "@/pages/Profil.vue";
import Home from "@/pages/Home.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

export const routes = [
    {path: '/typeFaster/', component: Home},
    {path: '/typeFaster/leaderboard', component: LeaderBoard},
    {path: '/typeFaster/message', component: Messages},
    {path: '/typeFaster/profil', component: Profil},
    {path: '/typeFaster/:pathMatch(.*)*', component: NotFoundPage}
];