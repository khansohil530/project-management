import React from "react";

import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";

function App() {
    const [projectState, setProjectState] = React.useState({
        selectedProjectId: undefined,
        projects: [],
    });

    const handleStartAddProject = () => {
        setProjectState((prevState) => ({
            ...prevState,
            selectedProjectId: null,
        }));
    };
    let content;
    if (projectState.selectedProjectId === null) {
        content = <NewProject />;
    } else if (projectState.selectedProjectId === undefined) {
        content = (
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        );
    }

    return (
        <main className="h-screen my-8 flex">
            <ProjectsSidebar onStartAddProject={handleStartAddProject} />
            {content}
        </main>
    );
}

export default App;
