<template>
    <div class="lesson">
        <div class="text-center name">{{lesson.name}}</div>
        <div class="vid">
            <iframe class="embed-responsive-item" height="500px" width="100%" :src="lesson.videoPath"/>
        </div>
        <div class="text-center explain">
            {{lesson.explain}}
             ححححححححححححححححححححححححححححححححححح ههههههههههههههههههههههههههههههههههههههههههههه ههههههههههه ه ه ه هههههههههه ههههههههههه
             خخخخخخخخخخخخخخخخخخخخخخخخخخخخخ
             </div>
        <div class="text-center file">
            <a :href="lesson.filePath">تحميل الملفات الملحقة</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['lesson']
}
</script>

<style lang="scss" scoped>
    .lesson {
        overflow-y: scroll;
        padding: 20px 10px;
        height: 700px;
        @media(max-height: 600px) {
            height: 370px;
        }
        background-image: linear-gradient(-45deg, rgb(13, 47, 110) 0%, rgb(124, 188, 207) 100%);
        .name {
            font-size: 24px;
            font-weight: bolder;
            color: #fff;
            padding: 2px 0px;
            margin: 10px;
        }
        .vid {
            // height:600px;
        }
        .explain {
            margin: 15px;
            font-size: 18px;
            color: #fff;
        }
        .file {
            a {
                 background-color: rgba(10, 105, 31, 0.911);
                color: #fff;
                padding: 10px 25px;
                text-decoration: none;
                border-radius: 13px;
                margin-bottom: 120px;
                font-size: 25px;
                box-shadow: 1px 2px 1px .5px #000;
                &:hover {
                    background-color: cornflowerblue;
                } 
            }
        }
    }
</style>