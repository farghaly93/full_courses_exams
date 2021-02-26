<template>
    <div style="margin-top:30px;" class="d-flex justify-content-center">
        <h3>...جاري التحميل  </h3>
        <div class="spinner-border" role="status">
            <span class="sr-only">جاري التحميل</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        color: {
            default: '#000'
        }
    }
}
</script>