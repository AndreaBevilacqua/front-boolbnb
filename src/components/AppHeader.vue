<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'AppHeader',
}
</script>

<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm py-0 sticky-top">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="{{ __('Toggle navigation') }}">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'home' }"><img class="img-fluid"
                                src="../assets/logo.png" alt="logo">
                            <span class="fs-1 me-5">
                                BoolBnB
                            </span>
                        </RouterLink>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped lang="scss">
.navbar {
    height: 80px;
    font-weight: bold;

    * {
        height: 100%;
    }

    a {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 155px;
        height: 135px;
    }

    span {
        background: linear-gradient(to right, #0E485B, #4BC9E4);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
}
</style>