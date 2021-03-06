import createDataContext from "./createDataContext";

// Handle data here
const blogReducer = (state, action) => {
  switch (action.type) {
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id
          ? action.payload
          : blogPost;
      });
    case "delete_blogpost":
      return state.filter(
        (blogPost) =>
          blogPost.id !== action.payload
      );
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    default:
      return state;
  }
};

// helper function. Add data here
// addBlogPOst() needs to have access to the dispatch() function; That is how we change our state
const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({
      type: "add_blogpost",
      payload: { title, content },
    });
    if (callback) {
      callback();
    }
  };
};

// Delete post
const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({
      type: "delete_blogpost",
      payload: id,
    });
  };
};

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({
      type: "edit_blogpost",
      payload: { id, title, content },
    });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } =
  createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost },
    [
      {
        title: "TEST POST",
        content: "TEST CONTENT",
        id: 1,
      },
    ]
  );
