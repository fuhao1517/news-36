<template>
  <div class="container">
    <!-- 文章的详情页的内容 -->
    <div class="postDetail">
      <div class="header">
        <span class="left" @click="$router.back()">
          <i class="iconfont iconjiantou2"></i>
          <em class="iconfont iconnew"></em>
        </span>

        <span class="right" v-if="!detail.has_follow">关注</span>
        <span class="right focus_active" v-else>已关注</span>
      </div>

      <h3>{{ detail.title }}</h3>

      <div class="author">
        <span>{{detail.user.nickname}}</span>
        <i>2019-10-10</i>
      </div>

      <p class="text" v-html="detail.content"></p>

      <div class="like">
        <span class="left">
          <i class="iconfont icondianzan"></i>
          <em>112</em>
        </span>

        <span class="right">
          <i class="iconfont iconweixin"></i>
          <em>微信</em>
        </span>
      </div>

      <!-- 页脚组件 -->
      <PostFooter />
    </div>
  </div>
</template>

<script>
/* 导入页脚组件 */
import PostFooter from "@/components/PostFooter";
export default {
  data() {
    return {
      /* 文章详情 */
      detail: {
        // user需要在模板中渲染，不然页面会报错
        user: {}
      }
    };
  },

  components: {
    PostFooter
  },
  mounted() {
    /* 请求文章的详情 */
    const { id } = this.$route.params;

    this.$axios({
      url: "/post/" + id
    }).then(res => {
      const { data } = res.data;

      /* 保存到详情 */
      this.detail = data;
    });
  }
};
</script>

<style scope lang="less">
.postDetail {
  padding: 10px;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60 / 360 * 100vw;
    padding: 0 10px;
    box-sizing: border-box;

    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      * {
        vertical-align: middle;
      }
      i {
        font-size: 20/360 * 100vw;
      }
      em {
        font-size: 60/360 * 100vw;
      }
    }
    .right {
      display: block;
      border-radius: 50px;
      border: 1px solid #9486a2;
      font-size: 12px;
      padding: 2px 8px;
    }
  }
  h3 {
    margin-top: 60 / 360 * 100vw;
  }
  .author {
    font-size: 14px;
    color: #9486a2;
    margin: 5px;
    span {
      margin-right: 5px;
    }
  }
  p {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 35px;
    /deep/img {
      max-width: 100%;
    }
  }

  .like {
    display: flex;
    justify-content: space-around;
    margin-bottom: 64/360 * 100vw;
    span {
      border: 1px solid #7a7a7a;
      border-radius: 50px;
      padding: 0 15px;
      height: 30/360 * 100vw;
      line-height: 30/360 * 100vw;
    }
    .right {
      i {
        color: #00c800;
      }
    }
  }
}
</style>