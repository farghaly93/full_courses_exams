<template>
    <div>
        <button ref="open" style="display:none" type="button" class="btn btn-primary" data-toggle="message" data-target="#mess">
            Launch demo modal
        </button>

        <div class="modal fade" id="mess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog flash animated" role="document">
                <div class="text">{{text}}</div>
                <div style="display:none" class="modal-footer">
                    <button ref="close" type="button" class="btn btn-default" data-dismiss="message">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['text'],
    watch: {
        text() {            
            this.$refs.open.click();
            setTimeout(() => {
                this.$refs.close.click();
            }, 3000);
        }
    },
}
</script>

<style lang="scss" scoped>
    .text {
        width: 100%;
        text-align: center;
        font-size: 40px;
        color: #fff;
        margin-top: 50%;
        background-color: rgba(53, 47, 47, 0.514)
    }
</style>

