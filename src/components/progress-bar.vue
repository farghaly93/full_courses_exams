<template>
    <div class="ratio">
        <div :style="'color:'+color+';font-weight:bolder;'">{{caption}}</div>
        <div style="" class="progress">
            <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="50"
            aria-valuemin="0" aria-valuemax="100" :style="'background-color:'+color+';width:'+Math.floor((degree/+(fullDegree))*100)+'%'">
                <div style="color:#fff;font-weight:bolder">{{Math.floor((degree/+(fullDegree))*100 || 0)}}%</div>
            </div>
        </div>
        <strong class="degree" :style="'color:'+color">({{degree+ '/' + (fullDegree)}})</strong>
    </div>
</template>

<script>
export default {
    props: ['degree', 'fullDegree', 'caption', 'color']
}
</script>

<style lang="scss" scoped>
    .ratio {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media(max-width: 552px) {
            flex-direction: column;
        }
        @media(min-width: 700px) {
            flex-direction: row;
        }
        .progress {
            // flex: 18;
            width: 100%;
            .progress-bar {
                color: #444;
            }
        }
        .degree {
            // flex: 1
        }
    }
</style>