<template>
  <div class="container">
    <!-- 文章的详情页的内容 -->
    <div class="postDetail" v-if="detail.type===1">
      <div class="header">
        <span class="left" @click="$router.back()">
          <i class="iconfont iconjiantou2"></i>
          <em class="iconfont iconnew"></em>
        </span>

        <span class="right" v-if="!detail.has_follow" @click="handleFollow">关注</span>
        <span class="right focus_active" v-else @click="handleUnFollow">已关注</span>
      </div>

      <h3>{{ detail.title }}</h3>

      <div class="author">
        <span>{{detail.user.nickname}}</span>
        <i>2019-10-10</i>
      </div>

      <p class="text" v-html="detail.content"></p>
    </div>

    <!-- 视频详情的内容 -->
    <div class="video-wrap" v-if="detail.type === 2">
      <video
        src="https://video.pearvideo.com/mp4/adshort/20190927/cont-1607446-14434032_adpkg-ad_hd.mp4"
        class="video"
        controls
        poster="https://timgmb04.bdimg.com/timg?searchbox_feed&quality=100&wh_rate=0&size=b576_324&ref=http%3A%2F%2Fwww.baidu.com&sec=1568739067&di=612dd27cae470b93b01a4b32ef72fbac&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fe18c6ffa079441431f8988ca4c3ac106.jpeg"
      ></video>

      <div class="video-info">
        <div class="video-user">
          <img :src="$axios.defaults.baseURL + detail.user.head_img" />
          <span>{{detail.user.nickname}}</span>
        </div>

        <span class="right" v-if="!detail.has_follow" @click="handleFollow">关注</span>
        <span class="right focus_active" v-else @click="handleUnFollow">已关注</span>
      </div>

      <h4>{{ detail.title }}</h4>
    </div>

    <!-- 点赞和微信分享 -->
    <div class="like">
      <span class="left" @click="handleLike" :class="{like_active:detail.has_like}">
        <i class="iconfont icondianzan"></i>
        <em>{{detail.like_length}}</em>
      </span>

      <span class="right">
        <i class="iconfont iconweixin"></i>
        <a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1">微信</a>
      </span>
    </div>

    <!-- 页脚组件 -->
    <PostFooter :post="detail" @handleStar="handleStar" />
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
  methods: {
    /* 关注当前作者 */
    handleFollow() {
      /* 通过作者id关注作者 */
      this.$axios({
        url: "/user_follows/" + this.detail.user.id,
        /* 添加头信息 */
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { message } = res.data;
        if (message === "关注成功") {
          /* 修改关注的按钮的状态 */
          this.detail.has_follow = true;
          this.$toast.success(message);
        }
      });
    },
    /* 取消关注当前作者 */
    handleUnFollow() {
      /* 通过作者id关注作者 */
      this.$axios({
        url: "/user_unfollow/" + this.detail.user.id,
        /* 添加头信息 */
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { message } = res.data;
        if (message === "取消关注成功") {
          /* 修改关注的按钮的状态 */
          this.detail.has_follow = false;
          this.$toast.success(message);
        }
      });
    },
    /* 点赞 */
    handleLike() {
      this.$axios({
        url: "/post_like/" + this.detail.id,
        /* 添加头信息 */
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { message } = res.data;
        if (message === "点赞成功") {
          /* 修改点赞的按钮的状态 */
          this.detail.has_like = true;
          this.detail.like_length++;
        }
        if (message === "取消成功") {
          /* 修改点赞的按钮的状态 */
          this.detail.has_like = false;
          this.detail.like_length--;
        }
        this.$toast.success(message);
      });
    },

    /* 收藏 */
    handleStar() {
      this.$axios({
        url: "/post_star/" + this.detail.id,
        /* 添加头信息 */
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { message } = res.data;
        if (message === "收藏成功") {
          /* 修改收藏的按钮的状态 */
          this.detail.has_star = true;
        }
        if (message === "取消成功") {
          /* 修改收藏的按钮的状态 */
          this.detail.has_star = false;
        }
        this.$toast.success(message);
      });
    }
  },
  mounted() {
    /* 请求文章的详情 */
    const { id } = this.$route.params;

    const token = localStorage.getItem("token");
    /* 请求的配置 */
    const config = {
      url: "/post/" + id
    };

    /* 如果有token就带上，才可能获取到是否关注，是否收藏的属性*/
    if (token) {
      config.headers = {
        Authorization: token
      };
    }
    this.$axios(config).then(res => {
      const { data } = res.data;

      /* 保存到详情 */
      this.detail = data;
    });
  }
};
</script>

<style scope lang="less">
.container {
  .video-wrap {
    .video {
      width: 100%;
    }
    .video-info {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .video-user {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #999;
      }
      img {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    h4{
      margin: 10px 10px 50px;
    }
    .right {
      width: 62 / 360 * 100vw;
      height: 26 / 360 * 100vw;
      line-height: 26 / 360 * 100vw;
      text-align: center;
      font-size: 12px;
      background: red;
      color: #fff;
      border-radius: 100px;
      border: 1px red solid;
    }
    .focus_active {
      border: 1px #ccc solid;
      color: #333;
      background: none;
    }
  }
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
        width: 62 / 360 * 100vw;
        height: 26 / 360 * 100vw;
        line-height: 26 / 360 * 100vw;
        text-align: center;
        display: block;
        border-radius: 50px;
        border: 1px solid red;
        font-size: 12px;
        padding: 2px 8px;
        background: red;
        color: #fff;
      }
      .focus_active {
        border: 1px #ccc solid;
        color: #333;
        background: none;
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
      img {
        max-width: 100%;
      }
    }
  }
  .like {
    display: flex;
    justify-content: space-around;
    margin-bottom: 120/360 * 100vw;
    span {
      width: 75/360 * 100vw;
      height: 30/360 * 100vw;
      text-align: center;
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
    .like_active {
      border: 1px red solid;
      i {
        color: red;
      }
    }
  }
}
</style>