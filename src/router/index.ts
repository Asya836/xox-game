import { createRouter, createWebHistory } from "vue-router";
import Start from "../components/Start.vue";
import Game from "../components/Game.vue";

const routes = [
    { path: "/", component: Start },
    { path: "/game", component: Game }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
