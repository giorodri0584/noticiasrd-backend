import React, { useState } from 'react';
import { firestore } from './firebase/firebase';

const App = () => {
  const [submited, setSubmited] = useState(false);
  const [article, setArticle] = useState({
    title: '',
    articleUrl: '',
    coverImageUrl: '',
    author: '',
    authorLogo: '',
    createdAt: Math.round((new Date()).getTime() / 1000)
  }); 

  const updateField = (e) => {
    if(e.target.name === 'external'){
      const val = e.target.value === 'true' ? true : false;
      setArticle({
        ...article,
        [e.target.name]: val
      });
      return;
    }
    setArticle({
      ...article,
      [e.target.name]: e.target.value
    });
  }

  const saveArticle = async () => {
    firestore.collection("articles").add(article)
      .then((docRef) => {
        console.log("Article ID: " + docRef.id);
      })
      .catch((error) => {
        console.log(error);
      });
    
  }

  return (
    <div className="container">
      <form>
        <h4>News Article</h4>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input className="input" type="text" name="title" onChange={updateField} required></input>
          </div>
        </div>
        <div className="field">
          <label className="label">Article Url</label>
          <div className="control">
            <input className="input" type="text" name="articleUrl" onChange={updateField}></input>
          </div>
        </div>
        <div className="field">
          <label className="label">Cover Image Url</label>
          <div className="control">
            <input className="input" type="text" name="coverImageUrl" onChange={updateField}></input>
          </div>
        </div>
        <div className="field">
          <label className="label">Author</label>
          <div className="control">
            <div className="select">
              <select name="author" onChange={updateField}>
                <option>Select Author</option>
                <option>Listin Diario</option>
                <option>Despierta RD</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Author Logo URL</label>
          <div className="control">
            <input className="input" type="text" name="authorLogo" onChange={updateField}></input>
          </div>
        </div>
      </form>
      <br />
      <div className="field is-group">
        <div className="control">
          <button className="button" onClick={saveArticle} disabled={submited}>Submit</button>
        </div>
      </div>
      <div>
        <pre>{ JSON.stringify(article, null, 2) }</pre>
      </div>
    </div>
  );
}

export default App;