import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/forum";
import CreatePostForm from "./CreatePostForm";
import "./screens/styles/PostList.css";
import { DeleteButton } from "./DeleteButton";

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderList() {
    return this.props.posts.map(post => (
      <div key={post.postDateTime} className="postListMain">
        <div className="ui relaxed divided items" id={post.id}>
          <div className="item">
            <div className="content">
              <h2 className="header">{post.title}</h2>
              <div className="meta">
                <span>
                  {new Date(post.postDateTime).toLocaleString("en-gb")}
                </span>
              </div>
              <div className="description">{post.body}</div>
              <div className="extra" id={post.id}>
                <DeleteButton
                  postId={post.id}
                  postDeleted={() => this.props.fetchPosts()}
                />
                <img
                  alt="Avatar"
                  src={post.profileimg}
                  className="ui circular avatar image"
                />
                {post.username}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="ui container">
        <CreatePostForm postAdded={() => this.props.fetchPosts()} />
        <div id="postList">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.posts };
};

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostList);
