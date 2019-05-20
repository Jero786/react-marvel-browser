// Resources
import 'commons/commons.scss';
import 'commons/reset.scss';
import './layout.scss';

// Libs
import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';


class Layout extends React.PureComponent {

    render() {
        const {title, children, description} = this.props;
        const someDescription = description ? description : title;
        return (
          <div className="mv-layout">
            <Head>
              <title>
                {title}
              </title>
              <meta charSet="utf-8" />
              <meta name="Description" content={someDescription} />
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
                key="viewport"
              />
            </Head>
            {children}
          </div>
        );
    }
}

Layout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    description: PropTypes.string,
};

export default Layout;
