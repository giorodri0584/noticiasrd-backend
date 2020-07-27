import React, { useState } from "react";
import { firestore } from "./firebase/firebase";
import { useFormik } from "formik";

const App = () => {
  const [submited, setSubmited] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      articleUrl: "",
      coverImageUrl: "",
      author: "",
      authorLogo: "",
      createdAt: Math.round(new Date().getTime() / 1000),
    },
    onSubmit: values => saveArticle(values),
    validate: values => validate(values)
  });

  const validate = (values) => {
    let errors = {};
    if(!values.title){
      errors.title = "Title is Required"
    }
    if(!values.articleUrl){
      errors.articleUrl = "Article Url is Required"
    }
    if(!values.coverImageUrl){
      errors.coverImageUrl = "Cover Image Url is Required"
    }
    if(!values.author){
      errors.author = "Author is Required"
    }
    if(!values.authorLogo){
      errors.authorLogo = "Author Logo  is Required"
    }
    return errors;
  }

  const saveArticle = async (values) => {
    console.log(values);
    // firestore
    //   .collection("articles")
    //   .add(article)
    //   .then((docRef) => {
    //     console.log("Article ID: " + docRef.id);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <h4>News Article</h4>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
            ></input>
          </div>
          {formik.touched.title && formik.errors.title ? <p className="help is-danger">{formik.errors.title}</p> : null}
        </div>
        <div className="field">
          <label className="label">Article Url</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="articleUrl"
              onChange={formik.handleChange}
              value={formik.values.articleUrl}
              onBlur={formik.handleBlur}
            ></input>
          </div>
          {formik.errors.articleUrl && formik.touched.articleUrl ? <p className="help is-danger">{formik.errors.articleUrl}</p> : null}
        </div>
        <div className="field">
          <label className="label">Cover Image Url</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="coverImageUrl"
              onChange={formik.handleChange}
              value={formik.values.coverImageUrl}
              onBlur={formik.handleBlur}
            ></input>
          </div>
          {formik.errors.coverImageUrl && formik.touched.coverImageUrl ? <p className="help is-danger">{formik.errors.coverImageUrl}</p> : null}
        </div>
        <div className="field">
          <label className="label"> Author</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="author"
              onChange={formik.handleChange}
              value={formik.values.author}
              onBlur={formik.handleBlur}
            ></input>
          </div>
          {formik.errors.author && formik.touched.author ? <p className="help is-danger">{formik.errors.author}</p> : null}
        </div>
        <div className="field">
          <label className="label">Author Logo URL</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="authorLogo"
              onChange={formik.handleChange}
              values={formik.values.authorLogo}
              onBlur={formik.handleBlur}
            ></input>
          </div>
          {formik.errors.authorLogo && formik.touched.authorLogo ? <p className="help is-danger">{formik.errors.authorLogo}</p> : null}
        </div>
        <br />
        <div className="field is-group">
          <div className="control">
            <button className="button is-primary" type="submit" disabled={!(formik.isValid && formik.dirty)}>
              Submit
            </button>
          </div>
        </div>
      </form>
      <br />
      <div>
        <pre>{JSON.stringify(formik.values, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
