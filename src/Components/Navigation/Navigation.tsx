import Navbar from './Navbar';

export default function Navigation() : React.ReactElement {
    return (
        <header className="header">
            <Navbar />
            <div id="projectName">
                <h1>McDonalds Website Project</h1>
            </div>
        </header>
    );
}