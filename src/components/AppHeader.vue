<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'AppHeader',
}
</script>

<template>
    <nav class="navbar navbar-expand navbar-light bg-white shadow-sm py-0 sticky-top">
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
                        <RouterLink class="nav-link py-0 " :to="{ name: 'home' }"><img class="img-fluid"
                                src="../assets/logo.png" alt="logo">
                            <span id="logo-name" class="fs-1 d-none d-sm-block h-100 ">
                                BoolBnB
                            </span>
                        </RouterLink>
                    </li>

                </ul>
                <ul class="navbar-nav ms-auto ">
                    <li class="nav-item">
                        <a class="nav-link" href="http://localhost:8000/login/">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="http://localhost:8000/register/">Registrati</a>
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

    .container-fluid {
        box-shadow: 1px 1px 5px rgb(189, 187, 187);
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
        line-height: 80px;
    }
}
</style>