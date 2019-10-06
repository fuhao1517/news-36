<template>
  <div>
    <!-- 头部组件 -->
    <HeaderNormal title="精彩跟帖" />
    <!-- 评论模块 -->
    <div class="comment">
      <div class="comment-info">
        <!-- 左侧的用户信息 -->
        <div class="comment-user">
          <!-- 头像 -->
          <img src="../../static/default_green.jpg" alt />
          <!-- 用户名字 -->
          <div class="user-info">
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
        </div>

        <span class="reply">回复</span>
      </div>

      <!-- 评论楼层 -->
      <div class="comment-floor">
        <div class="floor-header">
          <span>1 火星网友</span>
          <i>2 小时前</i>
          <em>回复</em>
        </div>

        <div class="comment-content">文章说的很有道理！</div>
      </div>

      <div class="comment-content">文章说的很有道理！</div>
    </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
export default {
  components: {
    HeaderNormal
  }
};
</script>

<style scoped lang="less">
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

.comment-floor {
  border: 1px #ccc solid;
  padding: 10px;
  background: #f6f6f6;
  .floor-header {
    font-size: 13px;
    color: #666;
    i {
      font-size: 12px;
      color: #999;
    }
    em{
      float: right;
    }
  }
}
</style>