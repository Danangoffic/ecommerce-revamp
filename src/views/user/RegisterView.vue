<template>
    <div>
        <HeaderStore />
        <div class="container">
            <form action="" class="form" @submit="submitData()">
                <div class="form-group">
                    <label for="email" class="label-control">Email</label>
                    <input type="email" v-model="registerUser.email" class="form-control">
                </div>
                <div class="form-group">
                    <label for="name" class="label-control">Name</label>
                    <input type="text" v-model="registerUser.name" class="form-control">
                </div>
                <div class="form-group">
                    <label for="password" class="label-control">Password</label>
                    <input type="password" v-model="registerUser.password" class="form-control">
                </div>
                <div class="form-group">
                    <label for="confirm_password" class="label-control">Confirm Password</label>
                    <input type="password" v-model="registerUser.confirm_password" class="form-control">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn primary-btn">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import HeaderStore from "@/components/HeaderStore.vue";
import axios from "axios";
export default {
    name: 'RegisterView',
    components: {
        HeaderStore
    },
    data() {
        return {
            registerUser: {
                email: '',
                password: '',
                confirm_password: '',
                name: ''
            },
            isAuthenticated: false,
        }
    },
    methods: {
        submitData() {
            event.preventDefault();
            axios.post(`${this.$apiURL}/register`, this.registerUser, { headers: { 'Accept': 'application/json' } })
                .then(res => {
                    if (res.data.meta.code == 200) {
                        const token = res.data.data.token;
                        localStorage.setItem('token', token);
                        this.isAuthenticated = true;
                        return this.$router.push('/');
                    } else {
                        alert("failed to login")
                    }
                }).catch(e => {
                    console.log(e);
                    alert("failed to login")
                })
        }
    }
}
</script>