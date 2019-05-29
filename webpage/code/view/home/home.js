new Vue({
    el: "#idHome",
    data() {
        return {
        }
    },
    methods: {
        jump() {
            let me = this;
            
            me.$su.view("#common/bug/edit")
        }
    },
    created() {

    }
})
