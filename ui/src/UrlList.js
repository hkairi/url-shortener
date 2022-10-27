import React from 'react';

function UrlList(props) {
  const visitUrl =(url) => {
    fetch(url)
      .then(res => res.json())
      .then(res => window.location.replace(res.url));
  };

  const deleteUrl = (url_id) => {
    props.deleteUrl(url_id);
  }

  return (
    <div className="list">
      Urls: {props.items.length}
      <table>
        <thead>
          <tr>
            <td>visits</td>
            <td>short link</td>
          </tr>
        </thead>
        <tbody>
      { props.items.map((url, idx) => {
        return(
          <tr key={idx}>
            <td>{url.visits}</td>
            <td>
              <a href="#" onClick={()=>visitUrl(url.short_url)}>{url.short_url}</a>
            </td>
              <td><a href="#" onClick={()=> deleteUrl(url.id)}>X</a></td>
          </tr>
        );
      }) }
    </tbody>
    </table>
    </div>
  );
}

export default UrlList;
