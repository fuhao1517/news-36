<template>
  <div class="container">
    <!-- 头部组件 -->
    <HeaderNormal title="精彩跟帖" />
    <!-- 评论模块 -->
    <!-- v-model：是否在加载
    finished：是否加载完毕
    load：到底部触发加载-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我可是有底线的"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="comment" v-for="(item,index) in comments" :key="index">
        <div class="comment-info">
          <!-- 左侧的用户信息 -->
          <div class="comment-user">
            <!-- 头像 -->
            <img :src="$axios.defaults.baseURL+item.user.head_img" v-if="item.user.head_img" alt />
            <img src="../../static/default_green.jpg" v-else />
            <!-- 用户名字 -->
            <div class="user-info">
              <p>{{item.user.nickname}}</p>
              <span>2小时前</span>
            </div>
          </div>

          <span class="reply" @click="handleReply(item)">回复</span>
        </div>

        <!-- 渲染评论楼层的组件 -->
        <CommentFloor v-if="item.parent" :data="item.parent" @handleReply="handleReply" />

        <div class="comment-content">{{item.content}}</div>
      </div>
    </van-list>
    <!-- 页脚组件 -->
    <!-- post文章的详情
    replyComment：要回复的评论
    getComments：发布评论成功后重新请求评论的列表-->
    <PostFooter
      :post="detail"
      :replyComment="replyComment"
      @handleReply="handleReply"
      @getComments="getComments"
    />
  </div>
</template>

<script>
/* 引入公共头部 */
import HeaderNormal from "@/components/HeaderNormal";
/* 评论楼层组件 */
import CommentFloor from "@/components/CommentFloor";
/* 页面发布评论的底部 */
import PostFooter from "@/components/PostFooter";

export default {
  data() {
    return {
      /* 评论的列表 */
      comments: [],
      /* 文章的详情 */
      detail: {},
      /* 保存点击回复的评论 */
      replyComment: null,
      /* 分页的参数 */
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    };
  },
  /* 注册组件 */
  components: {
    HeaderNormal,
    CommentFloor,
    PostFooter
  },
  methods: {
    /* 请求评论的列表 */
    getComments(id, isReply) {
      /* 如果评论发布成功，初始化分页的数据和列表数据 */
      if (isReply === "isReply") {
        this.pageIndex = 1;
        this.comments = [];
      }
      /* 请求文章评论 */
      this.$axios({
        /* 条数默认是10 */
        url: `/post_comment/${id}?pageIndex=${this.pageIndex}`
      }).then(res => {
        const { data } = res.data;
        /* 覆盖评论的列表 */
        this.comments = [...this.comments, ...data];
        /* 请求完毕需要手动变为false */
        this.loading = false;
        if (data.length < this.pageSize) {
          this.finished = true;
          return;
        }
        /* 页数加1 */
        this.pageIndex++;
      });
    },
    /* 点击回复按钮时触发的方法 */
    handleReply(item) {
      //获取到当前要回复的id
      this.replyComment = item;
    },
    /* 评论加载更多 */
    onLoad(){
      setTimeout(()=>{
        /* 文章的id */
        const{id}=this.$route.params;
        /* 请求下一页的数据 */
        this.getComments(id);
      },2000)
    }
  },

  mounted() {
    /* 文章的id */
    const { id } = this.$route.params;
    /* 请求评论的列表 */
    this.getComments(id);
    /* 文章的详情 */
    const config = {
      url: "/post/" + id
    };
    const token = localStorage.getItem("token");
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

<style scoped lang="less">
.container {
  padding-bottom: 100/360 * 100vw;
}
.comment {
  padding: 15px 10px;
  border-bottom: 1px #eee solid;
  .comment-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .comment-user {
    display: flex;
    align-items: center;
    img {
      width: 40/360 * 100vw;
      height: 40/360 * 100vw;
      display: block;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
    .user-info {
      font-size: 13px;
      span {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .reply {
    font-size: 13px;
    color: #666;
  }
  .comment-content {
    padding: 15px 0 0;
  }
}
</style>