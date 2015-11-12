import React from 'react';
import packageJSON from '../../package.json';
import PageHeader from 'react-bootstrap/lib/PageHeader';

export default React.createClass({
  render() {
    let deps = Object.keys(packageJSON.dependencies).map((dep, i) => <li key={i}>{dep}</li>);
    let devDeps = Object.keys(packageJSON.devDependencies).map((dep, i) => <li key={i + deps.length}>{dep}</li>);

    return (
      <div>
        <PageHeader>Powered by</PageHeader>
        <ul>
          {[...deps, ...devDeps]}
        </ul>
      </div>
    );
  }
});
