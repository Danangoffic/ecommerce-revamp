<template>
    <div class="container">
        <!-- <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
                <h2 class="heading-section">Login #04</h2>
            </div>
        </div> -->
        <div class="row">
            <div class="col-md-12 col-lg-10">
                <div class="wrap d-md-flex">
                    <div class="img" style="background-image: url(img/banner-1.jpg) !important;">
                    </div>
                    <div class="login-wrap p-4 p-md-5">
                        <div class="d-flex">
                            <div class="w-100">
                                <h3 class="mb-4">Sign In</h3>
                            </div>
                        </div>
                        <form action="#" class="signin-form">
                            <div class="form-group mb-3 text-left">
                                <label class="label" for="email">Email</label>
                                <input type="email" class="form-control" placeholder="Email" v-model="loginData.email">
                            </div>
                            <div class="form-group mb-3 text-left">
                                <label class="label" for="password">Password</label>
                                <input type="password" class="form-control" placeholder="Password"
                                    v-model="loginData.password">
                            </div>
                            <div class="form-group text-left">
                                <button type="button" class="primary-btn rounded px-3 border-0" @click="doLogin()">Sign
                                    In</button>
                            </div>
                            <div class="form-group d-md-flex">
                                <p class="text-disabled">Not a member? <a class="btn btn-link" href="#signup">Sign
                                        Up</a>
                                </p>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'LoginView',
    data() {
        return {
            isLoggedIn: false,
            loginData: {
                email: '',
                password: ''
            },
            token: ''
        }
    },
    created() {
        this.getCurrentLoggedIn();
    },
    methods: {
        getCurrentLoggedIn() {
            const localLoggedIn = localStorage.getItem("isLoggedIn");
            if (localLoggedIn) {
                return this.$router.push({ name: 'home' })
            }
        },
        doLogin() {
            const isValidated = this.validateUserData();
            if (!isValidated) {
                alert('Email or Password are empty!');
                return isValidated;
            }
            axios
                .post(this.$apiURL + "/login", this.loginData)
                .then((res) => {
                    const responseLogin = res.data;
                    if (responseLogin.status != 200) {
                        alert('Login credential are wrong, please try again!');
                        return false;
                    } else {
                        this.token = responseLogin.token
                        this.isLoggedIn = true;
                        localStorage.setItem("isLoggedIn", this.isLoggedIn);
                        localStorage.setItem("token", this.token);
                        this.$router.push({ name: 'home' });
                    }
                })
        },
        validateUserData() {
            if (this.loginData.email.length == 0 || this.loginData.password.length == 0) {

                return false;
            } else {
                return true;
            }
        }
    }
}
</script>