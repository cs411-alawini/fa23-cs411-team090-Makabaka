import React from 'react';

import AppBar from '../../components/AppBar'
import Footer from '../../components/Footer'

function NotFoundPage(props) {
    const { user, handleLogout } = props;
    return (
        <div className="NotFoundPage">
            <header className="NotFoundPage-header">
                <AppBar 
                    user={user}
                    handleLogout={handleLogout}
                />
                <h1>404 Page Not Found</h1>
                <Footer />
            </header>
        </div>
    );
}

export default NotFoundPage;
