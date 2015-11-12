import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Row from 'react-bootstrap/lib/Row';

export default React.createClass({
  render() {
    return (
      <div>
        <Row>
        <PageHeader>About</PageHeader>
        <p>This web app was made as an excercise for a job application on behalf of <a href = "https://www.konnektid.com/">Konnektid</a> by Karl Lundfall.</p>
        </Row>
      </div>
    );
  }
});
